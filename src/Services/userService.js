const db = require('../models/index');
const bcrypt = require('bcrypt');
const fs = require('fs');
const { genneralAccessToken, genneralRefreshToken } = require('./JwtService');
const path = require('path');
const { Op } = require('sequelize');
const sendPasswordResetEmail = require('../Config/SendEmailResetPass');

const SignInService = async ({ username, email, password }) => {

    try {

        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(password, salt);

        const isEmail = await db.User.findOne({
            where: {
                email
            }
        });

        const isUsername = await db.User.findOne({
            where: {
                username
            }
        });

        if (isUsername) {
            return {
                error: true,
                message: 'UserName Đã Tồn Tại !'
            }
        }

        if (isEmail) {
            return {
                error: true,
                message: 'Email Đã Tồn Tại !'
            }
        }

        const account = await db.User.create({
            username,
            email,
            password: hash,
        });

        return {
            error: false,
            data: account,
            message: 'Đăng Ký Thành Công !',
        }


    } catch (error) {
        console.log(error);
    }

}

const LoginService = async ({ email, password }) => {
    try {

        //check email
        const account = await db.User.findOne({
            where: {
                email
            }
        });

        if (!account) {
            return {
                error: true,
                message: 'Email Không Tồn Tại !'
            }
        }

        //check password
        const checkPassword = bcrypt.compareSync(password, account.password);
        if (!checkPassword) {
            return {
                error: true,
                message: 'Mật Khẩu Không Đúng !'
            }
        }

        const accset_Token = await genneralAccessToken({
            id: account.id,
            role: account.role,
        });

        const refresh_token = await genneralRefreshToken({
            id: account.id,
            role: account.role,
        });

        return {
            error: false,
            ...account.dataValues,
            message: 'Đăng Nhập Thành Công !',
            token: accset_Token,
            refresh_token
        }


    } catch (error) {
        console.log(error);

    }
}

const GetProfileService = async (id) => {
    try {
        const account = await db.User.findOne({
            where: {
                id
            },
            attributes: {
                exclude: ['password']
            }
        });

        if (!account) {
            return {
                error: true,
                message: 'Không Tìm Thấy User !'
            }
        }

        return {
            error: false,
            data: account,
            message: 'Lấy Thông Tin Thành Công !'
        }
    } catch (error) {
        console.log(error);
        return {
            error: true,
            message: 'Có Lỗi Xảy Ra !'
        }
    }
}

const UpdateUserService = async (id, username, pathAvatar) => {
    try {

        const account = await db.User.findOne({
            where: {
                id
            }
        });

        if (!account) {
            return {
                error: true,
                message: 'Không Tìm Thấy User !'
            }
        }

        const isUsername = await db.User.findOne({
            where: {
                username,
                id: { [db.Sequelize.Op.ne]: id } // Đảm bảo không so sánh với tài khoản hiện tại
            }
        });

        if (isUsername) {
            if (pathAvatar) {
                const oldAvatarPath = path.join(__dirname, '../../public', pathAvatar);
                if (fs.existsSync(oldAvatarPath)) {
                    fs.unlinkSync(oldAvatarPath); // Xóa ảnh mới nếu đã lưu
                }
            }
            return {
                error: true,
                message: 'Username đã tồn tại!'
            };
        }

        // Kiểm tra nếu có avatar cũ thì xóa nó
        if (account.avatar && pathAvatar) {
            const oldAvatarPath = path.join(__dirname, '../../public', account.avatar);

            // Kiểm tra file tồn tại trước khi xóa
            if (fs.existsSync(oldAvatarPath)) {
                fs.unlinkSync(oldAvatarPath); // Xóa file ảnh cũ
            }
        }

        const updateData = {
            username
        };

        if (pathAvatar) {
            updateData.avatar = pathAvatar;
        }

        await db.User.update(
            updateData, {
            where: {
                id
            }
        });

        const updatedAccount = await db.User.findOne({
            where: {
                id
            }
        });

        return {
            data: updatedAccount,
            error: false,
            message: 'Cập Nhật Thông Tin Thành Công !'
        }

    } catch (error) {
        console.log(error);
        return {
            error: true,
            message: 'Có Lỗi Xảy Ra !'
        }

    }
}

const ChangePasswordService = async (id, oldPassword, newPassword) => {

    try {

        const account = await db.User.findOne({
            where: {
                id
            }
        });

        if (!account) {
            return {
                error: true,
                message: 'Không Tìm Thấy User !'
            }
        }

        const checkPassword = bcrypt.compareSync(oldPassword, account.password);

        console.log(checkPassword);


        if (!checkPassword) {
            return {
                error: true,
                message: 'Mật Khẩu Cũ Không Đúng !'
            }
        }

        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(newPassword, salt);

        await db.User.update({
            password: hash
        }, {
            where: {
                id
            }
        });

        return {
            error: false,
            message: 'Đổi Mật Khẩu Thành Công !'
        }

    } catch (error) {
        console.log(error);
        return {
            error: true,
            message: 'Có Lỗi Xảy Ra !'
        }

    }
}


const GetAllUserService = async ({ limit, page, search }) => {
    try {

        const offset = (page - 1) * limit;

        const accounts = await db.User.findAndCountAll({
            attributes: {
                exclude: ['password']
            },
            where: {
                [Op.or]: [
                    { username: { [Op.like]: `%${search}%` } },
                    { email: { [Op.like]: `%${search}%` } }
                ]
            },
            limit,
            offset
        });

        return {
            page: page,
            totalPages: Math.ceil(accounts.count / limit),
            totalAccounts: accounts.count,
            data: accounts,
            error: false,
            message: 'Lấy Thông Tin Thành Công !'
        }

    } catch (error) {
        console.log(error);
        return {
            error: true,
            message: 'Có Lỗi Xảy Ra !'
        }

    }
}

