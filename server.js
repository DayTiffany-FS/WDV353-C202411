const http = require('http');
require('dotenv').config();
const app = require('./app/app');

//http.createServer(app).listen(process.env.PORT,()=>{
//    console.log('server is running on port', process.env.PORT);
//});

const todos = [
    {id: 1, task: "Task One"},
    {id: 2, task: "Task Two"},
    {id: 3, task: "Task Three"},
];

const server = http.createServer((req,res) => {
    res.setHeader("Content-Type", "application/json");
    res.end(
        JSON.stringify({
            success: true,
            method: req.method,
            data: todos,
        })
    );
});

const PORT = 3000;

server.listen(PORT, () => {
    console.log(`listening on ${PORT}`);
});