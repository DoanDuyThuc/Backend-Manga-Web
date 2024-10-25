const multer = require("multer");


const errorUpload = (err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        // Lỗi liên quan đến multer
        return res.status(400).json({ error: err.message });
    } else if (err) {
        // Lỗi khác
        return res.status(400).json({ error: err.message });
    }

    next();
};

module.exports = errorUpload;