const DeleteUserService = async (ids) => {
    try {

        const accounts = await db.User.destroy({
            where: {
                id: ids
            }
        })

        if (accounts) {
            return {
                error: false,
                message: `Xóa các Tài Khoản Thành Công !`
            }
        } else {
            return {
                error: true,
                message: 'Không tìm thấy tài khoản để xóa !'
            }
        }

    } catch (error) {
        console.log(error);
        return {
            error: true,
            message: 'Có Lỗi Xảy Ra !'
        }

    }
}

const GetInfoUpdateService = async (id) => {

    try {

        const account = await db.User.findOne({
            where: {
                id
            },
            attributes: {
                exclude: ['password']
            }
        });

        if (!account) {
            return {
                error: true,
                message: 'Không Tìm Thấy User !'
            }
        }

        return {
            error: false,
            data: account,
            message: 'Lấy Thông Tin Thành Công !'
        }

    } catch (error) {
        console.log(error);
        return {
            error: true,
            message: 'Có Lỗi Xảy Ra !'
        }

    }

}

const UpdateInfoUserService = async (id, username, email, role, point) => {
    try {

        const account = await db.User.findOne({
            where: {
                id
            }
        });

        if (!account) {
            return {
                error: true,
                message: 'Không Tìm Thấy User !'
            }
        }

        const isUsername = await db.User.findOne({
            where: {
                username,
                id: { [db.Sequelize.Op.ne]: id } // Đảm bảo không so sánh với tài khoản hiện tại
            }
        });

        if (isUsername) {
            return {
                error: true,
                message: 'Username đã tồn tại!'
            };
        }

        await db.User.update({
            username,
            email,
            role,
            point
        }, {
            where: {
                id
            }
        });

        const updatedAccount = await db.User.findOne({
            where: {
                id
            }
        });

        return {
            data: updatedAccount,
            error: false,
            message: 'Cập Nhật Thông Tin Thành Công !'
        }

    } catch (error) {
        console.log(error);
        return {
            error: true,
            message: 'Có Lỗi Xảy Ra !'
        }

    }
}

const ForgotPasswordService = async ({ email }) => {
    try {

        const account = await db.User.findOne({
            where: {
                email
            }
        });

        if (!account) {
            return {
                error: true,
                message: 'Email Không Tồn Tại !'
            }
        }

        const resetToken = await genneralAccessToken({
            id: account.id,
            role: account.role,
        });

        // Gửi email
        await sendPasswordResetEmail(email, resetToken);

        return {
            error: false,
            message: `Email Đã Được Gửi tới hòm thư của ${account.email} !`
        }

    } catch (error) {
        console.log(error);
        return {
            error: true,
            message: 'Có Lỗi Xảy Ra !'
        }
    }
}

const ResetPasswordService = async ({ id, password }) => {
    try {

        const account = await db.User.findOne({
            where: {
                id
            }
        });

        if (!account) {
            return {
                error: true,
                message: 'Người dùng không tồn tại !'
            }
        }

        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(password, salt);

        await db.User.update({
            password: hash
        }, {
            where: {
                id
            }
        });

        return {
            error: false,
            message: 'Đổi Mật Khẩu Thành Công !'
        }

    } catch (error) {
        console.log(error);
        return {
            error: true,
            message: 'Có Lỗi Xảy Ra !'
        }

    }
}

const AddThongBaoForUserService = async ({ idUser, content }) => {
    try {

        const accountUser = await db.User.findOne({
            where: {
                id: idUser
            }
        });

        if (!accountUser) {
            return {
                error: true,
                message: 'Người dùng không tồn tại !'
            }
        }

        await db.ThongBaoToAdmin.create({
            UserId: idUser,
            content
        });

        return {
            error: false,
            message: 'Đã Thông Báo Đến User !'
        }

    } catch (error) {
        console.log(error);
        return {
            error: true,
            message: 'Có Lỗi Xảy Ra !'
        }

    }
}

const GetThongBaoForUserService = async ({ id }) => {
    try {

        const thongBao = await db.ThongBaoToAdmin.findAll({
            where: {
                UserId: id
            },
            order: [
                ['createdAt', 'DESC']
            ]
        });

        return {
            error: false,
            data: thongBao,
            message: 'Lấy Thông Báo Thành Công !'
        }

    } catch (error) {
        console.log(error);
        return {
            error: true,
            message: 'Có Lỗi Xảy Ra !'
        }

    }
}

const DeleteThongBaoForUserService = async ({ id }) => {
    try {

        const thongBao = await db.ThongBaoToAdmin.findOne({
            where: {
                id
            }
        });

        if (!thongBao) {
            return {
                error: true,
                message: 'Thông Báo Không Tồn Tại !'
            }
        }

        await db.ThongBaoToAdmin.destroy({
            where: {
                id
            }
        });

        return {
            error: false,
            message: 'Xóa Thông Báo Thành Công !'
        }

    } catch (error) {
        console.log(error);
        return {
            error: true,
            message: 'Có Lỗi Xảy Ra !'
        }

    }
}

module.exports = {
    SignInService,
    LoginService,
    GetProfileService,
    UpdateUserService,
    ChangePasswordService,
    GetAllUserService,
    DeleteUserService,
    GetInfoUpdateService,
    UpdateInfoUserService,
    ForgotPasswordService,
    ResetPasswordService,
    AddThongBaoForUserService,
    GetThongBaoForUserService,
    DeleteThongBaoForUserService
}