import { Box, Button, TextField } from "@mui/material";
import { Formik, Field } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../components/Header";
import { addHouseHold } from "../Services/API/householdService";
import CustomSelect from "../components/CustomSelect";
import axios from "../setups/custom_axios";
import { useState, useEffect } from "react";
const HouseholdAddPage = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const [dataNhanKhau, setDataNhanKhau] = useState([]);

  useEffect(
    async () => {
      try {
        const response = await axios.get(`/nhan-khau/danh-sach-nhan-khau-chua-co-ho-khau`)
        const datas = response.data;
        const datamap = datas.map((data) => {
          const label = data.hoTen + " " + data.maNhanKhau
          return {
            label,
            value: data.maNhanKhau
          }
        })
        setDataNhanKhau(datamap);
      } catch (error) {
        console.log(error);
      }
    }, []
  )

  return (
    <Box m="20px">
      <Header title="Tạo hộ khẩu" />


      <Formik
        onSubmit={(values) => {
          console.log({
            "maHoKhau": values.maHoKhau,
            "diaChiThuongTru": values.diaChiThuongTru,
            "noiCap": values.noiCap,
            "ngayCap": values.ngayCap,
            "danhSachNhanKhau": values.danhSachNhanKhau
          })
          addHouseHold({
            "maHoKhau": values.maHoKhau,
            "diaChiThuongTru": values.diaChiThuongTru,
            "noiCap": values.noiCap,
            "ngayCap": values.ngayCap,
            "danhSachNhanKhau": values.danhSachNhanKhau
          })
        }}
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
                label="Mã hộ khẩu"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.maHoKhau}
                name="maHoKhau"
                error={!!touched.maHoKhau && !!errors.maHoKhau}
                helperText={touched.maHoKhau && errors.maHoKhau}
                sx={{ "& .MuiInputBase-root": {height: 60},  input: { border: "none" }, gridColumn: "span 4", backgroundColor: "#293040" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Địa chỉ"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.diaChiThuongTru}
                name="diaChiThuongTru"
                error={!!touched.diaChiThuongTru && !!errors.diaChiThuongTru}
                helperText={touched.diaChiThuongTru && errors.diaChiThuongTru}
                sx={{ "& .MuiInputBase-root": {height: 60},  input: { border: "none" }, gridColumn: "span 4", backgroundColor: "#293040" }}
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
                sx={{ "& .MuiInputBase-root": {height: 60},  input: { border: "none" }, gridColumn: "span 4", backgroundColor: "#293040" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type='date'
                label="Ngày cấp"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.ngaycap}
                name="ngayCap"
                error={!!touched.ngayCap && !!errors.ngayCap}
                helperText={touched.ngayCap && errors.ngayCap}
                sx={{ "& .MuiInputBase-root": {height: 60},  input: { border: "none" }, gridColumn: "span 4", backgroundColor: "#293040" }}
              />
              <Field
                fullWidth
                className="custom-select"
                name="danhSachNhanKhau"
                options={dataNhanKhau}
                component={CustomSelect}
                placeholder="Danh sách mã nhân khẩu "
                isMulti={true}
                sx={{ width :"400px" }}

              />

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
  maHoKhau: yup.string(),
  diaChiThuongTru: yup.string().required("required"),
  noiCap: yup.string().required("required"),
  ngayCap: yup.string().required("required"),
  danhSachNhanKhau: yup.array().required("required")
});
let initialValues = {
  maHoKhau: "",
  diaChiThuongTru: "",
  noiCap: "",
  ngayCap: new Date(),
  danhSachNhanKhau: [],
};

export default HouseholdAddPage;
