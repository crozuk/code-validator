const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const port = 3000;

// Middlewares
app.use(bodyParser.json());
app.use(express.static('public'));

function getValidCodes() {
    const data = fs.readFileSync('valid_codes.txt', 'utf8');
    return data.split('\n');
}

app.post('/validate', (req, res) => {
    const validCodes = getValidCodes();
    const { code } = req.body;

    // Generate a random delay between 0.3s (300ms) and 2.5s (2500ms)
    const randomDelay = Math.floor(Math.random() * (2500 - 300 + 1)) + 300;

    // Respond after the random delay
    setTimeout(() => {
        if (validCodes.includes(code)) {
            res.json({ valid: true, message: 'Valid Code!' });
        } else {
            res.json({ valid: false, message: 'Invalid Code!' });
        }
    }, randomDelay);
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
