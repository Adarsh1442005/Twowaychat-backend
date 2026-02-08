import nodemailer from "nodemailer";

export const EmailVerify = async ({ email }) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.sendgrid.net",
    port: 587,
    auth: {
      user: "apikey", // this is literally the string "apikey"
      pass: process.env.SENDGRID_API_KEY, // your API key from env
    },
  });

  let otpcheck; // keep the same variable name
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER, // must be a verified sender in SendGrid
      to: email,
      subject: "Email Verification",
      text: `Your verification code is: ${otp}. It will expire in 10 minutes.`,
    });

    otpcheck = otp; // assign OTP to otpcheck
    console.log("Verification email sent successfully!");
  } catch (error) {
    console.error("Error sending email:", error.message, error);
    throw error; // propagate error so caller knows
  }

  const op = { otpcheck }; // return in the same structure as before
  return op;
};
