import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Validate required fields
    const { firstName, lastName, email, subject, message } = data;

    if (!firstName || !lastName || !email || !subject || !message) {
      return NextResponse.json(
        { error: "All required fields must be filled" },
        { status: 400 }
      );
    }

    // Here you can:
    // 1. Send email using a service like Resend, SendGrid, or Nodemailer
    // 2. Save to database (Sanity, Supabase, etc.)
    // 3. Send to a CRM like HubSpot
    // 4. Send to Slack/Discord webhook

    // Example: Log to console in development
    if (process.env.NODE_ENV === "development") {
      console.log("Contact form submission:", {
        name: `${firstName} ${lastName}`,
        email,
        subject,
        message,
        newsletter: data.newsletter || false,
        timestamp: new Date().toISOString(),
      });
    }

    // Send email using Resend (only if API key is properly configured)
    if (
      process.env.RESEND_API_KEY &&
      process.env.RESEND_API_KEY !== "re_your_api_key_here" &&
      process.env.RESEND_API_KEY.startsWith("re_")
    ) {
      try {
        const { Resend } = await import("resend");
        const resend = new Resend(process.env.RESEND_API_KEY);

        await resend.emails.send({
          from: "contact@belleandbeyond.com", // You'll need to verify this domain
          to: ["izabellewilding@gmail.com"], // Your email address
          replyTo: email, // This allows you to reply directly to the user
          subject: `Contact Form: ${subject}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #333; border-bottom: 2px solid #333; padding-bottom: 10px;">
                New Contact Form Submission
              </h2>
              
              <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <p style="margin: 10px 0;"><strong>Name:</strong> ${firstName} ${lastName}</p>
                <p style="margin: 10px 0;"><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
                <p style="margin: 10px 0;"><strong>Subject:</strong> ${subject}</p>
                <p style="margin: 10px 0;"><strong>Newsletter Signup:</strong> ${data.newsletter ? "Yes" : "No"}</p>
              </div>
              
              <div style="background: white; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
                <h3 style="color: #333; margin-top: 0;">Message:</h3>
                <p style="white-space: pre-wrap; line-height: 1.6;">${message}</p>
              </div>
              
              <div style="margin-top: 20px; padding: 15px; background: #e8f4f8; border-radius: 8px;">
                <p style="margin: 0; font-size: 14px; color: #666;">
                  <strong>💡 Tip:</strong> You can reply directly to this email to respond to ${firstName}.
                </p>
              </div>
            </div>
          `,
        });
        console.log("Email sent successfully via Resend");
      } catch (emailError) {
        console.error("Failed to send email:", emailError);
        // Don't fail the entire request if email fails
      }
    } else {
      console.warn(
        "RESEND_API_KEY not found or not properly configured. Email not sent, but form submission logged."
      );
    }

    return NextResponse.json({
      success: true,
      message: "Thank you for your message! We'll get back to you soon.",
    });
  } catch (error) {
    console.error("Error processing contact form:", error);
    return NextResponse.json(
      { error: "Failed to send message. Please try again." },
      { status: 500 }
    );
  }
}
