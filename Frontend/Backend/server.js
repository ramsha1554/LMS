const express = require('express');
const connectDB = require('./config/connectDB');
const authRouter = require('./routes/authRoute.js');
const cookieParser = require('cookie-parser');
const cors = require('cors');


const app = express()
const port = 3000 || process.env.PORT
require("dotenv").config();




app.use(cors({
    origin: 'http://localhost:5173', // frontend address
    credentials: true, // allow cookies
}));    
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.use('/api/auth', require('./routes/authRoute.js'));
app.use('/api/user', require('./routes/userRoute.js'));





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



