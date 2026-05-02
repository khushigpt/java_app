// app.js
const http = require('http');
const app = express();
const server = http.createServer((req, res) => {
    res.write("Hello from CI/CD Pipeline 🚀- Version 2");
    res.end();
});
app.get('/', (req, res) => {
    res.send("Hello from CI/CD Pipeline 🚀 - v2");
});

app.get('/health', (req, res) => {
    res.status(200).send("OK");
});
server.listen(3000, () => {
    console.log("Server running on port 3000");
});
