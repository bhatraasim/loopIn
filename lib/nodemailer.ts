import nodemailer from "nodemailer"

export const sendEmail = async (email: string, subject: string, text: string) => {
    try {
        // Log environment variables (careful with exposing sensitive info in production)
        console.log("Host:", process.env.HOST);
        console.log("User email:", process.env.NODE_MAIL_USER ? "is set" : "is NOT set");
        console.log("Password:", process.env.NODE_MAIL_PASS ? "is set" : "is NOT set");
        
        // Create transporter
        const transporter = nodemailer.createTransport({
            host: process.env.HOST,
            port: 465,
            secure: true,
            auth: {
              user: process.env.NODE_MAIL_USER,
              pass: process.env.NODE_MAIL_PASS,
            },
        });
        
        // Verify SMTP connection configuration
        await transporter.verify().catch(err => {
            console.log("SMTP verification failed:", err);
            throw new Error("SMTP connection failed");
        });
        
        // Send email
        const info = await transporter.sendMail({
            from: process.env.NODE_MAIL_USER,
            to: email,
            subject: subject,
            text: text
        });
        
        console.log("Email sent successfully with ID:", info.messageId);
        console.log("Preview URL:", nodemailer.getTestMessageUrl(info));
        
        return { success: true, message: "Email sent successfully", info };

    } catch (error: any) {
        console.error("Email sending failed:", error);
        throw new Error(error.message || "Failed to send email");
    }
}