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

} = require("../Services/truyenService");

const CreateTruyenController = async (req, res) => {
    const { truyen_ma, truyen_ten, truyen_tacgia, truyen_motangan } = req.body;

    let truyen_hinhanhdaidien = null;
    if (req.file) {
        const fullPath = req.file.path;

        truyen_hinhanhdaidien = fullPath.replace(/.*\\public\\/, '\\public\\');
    }

    const newTruyen = await CreateTruyenService({ truyen_ma, truyen_ten, truyen_hinhanhdaidien, truyen_tacgia, truyen_motangan });

    if (newTruyen.error) {
        return res.status(400).json(newTruyen);
    }

    return res.status(200).json(newTruyen);

}

const GetAllTruyenController = async (req, res) => {
    const truyenList = await GetAllTruyenService();

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

const CreateTheLoaiController = async (req, res) => {
    const { ten_theloai } = req.body;

    const newTheLoai = await CreateTheLoaiService({ ten_theloai });

    if (newTheLoai.error) {
        return res.status(400).json(newTheLoai);
    }

    return res.status(200).json(newTheLoai);
}

const AddTheLoaiInTruyenController = async (req, res) => {
    const { TruyenId, TheLoaiId } = req.body;

    const newTheLoai = await AddTheLoaiInTruyenService({ TruyenId, TheLoaiId });

    if (newTheLoai.error) {
        return res.status(400).json(newTheLoai);
    }

    return res.status(200).json(newTheLoai);
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

    const images = req.files.map((file) => {
        const fullPath = file.path;

        return fullPath.replace(/.*\\public\\/, '\\public\\');
    });

    console.log(images, ChuongId);


    const newImages = await AddImagesChuongService({ ChuongId, images });

    if (newImages.error) {
        return res.status(400).json(newImages);
    }

    return res.status(200).json(newImages);
}

const GetChuongController = async (req, res) => {

    const { id } = req.params;

    const chuong = await GetChuongService({ id });

    if (chuong.error) {
        return res.status(400).json(chuong);
    }

    return res.status(200).json(chuong);

}

module.exports = {
    CreateTruyenController,
    GetAllTruyenController,
    GetTruyenController,
    CreateTheLoaiController,
    AddTheLoaiInTruyenController,
    CreateChuongController,
    AddImagesChuongController,
    GetChuongController

}