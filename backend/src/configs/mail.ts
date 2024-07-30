import nodemailer from 'nodemailer';
import dotenv from 'dotenv'
dotenv.config()

export const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
      user: 'jules21@ethereal.email',
      pass: 'bDTHndMztVaCTUAJVy'
  }
});