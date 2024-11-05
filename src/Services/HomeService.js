const db = require('../models/index');
const Sequelize = require('sequelize');
const fs = require('fs');
const path = require('path');
const util = require('util');
const { Op } = require('sequelize');

const GetAllTruyenHomeService = async ({ page, limit, search, quoc_gia, isOver, typeManga }) => {

    try {


        let offset = null;

        if (page !== '' && limit !== '') {
            offset = (page - 1) * limit;
        }

        const { rows: Truyens, count } = await db.Truyen.findAndCountAll({
            attributes: [
                'id',
                'truyen_ma',
                'truyen_ten',
                'truyen_hinhanhdaidien',
                'truyen_tacgia',
                'truyen_motangan',
                'truyen_duyet',
                'createdAt',
                'truyen_luotxem',
                'quoc_gia',
                'isOver',
            ],
            where: {
                truyen_duyet: 1,
                [Op.and]: [
                    search ? {
                        [Op.or]: [
                            {
                                truyen_ten: {
                                    [Op.substring]: search
                                }
                            },
                            {
                                truyen_tacgia: {
                                    [Op.substring]: search
                                }
                            }
                        ]
                    } : {},
                    quoc_gia !== '' ? { quoc_gia } : {},
                    isOver !== '' ? {
                        isOver: isOver === 'true' ? 1 : 0
                    } : {}
                ]
            },
            include: [
                {
                    model: db.Chuong,
                    attributes: ['id', 'Chuong_so', 'Chuong_ten', 'TruyenId', "Chuong_noidung", 'createdAt']
                },
                {
                    model: db.TheLoai,
                    attributes: ['id', 'ten_theloai'],
                    through: {
                        attributes: []
                    },
                    ...(typeManga !== '' ? {
                        where: {
                            id: {
                                [Op.in]: typeManga.split(',') // Lọc theo ID thể loại trong mảng typeManga
                            }
                        }
                    } : {})
                }
            ],
            ...(limit !== '' && page !== '' ? { offset, limit } : {})

        });

        if (!Truyens) {
            return {
                error: true,
                message: 'Không tìm thấy truyện'
            }
        }

        return {
            error: false,
            data: Truyens,
            page: page,
            totalPages: Math.ceil(count / limit),
            totalTruyens: count,
            message: 'Lấy dữ liệu thành công'
        }

    } catch (error) {
        console.log(error);
        return {
            error: true,
            message: 'Internal Server Error'
        }

    }
};

const GetChuongHomeService = async ({ truyenid, chuongid }) => {
    try {

        const ChuongLength = await db.Chuong.count({
            where: {
                truyenId: truyenid
            }
        });

        const Chuong = await db.Chuong.findOne({
            attributes: ['id', 'Chuong_so', 'Chuong_ten', 'Chuong_noidung', 'createdAt'],
            where: {
                Chuong_so: chuongid,
                truyenId: truyenid
            },
            include: [
                {
                    model: db.chuong_hinhanh,
                    attributes: ['chuong_hinhanh_link', 'sort_order'],
                    order: [['sort_order', 'ASC']],
                }
            ],
        });

        if (!Chuong) {
            return {
                error: true,
                message: 'Không tìm thấy chương'
            }
        }

        return {
            error: false,
            data: Chuong,
            ChuongLength: ChuongLength,
            message: 'Lấy dữ liệu thành công'
        }

    } catch (error) {
        console.log(error);
        return {
            error: true,
            message: 'Internal Server Error'
        }
    }
}

const AddFollowTruyenService = async ({ truyen_id, user_id }) => {
    try {

        const Follow = await db.TruyenYeuThich.findOne({
            where: {
                TruyenId: truyen_id,
                UserId: user_id
            }
        });

        if (Follow) {
            return {
                error: true,
                message: 'Truyện này đã được theo dõi'
            }
        }

        const FollowTruyen = await db.TruyenYeuThich.create({
            TruyenId: truyen_id,
            UserId: user_id
        });

        if (!FollowTruyen) {
            return {
                error: true,
                message: 'Lỗi khi theo dõi truyện'
            }
        }

        await db.Truyen.update({
            truyen_luottheodoi: Sequelize.literal('truyen_luottheodoi + 1'),//thực hiện tính toán
        }, {
            where: {
                id: truyen_id
            }
        })

        return {
            error: false,
            data: FollowTruyen,
            message: 'Theo dõi truyện thành công'
        }

    } catch (error) {
        console.log(error);
        return {
            error: true,
            message: 'Internal Server Error'
        }

    }
}

const GetAllFollowTruyenService = async ({ user_id }) => {
    try {

        const FollowTruyen = await db.TruyenYeuThich.findAll({
            where: {
                UserId: user_id
            },
            include: [
                {
                    model: db.Truyen,
                    attributes: [
                        'id',
                        'truyen_ma',
                        'truyen_ten',
                        'truyen_hinhanhdaidien',
                        'createdAt',
                    ],
                    include: [
                        {
                            model: db.Chuong,
                            attributes: ['id']
                        }
                    ]
                }
            ]
        });

        if (!FollowTruyen) {
            return {
                error: true,
                message: 'Không tìm thấy truyện theo dõi'
            }
        }

        return {
            error: false,
            data: FollowTruyen,
            message: 'Lấy dữ liệu thành công'
        }

    } catch (error) {
        console.log(error);
        return {
            error: true,
            message: 'Internal Server Error'
        }

    }
}

