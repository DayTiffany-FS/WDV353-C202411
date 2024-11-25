const mongoose = require("mongoose");

const bandSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "You are required to have a Band Name."],
        unique: true,
        trim: true,
        maxlength: [50, "Your name is too long, oops!"]
    },
    location: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Location',
        required: true
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

module.exports = mongoose.model("Band", bandSchema);