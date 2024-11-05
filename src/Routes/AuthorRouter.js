const express = require('express');
const router = express.Router();

const upload = require('../Config/UploadImage');
const {
    GetAllTruyenForAuthorController

} = require('../Controllers/AuthorController');

const { authAccountMiddleware, authMiddleware } = require('../Middlewares/auth');

router.get('/getAll-Truyen-Author', authAccountMiddleware, GetAllTruyenForAuthorController);

module.exports = router;