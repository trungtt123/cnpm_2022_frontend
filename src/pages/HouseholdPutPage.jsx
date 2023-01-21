import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../components/Header";
import SnackbarContent from '@mui/material/SnackbarContent';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../setups/custom_axios"
import { formatDate } from "../Services/API/formatDateService";


//
const testform = [1,2];
const HouseholdPutPage = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = (values) => {
    console.log(values);
  }

  const [saveData, setSaveData] = useState(null)
  const [detailHouseholdData, setdetailHouseHoldData] = useState({})
  const [danhSachNhanKhau, setDanhSachNhanKhau] = useState([])
  const { id } = useParams();
  
  const fetchapi = async () => {
    try {
      if (!id) return;
      const response = await axios.get(`ho-khau?maHoKhau=${id}`)
      setdetailHouseHoldData(response.data)
      setDanhSachNhanKhau(response.data.danhSachNhanKhau);
      
    } catch (error) {
      console.log(error);
    }
  }
  
  useEffect(() => {
    fetchapi();
  }, []);
  
  let x = 0;

  return (
    <Box m="20px">
      <Header title="Thay đổi hộ khẩu" />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={saveData || {
          diaChiThuongTru: "",
          noiCap: "",
          ngayCap: "",
          danhSachNhanKhau:
            testform.map(test => (
              {
                maNhanKhau: "",
                hoTen: "",
                canCuocCongDan: "",
                ngaySinh: new Date(),
                noiSinh: "",
                danToc: "",
                ngheNghiep: "",
                quanHe: "",
                trangThai: 1,
                ghiChu: "",
              }
            ))
        }}

        enableReinitialize
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >


              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Địa chỉ"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.diaChiThuongTru}
                name= "diaChiThuongTru"
                error={!!touched.diaChiThuongTru && !!errors.diaChiThuongTru}
                helperText={touched.diaChiThuongTru && errors.diaChiThuongTru}
                sx={{ gridColumn: "span 4" }}

              />

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Nơi cấp"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.noiCap}
                name="noiCap"
                error={!!touched.noiCap && !!errors.noiCap}
                helperText={touched.noiCap && errors.noiCap}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="date"
                label="Ngày cấp"
                onBlur={handleBlur}
                onChange={handleChange}
                value={formatDate (values.ngayCap)}
                name="ngayCap"
                error={!!touched.ngayCap && !!errors.ngayCap}
                helperText={touched.ngayCap && errors.ngayCap}
                sx={{ gridColumn: "span 4" }}
              />

              {
                danhSachNhanKhau.map((test) => {
                  if (x >= danhSachNhanKhau.length) x = 0;
                  x = x + 1
                  const mess = 'Nhân khẩu thứ ' + x;
                  const maNhanKhauName = 'danhSachNhanKhau[' + (x - 1) + '].maNhanKhau';
                  const hoTenName = 'danhSachNhanKhau[' + (x - 1) + '].hoTen';
                  const canCuocCongDanName = 'danhSachNhanKhau[' + (x - 1) + '].canCuocCongDan';
                  const ngaySinhName = 'danhSachNhanKhau[' + (x - 1) + '].ngaySinh';
                  const noiSinhName = 'danhSachNhanKhau[' + (x - 1) + '].noiSinh';
                  const danTocName = 'danhSachNhanKhau[' + (x - 1) + '].danToc';
                  const ngheNghiepName = 'danhSachNhanKhau[' + (x - 1) + '].ngheNghiep';
                  const quanHeName = 'danhSachNhanKhau[' + (x - 1) + '].quanHe';
                  const trangThaiName = 'danhSachNhanKhau[' + (x - 1) + '].trangThai';
                  const ghiChuName = 'danhSachNhanKhau[' + (x - 1) + '].ghiChu';

                  return (
                    <Box
                      gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                      display="grid"
                      gap="30px"
                      sx={{ gridColumn: "span 4", }}
                    >
                      <SnackbarContent
                        message={mess}
                        style={{
                          minWidth: 0,
                          fontSize: '18px'
                        }}
                      />
                      <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Mã Nhân Khẩu"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.danhSachNhanKhau[x - 1].maNhanKhau}
                        //error={!!touched.danhSachNhanKhau[x-1].maNhanKhau && !!errors.ngayCap}
                        name={maNhanKhauName}
                        sx={{ gridColumn: "span 0.25" }}
                      />
                      <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Họ tên"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.danhSachNhanKhau[x - 1].hoTen}
                        name={hoTenName}
                        sx={{ gridColumn: "span 2" }}
                      />
                      <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Căn cước công dân"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.danhSachNhanKhau[x - 1].canCuocCongDan}
                        name={canCuocCongDanName}
                        sx={{ gridColumn: "span 1" }}
                      />
                      <TextField
                        fullWidth
                        variant="filled"
                        type="date"
                        label="Ngày sinh"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={formatDate (values.danhSachNhanKhau[x - 1].ngaySinh)}
                        name={ngaySinhName}
                        sx={{ gridColumn: "span 1" }}
                      />
                      <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Nơi sinh"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.danhSachNhanKhau[x - 1].noiSinh}
                        name={noiSinhName}
                        sx={{ gridColumn: "span 1" }}
                      />
                      <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Dân tộc"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.danhSachNhanKhau[x - 1].danToc}
                        name={danTocName}
                        sx={{ gridColumn: "span 1" }}
                      />
                      <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Nghề nghiệp"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.danhSachNhanKhau[x - 1].ngheNghiep}
                        name={ngheNghiepName}
                        sx={{ gridColumn: "span 1" }}
                      />
                      <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Quan hệ"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.danhSachNhanKhau[x - 1].quanHe}
                        name={quanHeName}
                        sx={{ gridColumn: "span 1" }}
                      />
                      <TextField
                        fullWidth
                        variant="filled"
                        type="number"
                        label="Trạng thái"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.danhSachNhanKhau[x - 1].trangThai}
                        name={trangThaiName}
                        sx={{ gridColumn: "span 1" }}
                      />
                      <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Ghi chú"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.danhSachNhanKhau[x - 1].ghiChu}
                        name={ghiChuName}
                        sx={{ gridColumn: "span 1" }}
                      />
                    </Box>
                  )
                })
              }
            </Box>

            <Box display="flex" justifyContent="end" mt="20px">

              <Button type="submit" color="secondary" variant="contained"
                onClick={() => setSaveData({
                  diaChiThuongTru: detailHouseholdData.diaChiThuongTru,
                  noiCap: detailHouseholdData.noiCap,
                  ngayCap: detailHouseholdData.ngayCap,
                  danhSachNhanKhau:
                    danhSachNhanKhau.map(nhanKhau => (
                      {
                        maNhanKhau: nhanKhau.maNhanKhau,
                        hoTen: nhanKhau.hoTen,
                        canCuocCongDan: nhanKhau.canCuocCongDan,
                        ngaySinh: nhanKhau.ngaySinh,
                        noiSinh: nhanKhau.noiSinh,
                        danToc: nhanKhau.danToc,
                        ngheNghiep: nhanKhau.ngheNghiep,
                        quanHe: nhanKhau.quanHe,
                        trangThai: nhanKhau.trangThai,
                        ghiChu: nhanKhau.ghiChu,
                      }
                    ))
                })}
              >
                Lấy dữ liệu từ id:{id}
              </Button>

            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained"
>
                Thay đổi hộ khẩu mới
              </Button>
            </Box>



          </form>
        )}
      </Formik>
    </Box>
  );

};

const checkoutSchema = yup.object().shape({
  diaChiThuongTru: yup.string().required("required"),
  noiCap: yup.string().required("required"),
  ngayCap: yup.string().required("required"),
  danhSachnhankhau: yup.array().of(yup.object().shape({
    maNhanKhau: yup.string().required("required"),
    hoTen: yup.string().required("required"),
    canCuocCongDan: yup.string().required("required"),
    ngaySinh: yup.date().required("required"),
    noiSinh: yup.string().required("required"),
    danToc: yup.string().required("required"),
    ngheNghiep: yup.string().required("required"),
    quanHe: yup.string().required("required"),
    trangThai: yup.number().required("required"),
    ghiChu: yup.string().required("required"),
  }))
});



export default HouseholdPutPage;


