const jwt = require('jsonwebtoken');
const jwtConfig = require("../config/tokenConfig");

module.exports = (req, res, next) => {
    try {
        const token = req.get('authorization').split(' ')[1];
        const decodedToken = jwt.verify(token, jwtConfig.secret_key);
        req.auth = {
            login: decodedToken.login,
            admin: decodedToken.role
        };
    } catch (err) {
        //res.status(401).json({error: 'Vous devez être authentifié !'});
    }
    next();
}
