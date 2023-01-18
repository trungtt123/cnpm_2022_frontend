import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../components/Header";
import SnackbarContent from '@mui/material/SnackbarContent';
import { useEffect } from "react";

const testform = [1, 2];
const HouseholdPutPage = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = (values) => {
    console.log(values);
  }

  const validate1 = (value) => {
    let error;
    if (!value) {
      error = 'Required';
    }
    return error;
  }

  let x = 0;

  return (
    <Box m="20px">
      <Header title="Tạo hộ khẩu" />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
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
                name="diachi"
                error={!!touched.diachi && !!errors.diachi}
                helperText={touched.diachi && errors.diachi}
                sx={{ gridColumn: "span 4" }}

              />

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Nơi cấp"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.noicap}
                name="noicap"
                error={!!touched.noicap && !!errors.noicap}
                helperText={touched.noicap && errors.noicap}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Ngày cấp"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.ngaycap}
                name="ngaycap"
                error={!!touched.ngaycap && !!errors.ngaycap}
                helperText={touched.ngaycap && errors.ngaycap}
                sx={{ gridColumn: "span 4" }}
              />

              {
                testform.map((test) => {
                  if (x >= testform.length) x = 0;
                  x = x + 1
                  const mess = 'Nhân khẩu thứ ' + x;
                  const maNhanKhauName = 'danhSachnhankhau[' + (x - 1) + '].maNhanKhau';
                  const hoTenName = 'danhSachnhankhau[' + (x - 1) + '].hoTen';
                  const canCuocCongDanName = 'danhSachnhankhau[' + (x - 1) + '].canCuocCongDan';
                  const ngaySinhName = 'danhSachnhankhau[' + (x - 1) + '].ngaySinh';
                  const noiSinhName = 'danhSachnhankhau[' + (x - 1) + '].noiSinh';
                  const danTocName = 'danhSachnhankhau[' + (x - 1) + '].danToc';
                  const ngheNghiepName = 'danhSachnhankhau[' + (x - 1) + '].ngheNghiep';
                  const quanHeName = 'danhSachnhankhau[' + (x - 1) + '].quanHe';
                  const trangThaiName = 'danhSachnhankhau[' + (x - 1) + '].trangThai';
                  const ghiChuName = 'danhSachnhankhau[' + (x - 1) + '].ghiChu';

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
                        value={values.danhSachnhankhau[x - 1].maNhanKhau}
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
                        value={values.danhSachnhankhau[x - 1].hoTen}
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
                        value={values.danhSachnhankhau[x - 1].canCuocCongDan}
                        name={canCuocCongDanName}
                        sx={{ gridColumn: "span 1" }}
                      />
                      <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Ngày sinh"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.danhSachnhankhau[x - 1].ngaySinh}
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
                        value={values.danhSachnhankhau[x - 1].noiSinh}
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
                        value={values.danhSachnhankhau[x - 1].danToc}
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
                        value={values.danhSachnhankhau[x - 1].ngheNghiep}
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
                        value={values.danhSachnhankhau[x - 1].quanHe}
                        name={quanHeName}
                        sx={{ gridColumn: "span 1" }}
                      />
                      <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Trạng thái"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.danhSachnhankhau[x - 1].trangThai}
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
                        value={values.danhSachnhankhau[x - 1].ghiChu}
                        name={ghiChuName}
                        sx={{ gridColumn: "span 1" }}
                      />
                    </Box>
                  )
                })
              }
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Tạo hộ khẩu mới
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const checkoutSchema = yup.object().shape({
  diachi: yup.string().required("required"),
  noicap: yup.string().required("required"),
  ngaycap: yup.string().required("required"),
  danhSachnhankhau: yup.array().of(yup.object().shape({
    maNhanKhau: yup.string().required("required"),
    hoTen: yup.string().required("required"),
    canCuocCongDan: yup.string().required("required"),
    ngaySinh: yup.string().required("required"),
    noiSinh: yup.string().required("required"),
    danToc: yup.string().required("required"),
    ngheNghiep: yup.string().required("required"),
    quanHe: yup.string().required("required"),
    trangThai: yup.string().required("required"),
    ghiChu: yup.string().required("required"),
  }))
});
const initialValues = {
  diachi: "",
  noicap: "",
  ngaycap: "",
  danhSachnhankhau:
    testform.map(test => (
      {
        maNhanKhau: "",
        hoTen: "",
        canCuocCongDan: "",
        ngaySinh: "",
        noiSinh: "",
        danToc: "",
        ngheNghiep: "",
        quanHe: "",
        trangThai: "",
        ghiChu: "",
      }
    ))
};

export default HouseholdPutPage;


