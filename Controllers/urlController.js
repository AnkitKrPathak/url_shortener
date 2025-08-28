const Url = require("../Models/Url");
const nanoid = async function () {
    const { nanoid } = await import("nanoid");
    return nanoid();
}

exports.shortenUrl = async (req, res) => {
    try {
        const { longUrl, customAlias } = req.body;

        if (!longUrl) return res.status(400).json({ error: "URL is required" });

        let shortCode = customAlias || nanoid(8);

        // Check if alias already exists
        const existing = await Url.findOne({ shortCode });
        if (existing) return res.status(400).json({ error: "Alias already taken" });

        let shortUrl = `${req.protocol}://${req.get("host")}/api/${shortCode}`;

        const newUrl = new Url({ longUrl, shortCode, shortUrl, visitHistory: [] });
        await newUrl.save();
        res.status(200).json({
            status: "success",
            shortCode,
            shortUrl 
        });
    } catch (err) {
        res.status(404).json({
            status: "fail",
            message: err.message
        });
    }
}

exports.redirectUrl = async (req, res) => {
    try {
        const { shortCode } = req.params;
        const url = await Url.findOneAndUpdate({ shortCode }, {
            $push: {
                visitHistory: { timestamp: Date.now() }
            }
        });

        if (!url) {
            return res.status(404).json({ error: "URL not found" });
        }
    
        const acceptHeader = req.headers.accept || "";
        if (acceptHeader.includes("application/json")) {
            return res.json({ longUrl: url.longUrl });
        }

        return res.redirect(url.longUrl);
        
    } catch (err) {
        res.status(404).json({
            status: "fail",
            message: err.message
        });
    }
}