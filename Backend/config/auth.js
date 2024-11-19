const jwt = require('jsonwebtoken');
const config = require("./auth.config");
// const config = { secret: 'reyan-secret-key' }; // Replace with your actual secret

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    console.log('Authorization Header:', authHeader); // Log header for debugging

    if (!authHeader) return res.status(403).send('Access denied: Authorization header missing');

    const token = authHeader.split(' ')[1]; // Extract the token after "Bearer"
    console.log('Extracted Token:', token); // Log the extracted token

    if (!token) return res.status(403).send('Access denied: Token missing');

    jwt.verify(token, config.secret, (err, user) => {
        if (err) return res.status(403).send('Invalid token');
        console.log('Verified User:', user); // Log the verified user
        req.user = user;
        next();
    });
};

module.exports = authenticateToken;
