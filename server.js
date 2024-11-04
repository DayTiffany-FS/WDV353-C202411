const http = require('http');
require('dotenv').config();
const app = require("./app");
const router = require("./app/routes");

const server = http.createServer(app);

server.listen(process.env.PORT, () => {
    console.log(`Service is up on port ${process.env.PORT}`);
});