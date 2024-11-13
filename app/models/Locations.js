const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
        city: {
            type: String,
            required: true,
            trim: true,
            maxlenght: [75, "You have entered a location too large, please try again."],
        },
        band: 
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Band',
                required: true,
            },
    },
);

module.exports = mongoose.model("Location", locationSchema);