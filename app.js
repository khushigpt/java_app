const express = require('express');
const app = express();   // THIS LINE IS CRITICAL

app.get('/', (req, res) => {
    res.send("Hello from CI/CD Pipeline 🚀 - v2");
});

app.get('/health', (req, res) => {
    res.status(200).send("OK");
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
