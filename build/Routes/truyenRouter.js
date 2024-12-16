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
const {
  authAccountMiddleware,
  authMiddleware
} = require('../Middlewares/auth');
router.post('/create-truyen', authAccountMiddleware, upload.single('truyen_thumbnail'), CreateTruyenController);
router.put('/update-truyen/:truyen_ma', authAccountMiddleware, upload.single('truyen_thumbnail'), UpdateTruyenController);
router.delete('/delete-truyen', authAccountMiddleware, DeleteTruyenController);
router.get('/getAll-truyen', GetAllTruyenController);

//dùng chung với home
router.get('/get-truyen/:truyen_ma', GetTruyenController);
router.get('/getAll-theloai', GetAllTheLoaiController);
router.post('/create-theloai', authMiddleware, CreateTheLoaiController);
router.post('/add-theloaiTruyen', authAccountMiddleware, AddTheLoaiInTruyenController);
router.delete('/remove-theloaiforTruyen', authAccountMiddleware, DeleteTheLoaiForTruyenController);
router.put('/updata-theloai', authMiddleware, UpdateTheloaiController);
router.delete('/delete-theloai', authMiddleware, DeleteTheLoaiController);
router.post('/create-chuong', authAccountMiddleware, CreateChuongController);
router.post('/addImages-chuong', upload.array('comicImages'), AddImagesChuongController);
router.post('/sort-image/:id/saveOrder', authAccountMiddleware, UpdateSortImageController);
router.delete('/delete-image', authAccountMiddleware, DeleteImagesChuongController);
router.delete('/delete-chuong', authAccountMiddleware, DeleteChuongController);
router.patch('/updateInfo-chuong/:id', authAccountMiddleware, UpdateInfoChuongController);
router.get('/get-chuong/:id', GetChuongController);
module.exports = router;