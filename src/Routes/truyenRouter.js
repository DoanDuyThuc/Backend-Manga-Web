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
    GetChuongController,
    DeleteTruyenController,
    UpdateTruyenController,
    DeleteImagesChuongController,
    UpdateSortImageController,
    DeleteChuongController,
    UpdateInfoChuongController,
    GetAllTheLoaiController,
    DeleteTheLoaiController,
    UpdateTheloaiController,
    DeleteTheLoaiForTruyenController
} = require('../Controllers/truyenController');

const { authAccountMiddleware, authMiddleware } = require('../Middlewares/auth');

router.post('/create-truyen', authMiddleware, upload.single('truyen_thumbnail'), CreateTruyenController);

router.put('/update-truyen/:truyen_ma', authMiddleware, upload.single('truyen_thumbnail'), UpdateTruyenController);

router.delete('/delete-truyen', authMiddleware, DeleteTruyenController);

router.get('/getAll-truyen', GetAllTruyenController);

router.get('/get-truyen/:truyen_ma', GetTruyenController);

router.get('/getAll-theloai', authMiddleware, GetAllTheLoaiController);
router.post('/create-theloai', authMiddleware, CreateTheLoaiController);
router.post('/add-theloaiTruyen', authAccountMiddleware, AddTheLoaiInTruyenController);
router.delete('/remove-theloaiforTruyen', authAccountMiddleware, DeleteTheLoaiForTruyenController);
router.put('/updata-theloai', authMiddleware, UpdateTheloaiController);
router.delete('/delete-theloai', authMiddleware, DeleteTheLoaiController);


router.post('/create-chuong', authMiddleware, CreateChuongController);
router.post('/addImages-chuong', upload.array('comicImages'), AddImagesChuongController);

router.post('/sort-image/:id/saveOrder', authMiddleware, UpdateSortImageController);

router.delete('/delete-image', authMiddleware, DeleteImagesChuongController);

router.delete('/delete-chuong', authMiddleware, DeleteChuongController);

router.patch('/updateInfo-chuong/:id', authMiddleware, UpdateInfoChuongController);


router.get('/get-chuong/:id', authMiddleware, GetChuongController);



module.exports = router;