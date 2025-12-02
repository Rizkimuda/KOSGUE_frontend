const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendOTP = async (email, otp) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Kode Verifikasi KosGue",
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2>Verifikasi Email Anda</h2>
        <p>Terima kasih telah mendaftar di KosGue. Gunakan kode berikut untuk memverifikasi akun Anda:</p>
        <h1 style="color: #d4af37; letter-spacing: 5px;">${otp}</h1>
        <p>Kode ini akan kadaluarsa dalam 15 menit.</p>
        <p>Jika Anda tidak merasa mendaftar, abaikan email ini.</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("OTP email sent to", email);
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Gagal mengirim email verifikasi");
  }
};

module.exports = { sendOTP };
