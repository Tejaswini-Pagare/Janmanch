import { createTransport } from "nodemailer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import dotenv from "dotenv";
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const transport = createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.GMAIL,
    pass: process.env.PASSWORD,
  },
});

// console.log(process.env.GMAIL);

/**
 * Sends an email notification to the user.
 * @param {string} email - Recipient's email address
 * @param {string} userName - Recipient's name from MongoDB
 * @param {string} subject - Email subject
 * @param {string} message - Email body message
 * @param {string} link - Action link (optional)
 */
export const sendMail = async (email, userName, subject, message, link) => {
  try {
    let htmlTemplate = fs.readFileSync(
      path.join(__dirname, "emailTemplate.html"),
      "utf8"
    );
    htmlTemplate = htmlTemplate
      .replace("{{userName}}", userName)
      .replace("{{message}}", message)
      .replace("{{link}}", link || "#")
      .replace("{{unsubscribeLink}}", "https://janmanch.com/unsubscribe");

    // Send email
    await transport.sendMail({
      from: `"Janmanch" <${process.env.GMAIL}>`,
      to: email,
      subject,
      html: htmlTemplate,
    });

    console.log(`✅ Email sent to ${userName} (${email})`);
  } catch (error) {
    console.error(`❌ Error sending email to ${email}:`, error.message);
  }
};

export const sendResetPasswordMail = async (email, userName, tempPassword) => {
  const subject = "Your Temporary Password for Janmanch";
  const message = `Here is your temporary password: <b>${tempPassword}</b>. <br>
                   Please log in with this password and change it from your profile settings.`;

  try {
    await sendMail(email, userName, subject, message);
  } catch (error) {
    console.error(`❌ Error sending password reset email to ${email}:`, error.message);
  }
};

