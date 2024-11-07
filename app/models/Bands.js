const mongoose = require("mongoose");

const bandsSchema = new mongoose.Schema({
    name: String,
    location: String,
    genre: String,
    minFee: Number,
});

module.exports = mongoose.model("Bands", bandsSchema);