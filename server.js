const express = require('express');
const app = express();
const PORT = 3000;


app.use(express.json());


app.get('/ping', (req, res) => {
    res.send('pong');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});