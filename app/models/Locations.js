const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
        location: {
            type: String,
            required: true,
            trim: true,
            maxlenght: [75, "You have entered a location too large, please try again."],
        }
    });

locationSchema.virtual("bands", {
    ref: "Band",
    localField: "_id",
    foreignField: "location",
    justOne: false
});

locationSchema.set('toJSON', {
    virtuals: true,
});

module.exports = mongoose.model("Location", locationSchema);