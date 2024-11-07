const router = require("express").Router();

router.get("/", (req,res) => {
    res.status(200).json({
        success: true, 
        message: `${req.method} - request to Band endpoint`,
    });
});

router.get("/:id", (req,res) => {
    const {id} = req.params;
    res.status(200).json({
        id,
        success: true, 
        message: `${req.method} - request to Band endpoint1`,
    });
});

router.post("/", (req,res) => {
    res.status(200).json({
        success: true, 
        message: `${req.method} - request to Band endpoint2`,
    });
});

router.put("/:id", (req,res) => {
    const {id} = req.params;
    res.status(200).json({
        id,
        success: true, 
        message: `${req.method} - request to Band endpoint3`,
    });
});

router.delete("/:id", (req,res) => {
    const {id} = req.params;
    res.status(200).json({
        id,
        success: true, 
        message: `${req.method} - request to Band endpoint4`,
    });
});

module.exports = router;