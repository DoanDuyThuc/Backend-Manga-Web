const express = require('express');
const router = express.Router();
const {
  LoginController,
  SignInController,
  refreshToken,
  LogoutController,
  UploadImageController,
  GetProfileController,
  UpdateUserController,
  ChangePasswordController,
  GetAllUserController,
  DeleteUserController,
  GetInfoUpdateController,
  UpdateInfoUserController,
  ForgotPasswordController,
  ResetPasswordController,
  AddThongBaoForUserController,
  GetThongBaoForUserController,
  DeleteThongBaoForUserController
} = require('../Controllers/userController');
const upload = require('../Config/UploadImage');
const {
  authAccountMiddleware,
  authMiddleware
} = require('../Middlewares/auth');
router.post('/login', LoginController);
router.post('/signin', SignInController);
router.post('/refresh-token', refreshToken);
router.post('/logout', LogoutController);
router.post('/uploads', upload.array('comicImages'), UploadImageController);
router.get('/getInfo', authAccountMiddleware, GetProfileController);
router.patch('/changePassword', authAccountMiddleware, ChangePasswordController);
router.patch('/updateUser', authAccountMiddleware, upload.single('avatar'), UpdateUserController);
router.get('/getAllUser', authMiddleware, GetAllUserController);
router.delete('/deleteUser', authMiddleware, DeleteUserController);
router.get('/getInfoupdate/:id', authMiddleware, GetInfoUpdateController);
router.put('/updateInfoUser/:id', authMiddleware, UpdateInfoUserController);
router.post('/forgot-password', ForgotPasswordController);
router.post('/resetPassword', authAccountMiddleware, ResetPasswordController);
router.post('/addThongBaoForUser', authMiddleware, AddThongBaoForUserController);
router.get('/getThongBaoForUser', authAccountMiddleware, GetThongBaoForUserController);
router.delete('/deleteThongBaoForUser', authAccountMiddleware, DeleteThongBaoForUserController);
module.exports = router;