const express = require('express');
const router = express.Router();
const {
    LoginController,
    SignInController,
    refreshToken,
    LogoutController,
    UploadImageController
} = require('../Controllers/userController');
const upload = require('../Config/UploadImage');

router.post('/login', LoginController);
router.post('/signin', SignInController);
router.post('/refresh-token', refreshToken);
router.post('/logout', LogoutController);
router.post('/uploads', upload.array('comicImages'), UploadImageController);

module.exports = router;