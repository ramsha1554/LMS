const user = require('../models/user.model.js');

const getCurrentUser = async(req, res) => {
    try {
        const user =  await user.findById(req.userId).select('-password');
        if(!user){
            return res.status(404).json({message: 'User not found'});
        }
        
        res.status(200).json({user});   
    } catch (error) {
        res.status(500).json({message: 'Failed to fetch user', error: error.message});
    }
}

module.exports = getCurrentUser;