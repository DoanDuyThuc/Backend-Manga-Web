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
  UpdateLuotXemController,
  CreateCommentController,
  UpdateCommentController,
  DeleteCommentController,
  GetAllCommentController,
  CreateRepCommentController,
  GetAllCommentOfUserController,
  UpdateStatusCommentOfUserController,
  DeleteRepCommentController,
  UpdateRepCommentController
} = require('../Controllers/HomeController');
const {
  authAccountMiddleware,
  authMiddleware
} = require('../Middlewares/auth');
router.get('/getAll-Truyen-Home', GetAllTruyenHomeController);
router.get('/getChuong-Truyen-Home/:truyenid/:chuongid', GetChuongHomeController);
router.post('/addFollowTruyen', authAccountMiddleware, AddFollowTruyenController);
router.get('/getAllFollowTruyen', authAccountMiddleware, GetAllFollowTruyenController);
router.delete('/deleteFollowTruyen', authAccountMiddleware, DeleteFollowTruyenController);
router.post('/addLichSuTruyen', authAccountMiddleware, AddLichSuTruyenController);
router.get('/getAllLichSuTruyen', authAccountMiddleware, GetAllLichSuTruyenController);
router.delete('/deleteLichSuTruyen', authAccountMiddleware, DeleteLichSuTruyenController);
router.post('/updateLuotXem', UpdateLuotXemController);

//comments
router.post('/createComment', authAccountMiddleware, CreateCommentController);
router.patch('/updateComment', authAccountMiddleware, UpdateCommentController);
router.delete('/deleteComment', authAccountMiddleware, DeleteCommentController);
router.get('/getAllComment', GetAllCommentController);

//repcomments
router.post('/createRepComment', authAccountMiddleware, CreateRepCommentController);
router.delete('/deleteRepComment', authAccountMiddleware, DeleteRepCommentController);
router.patch('/updateRepComment', authAccountMiddleware, UpdateRepCommentController);

//thông báo
router.get('/getAllCommentOfUser', authAccountMiddleware, GetAllCommentOfUserController);
router.patch('/updateStatusCommentOfUser', authAccountMiddleware, UpdateStatusCommentOfUserController);
module.exports = router;