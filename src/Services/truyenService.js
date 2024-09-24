const db = require('../models/index');
const Sequelize = require('sequelize');


const CreateTruyenService = async ({ truyen_ma, truyen_ten, truyen_hinhanhdaidien, truyen_tacgia, truyen_motangan }) => {
    try {

        //check truyen tồn tại
        const truyen = await db.Truyen.findOne({
            where: {
                truyen_ma
            }
        });

        if (truyen) {
            return {
                error: true,
                message: 'Truyện Đã Tồn Tại !'
            }
        }

        const newTruyen = await db.Truyen.create({
            truyen_ma,
            truyen_ten,
            truyen_hinhanhdaidien,
            truyen_tacgia,
            truyen_motangan
        });

        return {
            error: false,
            data: newTruyen,
            message: 'Tạo Truyện Thành Công !',
        }

    } catch (error) {
        console.log(error);
        return {
            error: true,
            message: 'Internal Server Error'
        }
    }
};

const GetAllTruyenService = async () => {
    try {
        const truyenList = await db.Truyen.findAll({
            include: [
                {
                    model: db.Chuong,
                    attributes: [
                        [Sequelize.fn('COUNT', Sequelize.col('Chuongs.id')), 'tong_so_chuong']
                    ]
                }
            ],
            group: ['Truyen.id'],
            attributes: ['truyen_ma', 'truyen_ten', 'truyen_hinhanhdaidien', 'createdAt'],
        });

        return {
            error: false,
            data: truyenList,
            message: 'Lấy Dữ Liệu Thành Công !'
        }

    } catch (error) {
        console.log(error);
        return {
            error: true,
            message: 'Internal Server Error'
        }
    }
}

const GetTruyenService = async ({ truyen_ma }) => {
    try {

        const truyen = await db.Truyen.findOne({
            where: {
                truyen_ma
            },
            include: [
                {
                    model: db.Chuong,
                    attributes: ['Chuong_so', 'Chuong_ten', "Chuong_noidung", 'createdAt']
                },
                {
                    model: db.TheLoai,
                    attributes: ['id', 'ten_theloai'],
                    through: {
                        attributes: []
                    }
                }
            ],
            attributes: ['truyen_ma', 'truyen_ten', 'truyen_hinhanhdaidien', 'truyen_tacgia', 'truyen_motangan', 'createdAt'],
        });

        if (!truyen) {
            return {
                error: true,
                message: 'Truyện Không Tồn Tại !'
            }
        }

        return {
            error: false,
            data: truyen,
            message: 'Lấy Dữ Liệu Thành Công !'
        }

    } catch (error) {
        console.log(error);
        return {
            error: true,
            message: 'Internal Server Error'
        }

    }
}

const CreateTheLoaiService = async ({ ten_theloai }) => {

    try {
        const theLoai = await db.TheLoai.findOne({
            where: {
                ten_theloai
            }
        });

        if (theLoai) {
            return {
                error: true,
                message: 'Thể Loại Đã Tồn Tại !'
            }
        }

        const newTheLoai = await db.TheLoai.create({
            ten_theloai
        });

        return {
            error: false,
            data: newTheLoai,
            message: 'Tạo Thể Loại Thành Công !'
        }

    } catch (error) {
        console.log(error);
        return {
            error: true,
            message: 'Internal Server Error'
        }

    }
}

const AddTheLoaiInTruyenService = async ({ TruyenId, TheLoaiId }) => {
    try {
        const truyen = await db.TruyenTheloai.findOne({
            where: {
                TheLoaiId: TheLoaiId,
            }
        });

        if (truyen) {
            return {
                error: true,
                message: 'Truyện này đã có thể loại này !'
            }
        }

        const newTruyenTheloai = await db.TruyenTheloai.create({
            TruyenId,
            TheLoaiId
        });

        return {
            error: false,
            data: newTruyenTheloai,
            message: 'Thêm Thể Loại Cho Truyện Thành Công !'
        }

    } catch (error) {
        console.log(error);
        return {
            error: true,
            message: 'Internal Server Error'
        }
    }
}

const CreateChuongService = async ({ Chuong_so, Chuong_ten, Chuong_noidung, TruyenId }) => {
    try {
        const newChuong = await db.Chuong.create({
            Chuong_so,
            Chuong_ten,
            Chuong_noidung,
            TruyenId
        });

        return {
            error: false,
            data: newChuong,
            message: 'Tạo Chương Thành Công !'
        }

    } catch (error) {
        console.log(error);
        return {
            error: true,
            message: 'Internal Server Error'
        }
    }
}

const AddImagesChuongService = async ({ ChuongId, images }) => {
    try {
        const chuong = await db.Chuong.findOne({
            where: {
                id: ChuongId
            }
        });

        if (!chuong) {
            return {
                error: true,
                message: 'Chương Không Tồn Tại !'
            }
        }

        const imageObjects = images.map((image) => ({
            chuong_hinhanh_link: image,
            ChuongId: ChuongId // Gán ChuongId cho từng hình ảnh
        }));

        console.log(imageObjects);


        // Sử dụng bulkCreate để thêm tất cả các bản ghi cùng lúc
        const newImages = await db.chuong_hinhanh.bulkCreate(imageObjects);

        return {
            error: false,
            data: newImages,
            message: 'Thêm Ảnh Cho Chương Thành Công !'
        }

    } catch (error) {
        console.log(error);
        return {
            error: true,
            message: 'Internal Server Error'
        }
    }
}

const GetChuongService = async ({ id }) => {
    try {
        const chuong = await db.Chuong.findOne({
            where: {
                id
            },
            include: [
                {
                    model: db.chuong_hinhanh,
                    attributes: ['chuong_hinhanh_link']
                }
            ],
            attributes: ['Chuong_so', 'Chuong_ten', 'Chuong_noidung', 'createdAt']
        });

        if (!chuong) {
            return {
                error: true,
                message: 'Chương Không Tồn Tại !'
            }
        }

        return {
            error: false,
            data: chuong,
            message: 'Lấy Dữ Liệu Thành Công !'
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
    CreateTruyenService,
    GetAllTruyenService,
    GetTruyenService,
    CreateTheLoaiService,
    AddTheLoaiInTruyenService,
    CreateChuongService,
    AddImagesChuongService,
    GetChuongService
}