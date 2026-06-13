import nodemailer from "nodemailer";

const sendMail = async (to, otp) => {
  console.log("sendMail called with:", to);
  console.log("USER_EMAIL:", process.env.USER_EMAIL);
  console.log("USER_PASSWORD length:", process.env.USER_PASSWORD?.length);
  
  const transport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.USER_EMAIL,
      pass: process.env.USER_PASSWORD,
    },
  });

  try {
    const result = await transport.sendMail({
      from: `"SkillSync" <${process.env.USER_EMAIL}>`,
      to,
      subject: "Password Reset OTP - SkillSync",
      text: `Your OTP is: ${otp}. Valid for 5 minutes.`,
    });
    console.log("Email sent successfully:", result.messageId);
  } catch (err) {
    console.error("Email send error:", err.message);
    throw err;
  }
};

export default sendMail;