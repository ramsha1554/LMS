const User = require('../models/user.model.js');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const genToken = require('../config/token');

const SignUp=  async (req, res) => {

try {


   const  {name, email, password, role} = req.body;

   
    let existingUser = await User.findOne({email});
    if(existingUser){
        return res.status(400).json({message: 'User already exists'});
    }if (!name || !email || !password) {
        return res.status(400).json({message: 'Please provide all required fields'});
    }
    if(password.length < 6){
        return res.status(400).json({message: 'Password must be at least 6 characters'});
    }
    if(!validator.isEmail(email)){
        return res.status(400).json({message: 'Please provide a valid email'});
    }
let hashedPassword = await bcrypt.hash(password, 10);
const user = await User.create({name, email, password: hashedPassword , role});
const token = await genToken(user._id);
res.cookie('token', token, {

    httpOnly: true,
     maxAge: 24 * 60 * 60 * 1000});

res.status(201).json({message: 'User created successfully', user} );



    
} catch (error) {

    
res.status(500).json({ 
    message: 'Signup failed', 
    error: error.message 
});

    
}




}




const Login=  async (req, res) => {

try {


   const  {email, password} = req.body;

   
  if ( !email || !password) {
        return res.status(400).json({message: 'Please provide all required fields'});
    }
   
const user = await User.findOne({email});
if(!user){
    return res.status(400).json({message: 'User does not exist'});
}
const isPasswordCorrect = await bcrypt.compare(password, user.password);
if(!isPasswordCorrect){
    return res.status(400).json({message: 'Invalid credentials'});  

}
const token = await genToken(user._id);
res.cookie('token', token, {

    httpOnly: true,
     maxAge: 24 * 60 * 60 * 1000});

res.status(201).json({message: 'User Login successfully', user} );

    
} catch (error) {

    
res.status(500).json({ 
    message: 'Login failed', 
    error: error.message 
});

    
}




}



const Logout=  async (req, res) => {
try { await res.clearCookie('token');

    res.status(200).json({message: 'User logged out successfully'});
} catch (error) {

    res.status(500).json({ 
    message: 'Logout failed', 
    error: error.message 
});
    
}


}

module.exports = {SignUp, Login, Logout};

