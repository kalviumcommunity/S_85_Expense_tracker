const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());

// Basic /ping route
app.get('/', (req, res) => {
    res.send('Hello,I am Aman.This is my project Expense Tracker');
});

// Start the server
app.listen(PORT, () => {
    console.log(Server is running on http://localhost:${PORT});
});
