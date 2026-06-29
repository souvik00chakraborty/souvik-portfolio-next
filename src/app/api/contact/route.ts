import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { saveSubmission } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json();

    // Basic Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required fields." },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    // Save submission to database
    await saveSubmission(name, email, message);

    const host = process.env.SMTP_HOST;
    const port = process.env.SMTP_PORT;
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const receiver = process.env.CONTACT_RECEIVER_EMAIL || "souvik00chakraborty@gmail.com";

    console.log(`[Contact Form Submission] Received from ${name} (${email})`);

    // Check if SMTP is configured
    if (host && port && user && pass) {
      const transporter = nodemailer.createTransport({
        host,
        port: parseInt(port),
        secure: parseInt(port) === 465, // true for 465, false for other ports
        auth: {
          user,
          pass,
        },
      });

      const mailOptions = {
        from: `"${name}" <${email}>`,
        to: receiver,
        subject: `New Portfolio Contact Form Submission from ${name}`,
        text: `You have received a new message from your portfolio contact form.\n\n` +
              `Name: ${name}\n` +
              `Email: ${email}\n\n` +
              `Message:\n${message}`,
        html: `<div style="font-family: sans-serif; padding: 20px; color: #333; line-height: 1.6;">` +
              `<h2>New Portfolio Contact Form Submission</h2>` +
              `<p><strong>Name:</strong> ${name}</p>` +
              `<p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>` +
              `<div style="margin-top: 20px; padding: 15px; background-color: #f9f9f9; border-left: 4px solid #6366f1;">` +
              `<p style="margin: 0; white-space: pre-wrap;">${message}</p>` +
              `</div>` +
              `</div>`,
      };

      await transporter.sendMail(mailOptions);
      console.log(`[Contact Form Submission] Email successfully sent to ${receiver}`);

      return NextResponse.json({
        success: true,
        message: "Your message has been sent successfully!",
      });
    } else {
      // Development mode / fallback logging
      console.log("=========================================");
      console.log("SMTP configuration is missing. Logging details in development/dry-run mode:");
      console.log(`To: ${receiver}`);
      console.log(`From: ${name} (${email})`);
      console.log(`Message: ${message}`);
      console.log("=========================================");

      return NextResponse.json({
        success: true,
        message: "Message received in development mode (logged to console). Configure SMTP for real delivery.",
      });
    }
  } catch (error: any) {
    console.error("[Contact Form API Error]", error);
    return NextResponse.json(
      { error: error.message || "Failed to process your request. Please try again later." },
      { status: 500 }
    );
  }
}
