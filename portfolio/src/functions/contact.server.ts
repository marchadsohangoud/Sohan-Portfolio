import { createServerFn } from "@tanstack/react-start";
import nodemailer from "nodemailer";

type ContactInput = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export const sendContactEmail = createServerFn<"POST", ContactInput, ContactInput, Promise<{ success: boolean; message: string }>>({
  method: "POST",
}).handler(async (ctx) => {
  const data = ctx.data as unknown as ContactInput;

  const { EMAIL_USER, EMAIL_PASS } = process.env;

  if (!EMAIL_USER || !EMAIL_PASS) {
    throw new Error("Missing EMAIL_USER or EMAIL_PASS in .env");
  }

  if (!data.name || data.name.length < 2) throw new Error("Name is required");
  if (!data.email || !data.email.includes("@")) throw new Error("Enter a valid email");
  if (!data.subject || data.subject.length < 3) throw new Error("Subject is required");
  if (!data.message || data.message.length < 10) throw new Error("Message too short");

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"Portfolio Contact" <${EMAIL_USER}>`,
    to: EMAIL_USER,
    replyTo: data.email,
    subject: `[Portfolio] ${data.subject}`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2>New message from portfolio</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Subject:</strong> ${data.subject}</p>
        <p><strong>Message:</strong></p>
        <div style="white-space: pre-wrap;">${data.message}</div>
      </div>
    `,
  });

  return { success: true, message: "Message sent successfully" };
});