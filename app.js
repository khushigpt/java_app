// app.js
const http = require('http');

const server = http.createServer((req, res) => {
    res.write("Hello from CI/CD Pipeline 🚀- Version 2");
    res.end();
});

server.listen(3000, () => {
    console.log("Server running on port 3000");
});
