const express = require("express");
const router = express.Router();

const bands = [
    { id: 1, name: "Whiskey Moon", location: "LaGrange"},
    { id: 2, name: "Off Ramp", location: "Peachtree City"},
    { id: 3, name: "Midnight Satellite", location: "Columbus"},
];

// localhost:3000/api
router.get("/", (req, res) => {
    res.status(200).json(bands)
});

// localhost:3000/api/<anything that follows>
router.get("/:id", (req, res) => {
    const { id } = req.params;
    const bandId = parseInt(id, 10);
    const band = bands.find(b => b.id === bandId)

    if(band) {
        res.status(200).json(band);
    }
    else {
        res.status(404).json({message: "Error, band not listed in directory!"});
    }
});

router.post("/", (req, res) => {
    const newBand = req.body;

    bands.push(newBand);
    res.status(200).json({message: "New band added to the directory"});
    
});

router.put("/:id", (req, res) => {
    const { id } = req.params;
    const updateBand = req.body;

    const bandId = parseInt(id, 10);
    const bandIndex = bands.findIndex(b => b.id === bandId);

    if (bandIndex !== -1) {
        bands[bandIndex] = { ...bands[bandIndex], ...updateBand};
        res.status(200).json(bands[bandIndex]);
    }
    else {
        res.status(404).json({message: "Band not listed in directory. Cannot update."});
    }
});

router.delete("/:id", (req, res) => {
    const { id } = req.params;
    const bandId = parseInt(id, 10);
    const bandIndex = bands.findIndex(b => b.id === bandId)

    if(bandIndex != -1) {
        bands.splice(bandIndex, 1);
        res.status(200).json({message: "Band successfully removed from directory."});
    }
    else {
        res.status(404).json({message: "Error, band not listed in directory!"});
    }
});

module.exports = router;