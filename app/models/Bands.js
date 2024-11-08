const mongoose = require("mongoose");

const bandsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "You are required to have a Band Name."],
        unique: true,
        trim: true,
        maxlength: [50, "Your name is too long, oops!"]
    },
    location: {
        type: String,
        required: [true, "You are required to list a location for the band."],
        trim: true,
        maxlength: [75, "Your city name is too long, oops!"],
    },
    genre: {
        type: String,
        required: [true, "You are required to list a genre for the band."],
        trim: true,
        maxlength: [100, "You have entered too much information, woops!"],
    },
    minFee: {
        type: Number,
        required: true,
    },
});

module.exports = mongoose.model("Bands", bandsSchema);