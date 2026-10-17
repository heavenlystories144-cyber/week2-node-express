
require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// 1. Parse JSON request bodies
app.use(express.json());

// 2. Custom middleware: log every request
app.use((req, res, next) => {
    console.log(
        `[${new Date().toISOString()}] ${req.method} ${req.url}`
    );
    next();
});

// 3. GET / — Homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 4. GET /user/:id — User profile
app.get('/user/:id', (req, res) => {
    const userId = req.params.id;
    res.send(`User ${userId} profile`);
});

// 5. POST /user — Create a user greeting
app.post('/user', (req, res) => {
    const { name, email } = req.body || {};

    if (!name || !email) {
        return res.status(400).json({
            error: 'Name and email are required.'
        });
    }

    res.send(`Hello, ${name}!`);
});

// 6. Serve the static HTML page at /page
app.use('/page', express.static(path.join(__dirname, 'public')));

// 7. Handle unknown routes
app.use((req, res) => {
    res.status(404).send('Route not found');
});

// 8. Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
