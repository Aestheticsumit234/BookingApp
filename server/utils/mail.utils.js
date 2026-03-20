import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.USER_PASSWORD,
  },
});

export const sendBookingEmail = async (userMail, userName, eventTitle) => {
  try {
    const htmlContent = `
    <div style="background-color: #f8fafc; padding: 40px 15px; font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;">
      <div style="max-width: 550px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05);">
        
        <div style="background-color: #10b981; padding: 30px; text-align: center;">
          <div style="background-color: rgba(255,255,255,0.2); width: 60px; height: 60px; border-radius: 50%; margin: 0 auto 15px auto; display: flex; align-items: center; justify-content: center;">
            <span style="color: #ffffff; font-size: 30px; line-height: 60px;">✓</span>
          </div>
          <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 700;">Booking Confirmed!</h1>
        </div>

        <div style="padding: 40px;">
          <p style="color: #1e293b; font-size: 18px; font-weight: 600; margin-bottom: 8px;">Hi ${userName},</p>
          <p style="color: #64748b; font-size: 15px; line-height: 1.6; margin-bottom: 30px;">
            Great news! Your booking for <strong>"${eventTitle}"</strong> has been successfully confirmed. We've reserved your spot and look forward to seeing you there.
          </p>

          <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; margin-bottom: 30px;">
            <p style="color: #94a3b8; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; font-weight: 700; margin: 0 0 10px 0;">Event Details</p>
            <h3 style="color: #1e293b; font-size: 18px; margin: 0 0 5px 0;">${eventTitle}</h3>
            <p style="color: #4F46E5; font-size: 14px; font-weight: 600; margin: 0;">Status: Reserved & Active</p>
          </div>

          <div style="text-align: center; margin-bottom: 35px;">
            <a href="https://venuly.com/my-bookings" style="background-color: #4F46E5; color: #ffffff; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 15px; display: inline-block;">View Booking Details</a>
          </div>

          <p style="color: #94a3b8; font-size: 13px; line-height: 1.5; text-align: center; margin: 0;">
            Need to make changes? You can manage your booking through your Venuly dashboard or contact our support team.
          </p>
        </div>

        <div style="padding: 25px; background-color: #fafafa; border-top: 1px solid #f1f5f9; text-align: center;">
          <p style="color: #94a3b8; font-size: 12px; margin: 0;">
            © ${new Date().getFullYear()} **Venuly Pvt. Ltd.** | Your Premium Event Partner
          </p>
        </div>
      </div>
    </div>
    `;

    const mailOptions = {
      from: `"Venuly Bookings" <${process.env.USER_EMAIL}>`,
      to: userMail,
      subject: `Booking Confirmed: ${eventTitle}`,
      html: htmlContent,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Confirmation email sent to ${userMail}`);
  } catch (error) {
    console.error(`Booking Email Error: ${error.message}`);
  }
};

export const sendOTPMail = async (email, otp, type) => {
  try {
    const isAccountVerify = type === "account_verification";

    const title = isAccountVerify
      ? "Verify your account"
      : "Confirm your Booking";
    const bodyText = isAccountVerify
      ? "Please use the following One-Time Password (OTP) to verify your account and get started:"
      : "Please use the following One-Time Password (OTP) to verify and confirm your event booking:";

    const htmlContent = `
    <div style="background-color: #f4f7f9; padding:0 0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;">
  <div style="max-width: 520px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.03);">
    
    <div style="height: 6px; background-color: #4F46E5;"></div>

    <div style="padding: 40px;">
      <div style="text-align: left; margin-bottom: 30px;">
        <h1 style="color: #1a1a1a; margin: 0; font-size: 22px; font-weight: 700; letter-spacing: -0.8px;">Venuly Team,</h1>
      </div>

      <h2 style="color: #111827; margin: 0 0 16px 0; font-size: 20px; font-weight: 600; line-height: 1.3;">${title}</h2>
      
      <p style="color: #4b5563; font-size: 15px; line-height: 1.6; margin-bottom: 25px;">
        Hello,<br><br>
       ${bodyText}
      </p>
      
      <div style="background-color: #190df777; border: 1px solid #e2e8f0; border-radius: 8px; padding: 24px; text-align: center; margin-bottom: 25px;">
        <div style="font-family: 'SF Mono', 'Roboto Mono', Menlo, monospace; font-size: 36px; font-weight: 700; color: #1e293b; letter-spacing: 10px; margin-bottom: 8px;">
          ${otp}
        </div>
        <p style="color: #fff; font-size: 12px; font-weight: 500; text-transform: uppercase; letter-spacing: 1px; margin: 0;">
          Code expires in 5 minutes
        </p>
      </div>

      <p style="color: #4b5563; font-size: 14px; line-height: 1.6;">
        For your security, do not share this code with anyone. Venuly representatives will never ask for this password.
      </p>

      <div style="height: 1px; background-color: #f1f5f9; margin: 35px 0;"></div>
      
      <p style="color: #94a3b8; font-size: 13px; line-height: 1.5; margin: 0;">
        Thank you,<br>
        <strong>The Venuly Security Team</strong>
      </p>
    </div>

    <div style="padding: 24px 40px; background-color: #fafafa; border-top: 1px solid #f1f5f9; text-align: center;">
      <p style="color: #94a3b8; font-size: 12px; margin: 0; line-height: 1.5;">
        You received this because an account action was requested on Venuly.<br>
        If this wasn't you, please <a href="#" style="color: #4F46E5; text-decoration: none;">secure your account</a>.
      </p>
      <div style="margin-top: 15px;">
        <a href="#" style="color: #cbd5e1; font-size: 11px; text-decoration: none; margin: 0 10px;">Privacy Policy</a>
        <a href="#" style="color: #cbd5e1; font-size: 11px; text-decoration: none; margin: 0 10px;">Contact Support</a>
      </div>
    </div>
  </div>
</div>
    `;

    const mailOptions = {
      from: `"Venuly Team" <${process.env.USER_EMAIL}>`,
      to: email,
      subject: title,
      text: `Your OTP for ${title} is ${otp}`,
      html: htmlContent,
    };

    await transporter.sendMail(mailOptions);

    console.log(`OTP sent successfully to ${email} for ${type}`);
  } catch (error) {
    console.error(`Error sending email: ${error.message}!!`);
  }
};