const DeleteFollowTruyenService = async ({ truyen_id, user_id }) => {
    try {

        const FollowTruyen = await db.TruyenYeuThich.findOne({
            where: {
                TruyenId: truyen_id,
                UserId: user_id
            }
        });

        if (!FollowTruyen) {
            return {
                error: true,
                message: 'Truyện này chưa được theo dõi'
            }
        }

        await db.TruyenYeuThich.destroy({
            where: {
                TruyenId: truyen_id,
                UserId: user_id
            }
        });

        await db.Truyen.update({
            truyen_luottheodoi: Sequelize.literal('truyen_luottheodoi - 1'),//thực hiện tính toán
        }, {
            where: {
                id: truyen_id
            }
        })

        return {
            error: false,
            message: 'Xóa theo dõi truyện thành công'
        }

    } catch (error) {
        console.log(error);
        return {
            error: true,
            message: 'Internal Server Error'
        }

    }
}

const AddLichSuTruyenService = async ({ truyen_id, user_id }) => {
    try {
        const TruyenLichSu = await db.TruyenLichSu.findOne({
            where: {
                TruyenId: truyen_id,
                UserId: user_id
            }
        });

        if (TruyenLichSu) {
            await db.TruyenLichSu.update({
                createdAt: new Date()
            }, {
                where: {
                    TruyenId: truyen_id,
                    UserId: user_id
                }
            });

            return {
                error: false,
                message: 'Cập nhật lịch sử truyện thành công'
            }
        }

        const AddTruyenLichSu = await db.TruyenLichSu.create({
            TruyenId: truyen_id,
            UserId: user_id
        });

        if (!AddTruyenLichSu) {
            return {
                error: true,
                message: 'Lỗi khi cập nhật lịch sử truyện'
            }
        }

        return {
            error: false,
            data: AddTruyenLichSu,
            message: 'Cập nhật lịch sử truyện thành công'
        }

    } catch (error) {
        console.log(error);
        return {
            error: true,
            message: 'Internal Server Error'
        }

    }
}

const DeleteLichSuTruyenService = async ({ truyen_id, user_id }) => {
    try {
        const TruyenLichSu = await db.TruyenLichSu.findOne({
            where: {
                TruyenId: truyen_id,
                UserId: user_id
            }
        });

        if (!TruyenLichSu) {
            return {
                error: true,
                message: 'Truyện này chưa có trong lịch sử'
            }
        }

        await db.TruyenLichSu.destroy({
            where: {
                TruyenId: truyen_id,
                UserId: user_id
            }
        });

        return {
            error: false,
            message: 'Xóa lịch sử truyện thành công'
        }

    } catch (error) {
        console.log(error);
        return {
            error: true,
            message: 'Internal Server Error'
        }

    }
}

const GetAllLichSuTruyenService = async ({ user_id }) => {
    try {

        const LichSuTruyen = await db.TruyenLichSu.findAll({
            where: {
                UserId: user_id
            },
            include: [
                {
                    model: db.Truyen,
                    attributes: [
                        'id',
                        'truyen_ma',
                        'truyen_ten',
                        'truyen_hinhanhdaidien',
                        'createdAt',
                    ],
                    include: [
                        {
                            model: db.Chuong,
                            attributes: ['id']
                        }
                    ]
                }
            ]
        });

        if (!LichSuTruyen) {
            return {
                error: true,
                message: 'Không tìm thấy lịch sử truyện'
            }
        }

        return {
            error: false,
            data: LichSuTruyen,
            message: 'Lấy dữ liệu thành công'
        }

    } catch (error) {
        console.log(error);
        return {
            error: true,
            message: 'Internal Server Error'
        }

    }
}

const UpdateLuotXemService = async ({ truyen_id }) => {
    try {

        const Truyen = await db.Truyen.findOne({
            where: {
                id: truyen_id
            }
        });

        if (!Truyen) {
            return {
                error: true,
                message: 'Không tìm thấy truyện'
            }
        }

        await db.Truyen.update({
            truyen_luotxem: Sequelize.literal('truyen_luotxem + 1'),//thực hiện tính toán
        }, {
            where: {
                id: truyen_id
            }
        });

        return {
            error: false,
            message: 'Cập nhật lượt xem truyện thành công'
        }

    } catch (error) {
        console.log(error);
        return {
            error: true,
            message: 'Internal Server Error'
        }

    }
}

module.exports = {
    GetAllTruyenHomeService,
    GetChuongHomeService,
    AddFollowTruyenService,
    GetAllFollowTruyenService,
    DeleteFollowTruyenService,
    AddLichSuTruyenService,
    DeleteLichSuTruyenService,
    GetAllLichSuTruyenService,
    UpdateLuotXemService
}