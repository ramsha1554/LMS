const jwt = require('jsonwebtoken');
require("dotenv").config();

const genToken =async (userId) => {
try {
    const token = await jwt.sign({userId}, process.env.JWT_SECRET, {expiresIn: '1d'});
 
    return token;
} catch (error) {
    console.log(error);
    throw new Error('Token generation failed');
}



}

module.exports = genToken;