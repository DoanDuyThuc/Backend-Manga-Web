const { VerifyRefreshToken } = require('../Services/JwtService');
const {
    SignInService,
    LoginService,
} = require('../Services/userService');


const LoginController = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Không được để trống!' });
    }

    const account = await LoginService({ email, password });

    if (account.error) {
        return res.status(400).json(account);
    }

    const { refresh_token, ...data } = account;

    res.cookie('refresh_token', refresh_token, {
        httpOnly: true,
        secure: false, // Đặt là true nếu bạn sử dụng HTTPS
        sameSite: 'Strict',
    });

    return res.status(200).json(data);

}

const SignInController = async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: 'Không được để trống!' });
    }

    const account = await SignInService({ username, email, password })

    if (account.error) {
        return res.status(400).json(account);
    }

    return res.status(200).json(account);

}

const refreshToken = async (req, res) => {
    try {
        const token = req.cookies.refresh_token;
        if (!token) {
            res.status(401).json({
                status: "err",
                massage: "không tìm thấy token !"
            })
        }
        return await VerifyRefreshToken(token, res)
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            status: "err",
            massage: 'có lỗi khi xác thực !',
            error
        })

    }
}

const LogoutController = async (req, res) => {
    try {
        res.clearCookie('refresh_token');
        res.status(200).json({
            status: "ok",
            message: "Đã đăng xuất"
        })
    } catch (error) {
        res.status(400).json({
            status: "err",
            error,
            message: "Lỗi khi đăng xuất"
        })
    }
}

const UploadImageController = async (req, res) => {

    try {
        const filePaths = req.files.map(file => `/Ucomics/${file.filename}`); // Lưu đường dẫn file vào mảng

        res.status(200).json({
            message: 'Files uploaded successfully',
            filePaths: filePaths, // Trả về mảng đường dẫn của các file đã upload
        });
    } catch (error) {
        res.status(500).json({ error: 'Error uploading files' });
    }
}

module.exports = {
    LoginController,
    SignInController,
    refreshToken,
    LogoutController,
    UploadImageController
};