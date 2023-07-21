const jwt = require('../lib/jsonwebtoken.js');
const { SECRET } = require('../constants.js');
const tokenStorage = require('../tokens/tokens.js');

exports.authorizedUser = async (req, res, next) => {
    if (!req.headers['Authorization']) {
        return res.send(401).json('Unauthorized');
    }

    const bearer = req.headers['Authorization'];
    const token = bearer.split(' ')[1];

    if (!tokenStorage.includes(token)) {
        console.log('User is authorized');
    }



    next();
}