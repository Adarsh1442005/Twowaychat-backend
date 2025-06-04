import nodemailer from 'nodemailer';
export const EmailVerify=async ({email})=>{
const transporter = nodemailer.createTransport({
  service: "Gmail", // Use Gmail SMTP
  auth: {
    user: "ap4866017@gmail.com", // Your Gmail address
    pass: "tqsp srfc mtil yrxn", // Your Gmail App Password
  },
});
let otpcheck;
const otp = Math.floor(100000 + Math.random() * 900000).toString();
try {
      await transporter.sendMail({
        from: "ap4866017@gmail.com",
        to: email,
        subject: "Email Verification",
        text: `Your verification code is: ${otp}. It will expire in 10 minutes.`,
      });
      otpcheck=otp;

      console.log("Verification email sent successfully!");
    } catch (error) {
      console.error("Error sending email:", error);
    }
    const op={otpcheck};
return op;

}
