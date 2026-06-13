import nodemailer from "nodemailer";

const sendMail = async (to, otp) => {
  const transport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.USER_EMAIL,
      pass: process.env.USER_PASSWORD,
    },
  });

  await transport.sendMail({
    from: `"SkillSync" <${process.env.USER_EMAIL}>`,
    to,
    subject: "Password Reset OTP - SkillSync",
    html: `
      <div style="font-family:sans-serif;max-width:400px;margin:auto;padding:24px;border:1px solid #e5e7eb;border-radius:8px">
        <h2 style="color:#111">Password Reset OTP</h2>
        <p>Your OTP for password reset is:</p>
        <h1 style="letter-spacing:8px;color:#111">${otp}</h1>
        <p style="color:#6b7280;font-size:13px">This OTP is valid for 5 minutes. Do not share it with anyone.</p>
      </div>
    `,
  });
};

export default sendMail;