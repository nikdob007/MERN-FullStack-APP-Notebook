const jwt = require('jsonwebtoken');

const JWT_TOKEN = 'Codewithnikunjgoodb$oy';

const fetchuser = (req, res, next) => {
    // Get the user from the JWT Token and add id to req object
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({ error: "Please authenticate valid token" });
    }
    try {
        const data = jwt.verify(token, JWT_TOKEN);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({ error: "Please authenticate valid token" });
    }

}

module.exports = fetchuser;