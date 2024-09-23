const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config()

//xác thực admin
const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function (err, user) {
        if (err) {
            return res.status(401).json({
                status: "err",
                massage: "có lỗi khi xác thực !"
            })
        }
        const { payload } = user;
        req.user = payload;

        if (payload?.role === 'admin') {
            next();
        } else {
            return res.status(401).json({
                status: "err",
                massage: "có lỗi khi xác thực !"
            })
        }

    });
}

//xác thực account
const authAccountMiddleware = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const userId = req.params.id

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function (err, user) {
        if (err) {
            return res.status(401).json({
                status: "err",
                err,
                massage: "có lỗi khi xác thực !"
            })
        }
        const { payload } = user;
        req.user = payload;

        if (payload?.role === 'admin' || payload?.id === Number(userId)) {
            next();
        } else {
            return res.status(401).json({
                status: "err",
                massage: "có lỗi khi xác thực !"
            })
        }
    });
}

module.exports = {
    authMiddleware,
    authAccountMiddleware
}