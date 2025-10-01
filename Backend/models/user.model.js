const mongoose = require('mongoose');

const validator = require('validator');
const bcrypt = require('bcryptjs');
const userSchema = mongoose.Schema(

    {


name:{ type: String, required: true},
description:{ type: String },
email:{ type: String, required: true, unique: true , validate:[validator.isEmail, 'Please provide a valid email']},
password:{ type: String, required: true},
role:{ type: String, enum: ['student', 'educator'], default: 'student' },
photo:{ type: String , default: 'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg' },
enrolledCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],

  

    enrolledCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }], 

    resetotp:{ type: String },
    otpExpiry:{ type: Date },   
    isOtpVerified:{ type: Boolean, default: false }
,
    },

    { timestamps: true }
)







const User = mongoose.model('User', userSchema);

module.exports = User;