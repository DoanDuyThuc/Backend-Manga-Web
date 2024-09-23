const jwt = require('jsonwebtoken');
require('dotenv').config();

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
        jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, async (err, user) => {

            if (err) {
                return res.status(401).json({
                    status: "ERROR",
                    massage: "xác thực Thất Bại",
                })
            }

            const { payload } = user;

            const access_token = await genneralAccessToken({
                id: payload?.id,
                role: payload?.role
            });

            return res.status(200).json({
                status: "OK",
                massage: "xác thực SUSSCES",
                access_token
            })
        })

    } catch (error) {
        return {
            status: "err",
            massage: 'có lỗi khi xác thực !',
            error
        }
    }
}

module.exports = {
    genneralAccessToken,
    genneralRefreshToken,
    VerifyRefreshToken
}