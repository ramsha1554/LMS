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


const sendMail = async (to, subject, text) => {
  const mailOptions = {
    from: process.env.USER_EMAIL,   
    to,
    subject,
    text,
    };
    try {
      
        await transport.sendMail(mailOptions);
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

module.exports = sendMail;



  
  module.exports = transport;