const emailVerificationTemplate = (otp) => {
  return `<!DOCTYPE html>
  <html>
  <head>
      <meta charset="UTF-8">
      <title>OTP Verification Email</title>
  </head>
  <body style="background-color:#ffffff; font-family:Arial, sans-serif; font-size:16px; line-height:1.4; color:#333; margin:0; padding:0;">
      <div style="max-width:600px; margin:0 auto; padding:20px; text-align:center;">
          
          <!-- Yellow Phajil Text Instead of Logo -->
          <h3 style="color:#FFD60A; font-size:24px; font-weight:bold; margin-bottom:10px;">Phajil</h3>
          
          <div style="font-size:18px; font-weight:bold; color:#5A189A; margin-bottom:20px;">OTP Verification Email</div>
          
          <div style="font-size:16px; margin-bottom:20px; color:#5A189A;">
              <p>Dear User,</p>
              <p>Thank you for registering with <b>Phajil</b>. To complete your registration, please use the following One-Time Password (OTP) to verify your account:</p>
              <h2 style="font-size:28px; font-weight:bold; color:#FFD60A; margin:20px 0;">${otp}</h2>
              <p>This OTP is valid for 5 minutes. If you did not request this verification, please ignore this email.</p>
          </div>
          
          <div style="font-size:14px; color:#666; margin-top:20px;">
              If you have any questions or need assistance, please feel free to reach out to us at 
              <a href="mailto:support@phajil.com" style="color:#FFD60A; text-decoration:none;">support@phajil.com</a>.
          </div>
      </div>
  </body>
  </html>`;
};

export default emailVerificationTemplate;
