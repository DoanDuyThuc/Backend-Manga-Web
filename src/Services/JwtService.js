const jwt = require('jsonwebtoken');
require('dotenv').config();

const util = require('util');
const verifyToken = util.promisify(jwt.verify);

//tạo ra accsettoken
const genneralAccessToken = async (payload) => {
    const access_token = await jwt.sign({
        payload
    }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: `${process.env.TIME_EXPIRATION_ACCESS_TOKEN}` })

    return access_token
}

const genneralRefreshToken = async (payload) => {
    const refresh_token = await jwt.sign({
        payload
    }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: `${process.env.TIME_EXPIRATION_REFRESH_TOKEN}` })

    return refresh_token
}

//xác thực token khi hết hạn
const VerifyRefreshToken = async (token, res) => {
    try {
        // Sử dụng await để chờ verify token
        const decoded = await verifyToken(token, process.env.REFRESH_TOKEN_SECRET);

        const { payload } = decoded;

        const access_token = await genneralAccessToken({
            id: payload?.id,
            role: payload?.role
        });

        return res.status(200).json({
            status: "OK",
            message: "Xác thực thành công",
            access_token
        });

    } catch (err) {
        // Nếu có lỗi trong quá trình verify
        return res.status(401).json({
            status: "ERROR",
            message: "Xác thực thất bại",
            error: err.message
        });
    }
}

module.exports = {
    genneralAccessToken,
    genneralRefreshToken,
    VerifyRefreshToken
}