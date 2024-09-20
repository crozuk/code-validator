const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(bodyParser.json());
app.use(express.static('public'));

// Utility function to get valid codes
function getValidCodes() {
    try {
        const data = fs.readFileSync(path.join(__dirname, 'valid_codes.txt'), 'utf8');
        return data.split('\n').filter(code => code.trim() !== '');
    } catch (err) {
        console.error('Error reading valid codes:', err);
        return [];
    }
}

// Route to validate product code
app.post('/validate', (req, res) => {
    const validCodes = getValidCodes();
    const { code } = req.body;

    if (!code) {
        return res.status(400).json({ valid: false, message: 'Product code is required.' });
    }

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

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
