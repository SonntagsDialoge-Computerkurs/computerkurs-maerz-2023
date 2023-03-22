const express = require("express");
const path = require("path");

const hostname = '127.0.0.1';
const port = 8080;
const server = express();

server.use("/src/js", express.static(path.join(__dirname, '/src/js')))
server.use("/lib/js", express.static(path.join(__dirname, '/lib/js')))

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

server.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});