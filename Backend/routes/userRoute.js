const express = require('express');
const isAuth = require('../middleware/isAuth.js');
const getCurrentUser = require('../controllers/userController.js');
const userRouter = express.Router();


userRouter.get('/getcurrentuser', isAuth, getCurrentUser);

module.exports = userRouter;