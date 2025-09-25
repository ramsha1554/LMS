const jwt = require('jsonwebtoken');
require("dotenv").config();
const User = require('../models/userModel');

const isAuth = async (req, res, next) => {
try {       
    const { token } = req.cookies;
    if(!token){
        return res.status(401).json({message: 'Unauthorized'});
    }
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);   
    if(!user){
        return res.status(401).json({message: 'Unauthorized'});
    }
    req.user = user;
    next();

} catch (error) {
    res.status(500).json({ 
        message: 'Authentication failed', 
        error: error.message 
    });
}   

}

module.exports = isAuth;