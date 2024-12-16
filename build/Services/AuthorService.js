const db = require('../models/index');
const Sequelize = require('sequelize');
const fs = require('fs');
const path = require('path');
const util = require('util');
const {
  Op
} = require('sequelize');
const GetAllTruyenForAuthorService = async ({
  id,
  page,
  limit,
  search,
  searchStatus
}) => {
  try {
    const offset = (page - 1) * limit;
    const count = await db.Truyen.count({
      where: {
        UserId: id,
        [Op.or]: [{
          truyen_ten: {
            [Op.like]: `%${search}%`
          }
        }, {
          truyen_tacgia: {
            [Op.like]: `%${search}%`
          }
        }],
        truyen_duyet: searchStatus ? searchStatus : {
          [Op.ne]: null
        }
      }
    });
    const UserTruyen = await db.User.findOne({
      where: {
        id
      },
      include: [{
        model: db.Truyen,
        attributes: ['id', 'truyen_ma', 'truyen_ten', 'truyen_hinhanhdaidien', 'truyen_tacgia', 'truyen_motangan', 'truyen_duyet', 'createdAt'],
        where: {
          [Op.or]: [{
            truyen_ten: {
              [Op.like]: `%${search}%`
            }
          }, {
            truyen_tacgia: {
              [Op.like]: `%${search}%`
            }
          }],
          truyen_duyet: {
            [Op.like]: `%${searchStatus}%`
          }
        },
        offset,
        limit
      }]
    });
    if (!UserTruyen) {
      return {
        error: true,
        message: 'Không tìm thấy Truyện thuộc tác giả này'
      };
    }
    return {
      error: false,
      data: UserTruyen,
      page: page,
      totalPages: Math.ceil(count / limit),
      totalTruyens: count,
      message: 'Lấy dữ liệu thành công'
    };
  } catch (error) {
    console.log(error);
    return {
      error: true,
      message: 'Internal Server Error'
    };
  }
};
module.exports = {
  GetAllTruyenForAuthorService
};