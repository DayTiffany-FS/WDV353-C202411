const express = require("express");
const cors = require('cors');
const morgan = require("morgan");
const app = express();
const routeHandler = require("./routes");

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

app.get('/api/posts', (req, res) => {
    res.json([{id: 1, title: 'First Band' }, {id: 2, title: 'Second Band' }]);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

app.get("/", (req,res) => {
    res.status(200).json({message: "API is running", success: true})
});

app.use("/api/v1", routeHandler);

module.exports = app;