const {
  GetAllTruyenHomeService,
  GetChuongHomeService,
  AddFollowTruyenService,
  GetAllFollowTruyenService,
  DeleteFollowTruyenService,
  AddLichSuTruyenService,
  DeleteLichSuTruyenService,
  GetAllLichSuTruyenService,
  UpdateLuotXemService,
  CreateCommentService,
  UpdateCommentService,
  DeleteCommentService,
  GetAllCommentService,
  CreateRepCommentService,
  GetAllCommentOfUserService,
  UpdateStatusCommentOfUserService,
  DeleteRepCommentService,
  UpdateRepCommentService
} = require("../Services/HomeService");
const GetAllTruyenHomeController = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || '';
    const limit = parseInt(req.query.limit) || '';
    const search = req.query.search || '';
    const quoc_gia = req.query.quoc_gia || '';
    const isOver = req.query.isOver || '';
    const typeManga = req.query.typeManga || '';
    const truyen = await GetAllTruyenHomeService({
      page,
      limit,
      search,
      quoc_gia,
      isOver,
      typeManga
    });
    return res.status(200).json(truyen);
  } catch (error) {
    return res.status(500).json(error);
  }
};
const GetChuongHomeController = async (req, res) => {
  try {
    const {
      truyenid,
      chuongid
    } = req.params;
    const chuong = await GetChuongHomeService({
      truyenid,
      chuongid
    });
    return res.status(200).json(chuong);
  } catch (error) {
    return res.status(500).json(error);
  }
};
const AddFollowTruyenController = async (req, res) => {
  try {
    const {
      truyen_id,
      user_id
    } = req.body;
    const truyen = await AddFollowTruyenService({
      truyen_id,
      user_id
    });
    return res.status(200).json(truyen);
  } catch (error) {
    return res.status(500).json(error);
  }
};
const GetAllFollowTruyenController = async (req, res) => {
  try {
    const {
      user_id
    } = req.query;
    const truyen = await GetAllFollowTruyenService({
      user_id
    });
    return res.status(200).json(truyen);
  } catch (error) {
    return res.status(500).json(error);
  }
};
const DeleteFollowTruyenController = async (req, res) => {
  try {
    const {
      truyen_id,
      user_id
    } = req.query;
    const truyen = await DeleteFollowTruyenService({
      truyen_id,
      user_id
    });
    return res.status(200).json(truyen);
  } catch (error) {
    return res.status(500).json(error);
  }
};
const AddLichSuTruyenController = async (req, res) => {
  try {
    const {
      truyen_id,
      user_id
    } = req.body;
    const truyen = await AddLichSuTruyenService({
      truyen_id,
      user_id
    });
    return res.status(200).json(truyen);
  } catch (error) {
    return res.status(500).json(error);
  }
};
const DeleteLichSuTruyenController = async (req, res) => {
  try {
    const {
      truyen_id,
      user_id
    } = req.query;
    const truyen = await DeleteLichSuTruyenService({
      truyen_id,
      user_id
    });
    return res.status(200).json(truyen);
  } catch (error) {
    return res.status(500).json(error);
  }
};
const GetAllLichSuTruyenController = async (req, res) => {
  try {
    const {
      user_id
    } = req.query;
    const truyen = await GetAllLichSuTruyenService({
      user_id
    });
    return res.status(200).json(truyen);
  } catch (error) {
    return res.status(500).json(error);
  }
};
const UpdateLuotXemController = async (req, res) => {
  try {
    const {
      truyen_id
    } = req.body;
    const truyen = await UpdateLuotXemService({
      truyen_id
    });
    return res.status(200).json(truyen);
  } catch (error) {
    return res.status(500).json(error);
  }
};
const CreateCommentController = async (req, res) => {
  try {
    const {
      user_id,
      truyen_id,
      content
    } = req.body;
    const truyen = await CreateCommentService({
      user_id,
      truyen_id,
      content
    });
    return res.status(200).json(truyen);
  } catch (error) {
    return res.status(500).json(error);
  }
};
const UpdateCommentController = async (req, res) => {
  try {
    const {
      comment_id,
      content
    } = req.body;
    const truyen = await UpdateCommentService({
      comment_id,
      content
    });
    return res.status(200).json(truyen);
  } catch (error) {
    return res.status(500).json(error);
  }
};
const DeleteCommentController = async (req, res) => {
  try {
    const {
      comment_id
    } = req.query;
    const truyen = await DeleteCommentService({
      comment_id
    });
    return res.status(200).json(truyen);
  } catch (error) {
    return res.status(500).json(error);
  }
};
const GetAllCommentController = async (req, res) => {
  try {
    const {
      truyen_id
    } = req.query;
    const truyen = await GetAllCommentService({
      truyen_id
    });
    return res.status(200).json(truyen);
  } catch (error) {
    return res.status(500).json(error);
  }
};
const CreateRepCommentController = async (req, res) => {
  try {
    const {
      user_id,
      comment_id,
      content
    } = req.body;
    const truyen = await CreateRepCommentService({
      user_id,
      comment_id,
      content
    });
    return res.status(200).json(truyen);
  } catch (error) {
    return res.status(500).json(error);
  }
};
const GetAllCommentOfUserController = async (req, res) => {
  try {
    const {
      user_id
    } = req.query;
    const truyen = await GetAllCommentOfUserService({
      user_id
    });
    return res.status(200).json(truyen);
  } catch (error) {
    return res.status(500).json(error);
  }
};
const UpdateStatusCommentOfUserController = async (req, res) => {
  try {
    const {
      comment_id,
      IsRead,
      IsShow
    } = req.body;
    const truyen = await UpdateStatusCommentOfUserService({
      comment_id,
      IsRead,
      IsShow
    });
    return res.status(200).json(truyen);
  } catch (error) {
    return res.status(500).json(error);
  }
};
const DeleteRepCommentController = async (req, res) => {
  try {
    const {
      repcomment_id
    } = req.query;
    const truyen = await DeleteRepCommentService({
      repcomment_id
    });
    return res.status(200).json(truyen);
  } catch (error) {
    return res.status(500).json(error);
  }
};
const UpdateRepCommentController = async (req, res) => {
  try {
    const {
      repcomment_id,
      content
    } = req.body;
    const truyen = await UpdateRepCommentService({
      repcomment_id,
      content
    });
    return res.status(200).json(truyen);
  } catch (error) {
    return res.status(500).json(error);
  }
};
module.exports = {
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
};