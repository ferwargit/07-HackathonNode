import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const sendTo = async (emailTo, subject, body) => {
  try {
    const mail = {
      from: process.env.SMTP_USER,
      to: emailTo,
      subject: subject,
      text: body,
    };
    await transporter.sendMail(mail);
  } catch (error) {
    console.error(error);
  }
};

export default sendTo;
