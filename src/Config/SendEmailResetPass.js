const nodemailer = require('nodemailer');

const dotenv = require('dotenv');
dotenv.config();

// Tạo transporter để gửi email
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.USER_SECRET_NODEMAILER,
        pass: process.env.PASSWORD_SECRET_NODEMAILER
    }
});

// Hàm gửi email lấy lại mật khẩu
async function sendPasswordResetEmail(userEmail, resetToken) {
    try {
        // Tạo link đặt lại mật khẩu
        const resetLink = `${process.env.PORT_FRONTEND}/guest/reset-password?token=${resetToken}`;

        // Nội dung email
        const mailOptions = {
            from: 'thucdn04@gmail.com', // Email người gửi
            to: userEmail,                // Email người nhận
            subject: 'Lấy Lại Mật Khẩu',
            html: `<p>Click vào link dưới đây để đặt lại mật khẩu của bạn:</p>
                   <a href="${resetLink}">Đặt lại mật khẩu</a>`
        };

        // Gửi email
        await transporter.sendMail(mailOptions);
        console.log('Email đã được gửi thành công!');
    } catch (error) {
        console.error('Gửi email thất bại:', error);
    }
}

module.exports = sendPasswordResetEmail;