const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Tạo cấu hình lưu trữ Multer để lưu ảnh trong thư mục 'public/images/comics'
const storage = multer.diskStorage({

    destination: function (req, file, cb) {
        let dir;
        // Kiểm tra loại ảnh từ request body hoặc query
        if (req.body && req.body.type === 'avatar') {
            dir = path.join(__dirname, '../../public/avatars'); // Thư mục lưu ảnh avatar
        } else if (req.body && req.body.type === 'comic') {
            dir = path.join(__dirname, '../../public/Ucomics'); // Thư mục lưu truyện tranh
        } else if (req.body && req.body.type === 'chapter') {
            dir = path.join(__dirname, '../../public/Chapters'); // Thư mục lưu chương truyện
        } else {
            // Nếu không có type nào hợp lệ thì trả về lỗi
            return cb(new Error('Invalid upload type'));
        }

        // Tạo thư mục nếu chưa tồn tại
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        cb(null, dir); // Lưu ảnh vào thư mục này
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Đặt tên file theo thời gian để tránh trùng
    }
});

// Cấu hình Multer với giới hạn kích thước file (ví dụ: 5MB)
const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|gif/;// Chỉ cho phép định dạng .jpeg, .jpg, .png
        const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = fileTypes.test(file.mimetype);

        if (extname && mimetype) {
            return cb(null, true);
        } else {
            cb(new Error('Only images are allowed')); // Chỉ cho phép ảnh
        }
    }
});

module.exports = upload;