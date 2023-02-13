import axios from "../../setups/custom_axios";

const getListRevenue = () => {
    return axios.get("/khoan-thu/danh-sach-khoan-thu");
}
const getRevenue = (maKhoanThu) => {
    return axios.get(`khoan-thu?maKhoanThu=${maKhoanThu}`);
}
const postRevenue = (data) => {
    const {tenKhoanThu, thoiGianBatDau, thoiGianKetThuc, loaiKhoanThu, ghiChu} = data;
    return axios.post("/khoan-thu", {
        tenKhoanThu: tenKhoanThu,
        thoiGianBatDau: thoiGianBatDau,
        thoiGianKetThuc: thoiGianKetThuc,
        loaiKhoanThu: loaiKhoanThu,
        ghiChu: ghiChu
    });
}
const putRevenue = (maKhoanThu, data) => {
    const {tenKhoanThu, thoiGianBatDau, thoiGianKetThuc, ghiChu, version} = data;
    return axios.put(`/khoan-thu?maKhoanThu=${maKhoanThu}`, {
        tenKhoanThu: tenKhoanThu,
        thoiGianBatDau: thoiGianBatDau,
        thoiGianKetThuc: thoiGianKetThuc,
        ghiChu: ghiChu,
        version: version
    });
}
const deleteRevenue = (maKhoanThu, version) => {
    return axios.delete(`khoan-thu?maKhoanThu=${maKhoanThu}&version=${version}`);
}
const getRevenueHouse = (maHoKhau) => {
    return axios.get(`/khoan-thu-theo-ho?maHoKhau=${maHoKhau}`);
}
const payRevenue = (data) => {
    const {maKhoanThuTheoHo, tenHoaDon, soTienDaNop} = data;
    return axios.post("/thanh-toan", {
        maKhoanThuTheoHo: maKhoanThuTheoHo,
        tenHoaDon: tenHoaDon,
        soTienDaNop: soTienDaNop
    })
}
const revenueService = {getListRevenue, getRevenue, postRevenue, putRevenue, deleteRevenue, getRevenueHouse, payRevenue};
export default revenueService;
