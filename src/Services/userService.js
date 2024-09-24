const db = require('../models/index');
const bcrypt = require('bcrypt');
const { genneralAccessToken, genneralRefreshToken } = require('./JwtService');

const SignInService = async ({ username, email, password }) => {

    try {

        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(password, salt);

        console.log(hash);

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

module.exports = {
    SignInService,
    LoginService,
    GetProfileService
}