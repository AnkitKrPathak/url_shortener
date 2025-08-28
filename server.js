const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const app = require("./app");

// Connect to MongoDB
mongoose.connect(process.env.CONN_STR, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true
}).then((conn) => {
    console.log("DB Connection Successful");
}).catch((error) => {
    console.log("Error occured: " + error);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));