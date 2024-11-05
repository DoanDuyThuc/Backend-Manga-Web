const express = require('express');
const router = express.Router();

const upload = require('../Config/UploadImage');
const {
    GetAllTruyenHomeController,
    GetChuongHomeController,
    AddFollowTruyenController,
    GetAllFollowTruyenController,
    DeleteFollowTruyenController,
    AddLichSuTruyenController,
    DeleteLichSuTruyenController,
    GetAllLichSuTruyenController,
    UpdateLuotXemController
} = require('../Controllers/HomeController');

const { authAccountMiddleware, authMiddleware } = require('../Middlewares/auth');

router.get('/getAll-Truyen-Home', GetAllTruyenHomeController);
router.get('/getChuong-Truyen-Home/:truyenid/:chuongid', GetChuongHomeController);

router.post('/addFollowTruyen', authAccountMiddleware, AddFollowTruyenController);
router.get('/getAllFollowTruyen', authAccountMiddleware, GetAllFollowTruyenController);
router.delete('/deleteFollowTruyen', authAccountMiddleware, DeleteFollowTruyenController);

router.post('/addLichSuTruyen', authAccountMiddleware, AddLichSuTruyenController);
router.get('/getAllLichSuTruyen', authAccountMiddleware, GetAllLichSuTruyenController);
router.delete('/deleteLichSuTruyen', authAccountMiddleware, DeleteLichSuTruyenController);

router.post('/updateLuotXem', UpdateLuotXemController);



module.exports = router;