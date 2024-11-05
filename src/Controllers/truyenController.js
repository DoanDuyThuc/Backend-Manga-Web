const path = require('path');

const {
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
    DeleteImagesChuongService,
    UpdateSortImageService,
    UpdateInfoChuongService,
    DeleteChuongService,
    GetAllTheLoaiService,
    DeleteTheLoaiService,
    UpdateTheLoaiService,
    DeleteTheLoaiForTruyenService

} = require("../Services/truyenService");

const CreateTruyenController = async (req, res) => {
    const { truyen_ma, truyen_ten, truyen_tacgia, truyen_motangan, quoc_gia, UserId } = req.body;

    let truyen_hinhanhdaidien;
    if (req.file) {
        const file = req.file;
        truyen_hinhanhdaidien = `/Ucomics/${file.filename}`;  // Gán đường dẫn avatar mới
    }


    const newTruyen = await CreateTruyenService({ truyen_ma, truyen_ten, truyen_hinhanhdaidien, truyen_tacgia, truyen_motangan, quoc_gia, UserId });

    if (newTruyen.error) {
        return res.status(400).json(newTruyen);
    }

    return res.status(200).json(newTruyen);

}

const GetAllTruyenController = async (req, res) => {

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const search = req.query.search || '';
    const searchStatus = req.query.searchStatus || '';

    const truyenList = await GetAllTruyenService({ limit, page, search, searchStatus });

    if (truyenList.error) {
        return res.status(400).json(truyenList);
    }

    return res.status(200).json(truyenList);
}

const GetTruyenController = async (req, res) => {
    const { truyen_ma } = req.params;

    const truyen = await GetTruyenService({ truyen_ma });

    if (truyen.error) {
        return res.status(400).json(truyen);
    }

    return res.status(200).json(truyen);
}

const GetAllTheLoaiController = async (req, res) => {

    const page = parseInt(req.query.page) || '';
    const limit = parseInt(req.query.limit) || '';
    const search = req.query.search || '';

    const theloaiList = await GetAllTheLoaiService({ limit, page, search });

    if (theloaiList.error) {
        return res.status(400).json(theloaiList);
    }

    return res.status(200).json(theloaiList);
}

const CreateTheLoaiController = async (req, res) => {
    const { ten_theloai } = req.body;

    const newTheLoai = await CreateTheLoaiService({ ten_theloai });

    if (newTheLoai.error) {
        return res.status(400).json(newTheLoai);
    }

    return res.status(200).json(newTheLoai);
}

const DeleteTheLoaiController = async (req, res) => {
    const { ids } = req.body;

    const result = await DeleteTheLoaiService(ids);

    if (result.error) {
        return res.status(400).json(result);
    }

    return res.status(200).json(result);
}

const UpdateTheloaiController = async (req, res) => {
    const { id, ten_theloai } = req.body;

    const result = await UpdateTheLoaiService({ id, ten_theloai });

    if (result.error) {
        return res.status(400).json(result);
    }

    return res.status(200).json(result);
}

const AddTheLoaiInTruyenController = async (req, res) => {
    const { TruyenId, TheLoaiIds } = req.body;

    const newTheLoai = await AddTheLoaiInTruyenService({ TruyenId, TheLoaiIds });

    if (newTheLoai.error) {
        return res.status(400).json(newTheLoai);
    }

    return res.status(200).json(newTheLoai);
}

const DeleteTheLoaiForTruyenController = async (req, res) => {
    const TruyenId = parseInt(req.query.TruyenId);
    const TheLoaiId = parseInt(req.query.TheLoaiId);

    console.log(TruyenId, TheLoaiId);


    const result = await DeleteTheLoaiForTruyenService({ TruyenId, TheLoaiId });

    if (result.error) {
        return res.status(400).json(result);
    }

    return res.status(200).json(result);
}

const CreateChuongController = async (req, res) => {
    const { Chuong_so, Chuong_ten, Chuong_noidung, TruyenId } = req.body;

    const newChuong = await CreateChuongService({ Chuong_so, Chuong_ten, Chuong_noidung, TruyenId });

    if (newChuong.error) {
        return res.status(400).json(newChuong);
    }

    return res.status(200).json(newChuong);
}

const AddImagesChuongController = async (req, res) => {
    const { ChuongId } = req.body;

    // const images = req.files.map((file) => {
    //     const fullPath = file.path;

    //     return fullPath.replace(/.*\\public\\/, '\\public\\');
    // });

    if (req.files && req.files.length > 0) {
        const images = req.files.map((file) => {
            console.log(file);

            return `/Chapters/${file.filename}`;
        });

        const newImages = await AddImagesChuongService({ ChuongId, images });

        if (newImages.error) {
            return res.status(400).json(newImages);
        }
        return res.status(200).json(newImages);
    } else {
        return res.status(400).json({ error: 'No image found' });
    }

}

const GetChuongController = async (req, res) => {

    const { id } = req.params;

    const { ChuongId } = req.query;

    const chuong = await GetChuongService({ id, ChuongId });

    if (chuong.error) {
        return res.status(400).json(chuong);
    }

    return res.status(200).json(chuong);

}

const DeleteTruyenController = async (req, res) => {
    const { ids } = req.body;

    const result = await DeleteTruyenService(ids);

    if (result.error) {
        return res.status(400).json(result);
    }

    return res.status(200).json(result);

}

const UpdateTruyenController = async (req, res) => {
    const { truyen_ten, truyen_tacgia, truyen_motangan, quoc_gia, isOver, truyen_duyet } = req.body;

    const { truyen_ma } = req.params;

    let truyen_hinhanhdaidien;
    if (req.file) {
        const file = req.file;
        truyen_hinhanhdaidien = `/Ucomics/${file.filename}`;  // Gán đường dẫn avatar mới
    }

    const newTruyen = await UpdateTruyenService({ truyen_ma, truyen_ten, truyen_hinhanhdaidien, truyen_tacgia, truyen_motangan, quoc_gia, isOver, truyen_duyet });

    if (newTruyen.error) {
        return res.status(400).json(newTruyen);
    }

    return res.status(200).json(newTruyen);
}

const DeleteChuongController = async (req, res) => {

    const { ChuongId } = req.body;

    const result = await DeleteChuongService({ ChuongId });

    if (result.error) {
        return res.status(400).json(result);
    }

    return res.status(200).json(result);
}

const DeleteImagesChuongController = async (req, res) => {
    const { imagePath } = req.body;

    console.log(imagePath);


    const result = await DeleteImagesChuongService({ imagePath });

    if (result.error) {
        return res.status(400).json(result);
    }

    return res.status(200).json(result);
}

const UpdateSortImageController = async (req, res) => {
    const { id } = req.params;
    const { images } = req.body;

    console.log(images);


    const result = await UpdateSortImageService({ id, images });

    if (result.error) {
        return res.status(400).json(result);
    }

    return res.status(200).json(result);
}

const UpdateInfoChuongController = async (req, res) => {
    const { id } = req.params;
    const { Chuong_so, Chuong_ten, Chuong_noidung, TruyenId } = req.body;

    console.log(id, Chuong_so, Chuong_ten, Chuong_noidung, TruyenId);


    const result = await UpdateInfoChuongService({ id, Chuong_so, Chuong_ten, Chuong_noidung, TruyenId });

    if (result.error) {
        return res.status(400).json(result);
    }

    return res.status(200).json(result);
}

module.exports = {
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
    UpdateInfoChuongController,
    DeleteChuongController,
    GetAllTheLoaiController,
    DeleteTheLoaiController,
    UpdateTheloaiController,
    DeleteTheLoaiForTruyenController

}