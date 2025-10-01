const {createTransport} = require('nodemailer');
require('dotenv').config(); 


const transport = nodemailer.createTransport({
   service: 'Gmail',
   port: 465,
    secure: true,
    
    auth: {
      user: process.env.USER_EMAIL,
      pass: process.env.USER_PASSWORD
      
      
      
      ,
    },
  });


const sendMail =async(to , otp) =>{

  await transport.sendMail({
    from: process.env.USER_EMAIL,
    to: to,
    subject: 'Password Reset OTP',
    text: `Your OTP for password reset is: ${otp}. It is valid for 5 minutes.`,
  }); 




}
module.exports = sendMail;