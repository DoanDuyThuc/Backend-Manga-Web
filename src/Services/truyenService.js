const db = require('../models/index');
const Sequelize = require('sequelize');
const fs = require('fs');
const path = require('path');
const util = require('util');
const { Op } = require('sequelize');

const unlinkFile = util.promisify(fs.unlink);


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
                message: 'mã truyện Đã Tồn Tại !'
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

const GetAllTruyenService = async ({ limit, page, search, searchStatus }) => {
    try {

        const offset = (page - 1) * limit;

        const { rows: truyenList, count } = await db.Truyen.findAndCountAll({
            attributes: [
                'id', 'truyen_ma', 'truyen_ten', 'truyen_hinhanhdaidien', 'truyen_duyet', 'truyen_tacgia', 'createdAt',
                [Sequelize.literal(`(
                    SELECT COUNT(*)
                    FROM Chuong AS Chuong
                    WHERE Chuong.truyenId = Truyen.id
                )`), 'tong_so_chuong']
            ],
            where: {
                [Op.or]: [
                    { truyen_ten: { [Op.like]: `%${search}%` } },
                    { truyen_tacgia: { [Op.like]: `%${search}%` } },
                ],
                truyen_duyet: {
                    [Op.like]: `%${searchStatus}%`
                }
            },
            offset,
            limit

        });

        return {
            error: false,
            page: page,
            totalPages: Math.ceil(count / limit),
            totalTruyens: count,
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
                    attributes: ['id', 'Chuong_so', 'Chuong_ten', "Chuong_noidung", 'createdAt']
                },
                {
                    model: db.TheLoai,
                    attributes: ['id', 'ten_theloai'],
                    through: {
                        attributes: [] // bỏ qua các trường không cần thiết của bảng trung gian
                    }
                }
            ],
            attributes: ['id', 'truyen_ma', 'truyen_ten', 'truyen_hinhanhdaidien', 'truyen_tacgia', 'truyen_motangan', 'truyen_duyet', 'createdAt'],
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

const GetAllTheLoaiService = async ({ limit, page, search }) => {
    try {

        let offset = null;
        if (page !== '' && limit !== '') {
            offset = (page - 1) * limit;
        }

        const { rows: theLoaiList, count } = await db.TheLoai.findAndCountAll({
            attributes: ['id', 'ten_theloai'],
            where: {
                ten_theloai: {
                    [Op.like]: `%${search}%`
                }
            },
            ...(limit !== '' && page !== '' ? { offset, limit } : {})
        });

        return {
            error: false,
            page: page,
            totalPages: Math.ceil(count / limit),
            totalTheloais: count,
            data: theLoaiList,
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

const UpdateTheLoaiService = async ({ id, ten_theloai }) => {
    try {

        const theLoai = await db.TheLoai.findOne({
            where: {
                id
            }
        });

        if (!theLoai) {
            return {
                error: true,
                message: 'Không tìm thấy thể loại !'
            }
        }

        await db.TheLoai.update({
            ten_theloai
        }, {
            where: {
                id
            }
        });

        const updatedTheLoai = await db.TheLoai.findOne({
            where: {
                id
            }
        });

        return {
            error: false,
            data: updatedTheLoai,
            message: 'Cập Nhật Thể Loại Thành Công !'
        }

    } catch (error) {
        console.log(error);
        return {
            error: true,
            message: 'Internal Server Error'
        }

    }
}

const DeleteTheLoaiService = async (id) => {
    try {

        const theLoaiList = await db.TheLoai.findAll({
            where: { id: id }
        });

        if (!theLoaiList || theLoaiList.length === 0) {
            return {
                error: true,
                message: 'Không tìm thấy thể loại nào để xóa!'
            };
        }

        const result = await db.TheLoai.destroy({
            where: {
                id: id
            }
        });

        if (!result) {
            return {
                error: true,
                message: 'Xóa Thể Loại Thất Bại !'
            }
        }

        return {
            error: false,
            message: 'Xóa Thể Loại Thành Công !'
        }

    } catch (error) {
        console.log(error);
        return {
            error: true,
            message: 'Internal Server Error'
        }

    }
}

const AddTheLoaiInTruyenService = async ({ TruyenId, TheLoaiIds }) => {
    try {

        if (!TheLoaiIds || TheLoaiIds.length === 0) {
            return {
                error: true,
                message: 'Vui lòng chọn thể loại mới rồi hẳn bấm!'
            };
        }

        const results = await Promise.all(TheLoaiIds.map(async (TheLoaiId) => {
            const truyen = await db.TruyenTheloai.findOne({
                where: {
                    TruyenId, // Cần kiểm tra TruyenId để chắc chắn thể loại này thuộc về truyện nào
                    TheLoaiId
                }
            });

            if (truyen) {
                return {
                    error: true,
                    message: `Truyện này đã có thể loại ${TheLoaiId}!`
                };
            }

            await db.TruyenTheloai.create({
                TruyenId,
                TheLoaiId
            });

            return {
                error: false,
            };
        }));

        const errorResults = results.filter(result => result && result.error);

        if (errorResults.length > 0) {
            return {
                error: true,
                message: errorResults.map(res => res.message).join(' | '),
            };
        }

        return {
            error: false,
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

const DeleteTheLoaiForTruyenService = async ({ TruyenId, TheLoaiId }) => {
    try {

        if (!TruyenId || !TheLoaiId) {
            return {
                error: true,
                message: 'Lỗi không nhận được id truyện và id thể loại!'
            }
        }

        const truyen = await db.TruyenTheloai.findOne({
            where: {
                TruyenId,
                TheLoaiId
            }
        });

        if (!truyen) {
            return {
                error: true,
                message: 'Không tìm thấy thể loại trong truyện !'
            }
        }

        await db.TruyenTheloai.destroy({
            where: {
                TruyenId,
                TheLoaiId
            }
        });

        return {
            error: false,
            message: `Xóa Thể Loại Cho Truyện Thành Công !`
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

        // Sử dụng bulkCreate để thêm tất cả các bản ghi cùng lúc
        const newImages = await db.chuong_hinhanh.bulkCreate(imageObjects);

        return {
            error: false,
            data: newImages,
            message: 'Thêm Ảnh Cho Chương Thành Công !'
        }

    } catch (error) {
        for (let image of images) {
            const imagePath = path.join(__dirname, '../../public', image);

            if (!fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }
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
                    attributes: ['chuong_hinhanh_link', 'sort_order'],
                    order: [['sort_order', 'ASC']],
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

const DeleteTruyenService = async (ids) => {

    try {

        const truyenList = await db.Truyen.findAll({
            where: { id: ids }
        });

        if (!truyenList || truyenList.length === 0) {
            return {
                error: true,
                message: 'Không tìm thấy truyện nào để xóa!'
            };
        }

        const deleteImagePromises = truyenList.map(async (truyen) => {
            if (truyen.truyen_hinhanhdaidien) {
                const imagePath = path.join(__dirname, '../../public', truyen.truyen_hinhanhdaidien);

                if (fs.existsSync(imagePath)) {
                    await unlinkFile(imagePath).catch((err) => {
                        console.error(`Error deleting image for truyen id ${truyen.id}:`, err);
                    });
                }
            }

            const chapters = await db.Chuong.findAll({
                where: { TruyenId: truyen.id }
            });

            const deleteChapterImagePromises = chapters.map(async (chapter) => {
                const chapterImages = await db.chuong_hinhanh.findAll({
                    where: { ChuongId: chapter.id }
                });

                const deleteImagesPromises = chapterImages.map(async (image) => {
                    const imagePath = path.join(__dirname, '../../public', image.chuong_hinhanh_link);
                    if (fs.existsSync(imagePath)) {
                        await unlinkFile(imagePath).catch((err) => {
                            console.error(`Error deleting image for chapter id ${chapter.id}:`, err);
                        });
                    }
                });

                await Promise.all(deleteImagesPromises);

                await db.chuong_hinhanh.destroy({ where: { ChuongId: chapter.id } });

                await db.Chuong.destroy({ where: { id: chapter.id } });
            });

            await Promise.all(deleteChapterImagePromises);

        });

        await Promise.all(deleteImagePromises);

        const result = await db.Truyen.destroy({
            where: {
                id: ids
            }
        });

        if (!result) {
            return {
                error: true,
                message: 'Xóa Truyện Thất Bại !'
            }
        }

        return {
            error: false,
            message: 'Xóa Truyện Thành Công !'
        }

    } catch (error) {
        console.log(error);
        return {
            error: true,
            message: 'Internal Server Error'
        }

    }
};

const UpdateTruyenService = async ({
    truyen_ma,
    truyen_ten,
    truyen_hinhanhdaidien,
    truyen_tacgia,
    truyen_motangan,
    truyen_duyet
}) => {
    try {
        const truyen = await db.Truyen.findOne({
            where: {
                truyen_ma
            }
        });


        if (!truyen) {
            return {
                error: true,
                message: 'không tìm thấy truyện !'
            }
        }

        const isTruyenExists = await db.Truyen.findOne({
            where: {
                truyen_ma,
                id: {
                    [Sequelize.Op.ne]: truyen.id
                }
            }
        });

        if (isTruyenExists) {
            if (truyen_hinhanhdaidien) {
                const oldAvatarPath = path.join(__dirname, '../../public', truyen_hinhanhdaidien);
                if (fs.existsSync(oldAvatarPath)) {
                    fs.unlinkSync(oldAvatarPath); // Xóa ảnh mới nếu đã lưu
                }
            }

            return {
                error: true,
                message: 'Mã Truyện Đã Tồn Tại !'
            }
        }

        if (truyen.truyen_hinhanhdaidien && truyen_hinhanhdaidien) {
            const oldAvatarPath = path.join(__dirname, '../../public', truyen.truyen_hinhanhdaidien);

            // Kiểm tra file tồn tại trước khi xóa
            if (fs.existsSync(oldAvatarPath)) {
                fs.unlinkSync(oldAvatarPath); // Xóa file ảnh cũ
            }
        }

        const updateData = {
            truyen_ma,
            truyen_ten,
            truyen_tacgia,
            truyen_motangan,
            truyen_duyet
        };

        if (truyen_hinhanhdaidien) {
            updateData.truyen_hinhanhdaidien = truyen_hinhanhdaidien;
        }

        await db.Truyen.update(updateData,
            {
                where: {
                    truyen_ma
                }
            }
        );

        const updatedTruyen = await db.Truyen.findOne({
            where: {
                truyen_ma
            }
        });

        return {
            error: false,
            data: updatedTruyen,
            message: 'Cập Nhật Truyện Thành Công !'
        }
    } catch (error) {
        console.log(error);
        return {
            error: true,
            message: 'Internal Server Error'
        }

    }
}

const DeleteChuongService = async ({ ChuongId }) => {
    try {

        const chuong = await db.Chuong.findOne({
            where: {
                id: ChuongId
            }
        });

        if (!chuong) {
            return {
                error: true,
                message: 'Không tìm thấy chương !'
            }
        }

        const chapterImages = await db.chuong_hinhanh.findAll({
            where: { ChuongId }
        });

        const deleteImagesPromises = chapterImages.map(async (image) => {
            const imagePath = path.join(__dirname, '../../public', image.chuong_hinhanh_link);
            if (fs.existsSync(imagePath)) {
                await unlinkFile(imagePath).catch((err) => {
                    console.error(`Error deleting image for chapter id ${chapter.id}:`, err);
                });
            }
        });

        await Promise.all(deleteImagesPromises);

        await db.chuong_hinhanh.destroy({ where: { ChuongId } });

        await db.Chuong.destroy({
            where: {
                id: ChuongId
            }
        });

        return {
            error: false,
            message: 'Xóa Chương Thành Công !'
        }

    } catch (error) {
        console.log(error);
        return {
            error: true,
            message: 'Internal Server Error'
        }

    }
}

const DeleteImagesChuongService = async ({ imagePath }) => {
    try {

        const image = await db.chuong_hinhanh.findOne({ where: { chuong_hinhanh_link: imagePath } });

        if (!image) {
            return {
                error: true,
                message: 'Không tìm thấy ảnh trong database'
            }
        }
        const filePath = path.join(__dirname, '../../public', imagePath);

        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);  // Xóa file đồng bộ
            await db.chuong_hinhanh.destroy({ where: { id: image.id } });
            return {
                error: false,
                message: 'Xóa Ảnh Thành Công !'
            }
        }

        return {
            error: true,
            message: 'Không tìm thấy ảnh trong hệ thống'
        }


    } catch (error) {

        console.log(error);
        return {
            error: true,
            message: 'Internal Server Error'
        }

    }

}

const UpdateSortImageService = async ({ id, images }) => {
    try {

        const updatePromises = images.map((imagePath, index) => {
            return db.chuong_hinhanh.update(
                { sort_order: index },
                {
                    where: {
                        ChuongId: id,
                        chuong_hinhanh_link: imagePath
                    }
                }
            );
        });

        await Promise.all(updatePromises);

        return {
            error: false,
            message: 'Cập Nhật Thứ Tự Ảnh Thành Công !'
        }

    } catch (error) {
        console.log(error);
        return {
            error: true,
            message: 'Internal Server Error'
        }

    }
}

const UpdateInfoChuongService = async ({ id, Chuong_so, Chuong_ten, Chuong_noidung }) => {
    try {

        const chuong = await db.Chuong.findOne({
            where: {
                id
            }
        });

        if (!chuong) {
            return {
                error: true,
                message: 'Không tìm thấy chương !'
            }
        }

        await db.Chuong.update({
            Chuong_so,
            Chuong_ten,
            Chuong_noidung
        }, {
            where: {
                id
            }
        });

        const updatedChuong = await db.Chuong.findOne({
            where: {
                id
            }
        });

        return {
            error: false,
            data: updatedChuong,
            message: 'Cập Nhật Chương Thành Công !'
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
    GetChuongService,
    DeleteTruyenService,
    UpdateTruyenService,
    DeleteChuongService,
    DeleteImagesChuongService,
    UpdateSortImageService,
    UpdateInfoChuongService,
    GetAllTheLoaiService,
    DeleteTheLoaiService,
    UpdateTheLoaiService,
    DeleteTheLoaiForTruyenService
}