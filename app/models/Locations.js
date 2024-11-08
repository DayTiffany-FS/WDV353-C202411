const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
        city: {
            type: String,
            required: true,
            trim: true,
            maxlenght: [75, "You have entered a location too large, please try again."],
        },
        genre: {
            type: [String],
            required: true,
            trim: true,
            enum: [
                "Classic Rock",
                "Modern Rock",
                "Variety Rock",
                "Pop",
                "Country",
                "Alternative",
                "Variety",
            ],
        },
        minFee: {
            type: Number,
            min: [3, "Minimum fee must be at least 100."],
            max: [1000000, "Amount to pay must be lower than 1 million."],
        },
        band: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Bands",
        },
    },
    {timestamps: true}
);

module.exports = mongoose.model("Location", locationSchema);