import { err } from "inngest/types";
import nodemailer from "nodemailer"
export const sendmail = async (to, subject, text) => {
   try {
   const transporter = nodemailer.createTransport({
  host: process.env.MAILTRAP_SMTP_HOST,
  port: process.env.MAILTRAP_SMTP_PORT,
  secure: false, 
  auth: {
    user: process.env.MAILTRAP_SMTP_USER,
    pass: process.env.MAILTRAP_SMTP_PASS,
  },
});
const info = await transporter.sendMail({
    from: 'Inngest TMS',
    to,
    subject,
    text
  });
  console.log("Message sent:", info.messageId);
  return info
   } catch (error) {
      console.error('mail error', error.message)
      throw error
   }
}