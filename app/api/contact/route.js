import axios from "axios";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const escapeHtml = (value) =>
  String(value).replace(/[&<>"']/g, (character) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return entities[character];
  });

async function sendTelegramMessage(token, chatId, message) {
  try {
    const response = await axios.post(
      `https://api.telegram.org/bot${token}/sendMessage`,
      { text: message, chat_id: chatId },
      { timeout: 8000 }
    );
    return Boolean(response.data?.ok);
  } catch (error) {
    console.error("Telegram notification failed:", error.message);
    return false;
  }
}

async function sendEmail({ name, email, message }) {
  const { EMAIL_ADDRESS, GMAIL_PASSKEY } = process.env;
  if (!EMAIL_ADDRESS || !GMAIL_PASSKEY) return false;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: EMAIL_ADDRESS,
        pass: GMAIL_PASSKEY,
      },
    });

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeMessage = escapeHtml(message).replace(/\n/g, "<br>");

    await transporter.sendMail({
      from: `"Portfolio Contact Form" <${EMAIL_ADDRESS}>`,
      to: EMAIL_ADDRESS,
      replyTo: email,
      subject: `New portfolio message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family:Arial,sans-serif;color:#222;line-height:1.6">
          <h2>New portfolio message</h2>
          <p><strong>Name:</strong> ${safeName}</p>
          <p><strong>Email:</strong> ${safeEmail}</p>
          <p><strong>Message:</strong></p>
          <p>${safeMessage}</p>
        </div>
      `,
    });

    return true;
  } catch (error) {
    console.error("Email notification failed:", error.message);
    return false;
  }
}

export async function POST(request) {
  let payload;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, message: "Please submit a valid message." },
      { status: 400 }
    );
  }

  const name = typeof payload?.name === "string" ? payload.name.trim() : "";
  const email = typeof payload?.email === "string" ? payload.email.trim() : "";
  const message = typeof payload?.message === "string" ? payload.message.trim() : "";

  if (!name || !email || !message) {
    return NextResponse.json(
      { success: false, message: "Name, email and message are required." },
      { status: 400 }
    );
  }

  if (name.length > 100 || email.length > 254 || message.length > 1000) {
    return NextResponse.json(
      { success: false, message: "One or more fields exceed the allowed length." },
      { status: 400 }
    );
  }

  if (!emailPattern.test(email)) {
    return NextResponse.json(
      { success: false, message: "Please provide a valid email address." },
      { status: 400 }
    );
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  const hasTelegram = Boolean(token && chatId);
  const hasEmail = Boolean(process.env.EMAIL_ADDRESS && process.env.GMAIL_PASSKEY);

  if (!hasTelegram && !hasEmail) {
    return NextResponse.json(
      { success: false, message: "The contact service is not configured yet." },
      { status: 503 }
    );
  }

  const notificationText = `New portfolio message from ${name}\nEmail: ${email}\n\nMessage:\n${message}`;

  const [telegramSent, emailSent] = await Promise.all([
    hasTelegram ? sendTelegramMessage(token, chatId, notificationText) : Promise.resolve(false),
    hasEmail ? sendEmail({ name, email, message }) : Promise.resolve(false),
  ]);

  if (telegramSent || emailSent) {
    return NextResponse.json(
      { success: true, message: "Your message has been sent successfully." },
      { status: 200 }
    );
  }

  return NextResponse.json(
    { success: false, message: "We could not deliver your message. Please email directly." },
    { status: 502 }
  );
}
