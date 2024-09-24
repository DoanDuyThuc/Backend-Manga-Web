const express = require('express');
const router = express.Router();

const upload = require('../Config/UploadImage');
const {
    CreateTruyenController,
    GetAllTruyenController,
    GetTruyenController,
    CreateTheLoaiController,
    AddTheLoaiInTruyenController,
    CreateChuongController,
    AddImagesChuongController,
    GetChuongController
} = require('../Controllers/truyenController');

router.post('/create-truyen', upload.single('truyen_hinhanhdaidien'), CreateTruyenController);
router.get('/getAll-truyen', GetAllTruyenController);
router.get('/get-truyen/:truyen_ma', GetTruyenController);
router.post('/create-theloai', CreateTheLoaiController);
router.post('/add-theloaiTruyen', AddTheLoaiInTruyenController);
router.post('/create-chuong', CreateChuongController);
router.post('/addImages-chuong', upload.array('comicImages'), AddImagesChuongController);
router.get('/get-chuong/:id', GetChuongController);



module.exports = router;