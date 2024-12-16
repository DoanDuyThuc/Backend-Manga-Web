const {
  GetAllTruyenForAuthorService
} = require("../Services/AuthorService");
const GetAllTruyenForAuthorController = async (req, res) => {
  try {
    const {
      id
    } = req.user;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const search = req.query.search || '';
    const searchStatus = req.query.searchStatus || '';
    const truyen = await GetAllTruyenForAuthorService({
      id,
      page,
      limit,
      search,
      searchStatus
    });
    return res.status(200).json(truyen);
  } catch (error) {
    return res.status(500).json(error);
  }
};
module.exports = {
  GetAllTruyenForAuthorController
};