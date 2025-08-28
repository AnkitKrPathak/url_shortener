const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
    longUrl: {
        type: String,
        required: true
    },
    shortCode: {
        type: String,
        unique: true,
        required: true
    },
    shortUrl: {
        type: String
    },
    visitHistory: [ {timestamp: {type: Number}} ]
}, { timestamps: true });

module.exports = mongoose.model("url", urlSchema);