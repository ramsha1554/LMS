const express = require('express');
const connectDB = require('./config/connectDB');
const authRouter = require('./routes/authRoute.js');
const cookieParser = require('cookie-parser');



const app = express()
const port = 3000 || process.env.PORT
require("dotenv").config();





app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.use('/api/auth', require('./routes/authRoute.js'));





app.get('/', (req, res)=>{

    res.send('Hello World!')
})




const startServer = async () => {
    try {
        await connectDB();   
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    } catch (err) {
        console.error("Failed to start server:", err);
        process.exit(1);   
    }
};

startServer();



