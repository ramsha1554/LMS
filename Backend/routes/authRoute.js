const express = require('express');
const authRouter= express.Router();
const { SignUp, Login, Logout } = require('../controllers/authController');


authRouter.post("/signup", SignUp);
authRouter.post("/login", Login);
authRouter.get("/logout", Logout);


module.exports = authRouter;


