const express = require("express");
const router = express.Router();

// localhost:3000/api
router.get("/", (req, res) => {
    res.status(200).json({
        message: "GET to API ",
        metadata: {
            hostname: req.hostname,
            method: req.method
        },
    });
});

// localhost:3000/api/<anything that follows>
router.get("/:id", (req, res) => {
    const { id } = req.params;
    res.status(200).json({
        message: "GET by Id for /api",
        metadata: {
            hostname: req.hostname,
            method: req.method,
            id,
        },
    });
});

router.post("/", (req, res) => {
    const { data } = req.body;
    res.status(200).json({
        message: "POST to /api",
        data,
        metadata: {
            hostname: req.hostname,
            method: req.method,
        },
    });
});

router.put("/:id", (req, res) => {
    const { id } = req.params;
    res.status(200).json({
        message: "PUT by Id for /api",
        metadata: {
            hostname: req.hostname,
            method: req.method,
            id,
        },
    });
});

router.delete("/:id", (req, res) => {
    const { id } = req.params;
    res.status(200).json({
        message: "DELETE by Id for /api",
        metadata: {
            hostname: req.hostname,
            method: req.method,
            id,
        },
    });
});

module.exports = router;