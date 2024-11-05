const { VerifyRefreshToken } = require('../Services/JwtService');
const {
    SignInService,
    LoginService,
    GetProfileService,
    UpdateUserService,
    ChangePasswordService,
    GetAllUserService,
    DeleteUserService,
    GetInfoUpdateService,
    UpdateInfoUserService
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
        const result = await VerifyRefreshToken(token, res)

        if (result.status === "ERROR") {
            return res.status(401).json(result);
        }

        return res.status(200).json(result);
    } catch (error) {
        console.log(error);
        return res.status(401).json({
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

const GetProfileController = async (req, res) => {

    const { id } = req.user;

    const info = await GetProfileService(id);

    if (info.error) {
        return res.status(400).json(info);
    }

    return res.status(200).json(info);
}

const UpdateUserController = async (req, res) => {
    const { id } = req.user;

    const { username } = req.body;

    let pathAvatar;

    if (req.file) {
        const file = req.file;
        pathAvatar = `/avatars/${file.filename}`;  // Gán đường dẫn avatar mới
    }

    const newInfo = await UpdateUserService(id, username, pathAvatar);

    if (newInfo.error) {
        return res.status(400).json(newInfo);
    }

    return res.status(200).json(newInfo);
}

const ChangePasswordController = async (req, res) => {
    const { id } = req.user;

    const { oldPassword, newPassword } = req.body;

    const result = await ChangePasswordService(id, oldPassword, newPassword);

    if (result.error) {
        return res.status(400).json(result);
    }

    return res.status(200).json(result);
}

const GetAllUserController = async (req, res) => {

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const search = req.query.search || '';

    const users = await GetAllUserService({ limit, page, search });

    if (users.error) {
        return res.status(400).json(users);
    }

    return res.status(200).json(users);

}

const DeleteUserController = async (req, res) => {
    const { ids } = req.body;

    const result = await DeleteUserService(ids);

    if (result.error) {
        return res.status(400).json(result);
    }

    return res.status(200).json(result);
}

const GetInfoUpdateController = async (req, res) => {
    const { id } = req.params;

    const info = await GetInfoUpdateService(id);

    if (info.error) {
        return res.status(400).json(info);
    }

    return res.status(200).json(info);
}

const UpdateInfoUserController = async (req, res) => {
    const { id } = req.params;

    const { username, email, role, point } = req.body;

    const result = await UpdateInfoUserService(id, username, email, role, point);

    if (result.error) {
        return res.status(400).json(result);
    }

    return res.status(200).json(result);
}

module.exports = {
    LoginController,
    SignInController,
    refreshToken,
    LogoutController,
    UploadImageController,
    GetProfileController,
    UpdateUserController,
    ChangePasswordController,
    GetAllUserController,
    DeleteUserController,
    GetInfoUpdateController,
    UpdateInfoUserController
};