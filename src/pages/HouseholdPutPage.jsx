import { Box, Button, TextField } from "@mui/material";
import { Formik, Field } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../components/Header";
import CustomSelect from "../components/CustomSelect";
import { useLocation, Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "../setups/custom_axios";


const HouseholdAddPage = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const location = useLocation();
  const state = location.state;
  const { id } = useParams();
  const [detailHouseholdData, setdetailHouseHoldData] = useState({})
  const [isLoading, setIsLoading] = useState(true);

  const [initialValues, setInitialValues] = useState({
    maHoKhau: detailHouseholdData.maHoKhau,
    diaChiThuongTru: detailHouseholdData.diaChiThuongTru,
    noiCap: detailHouseholdData.noiCap,
    ngayCap: detailHouseholdData.ngayCap,
    danhSachNhanKhau: [],
  })

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(`ho-khau?maHoKhau=${id}`)
        setdetailHouseHoldData(response.data);
        setInitialValues ({
          maHoKhau: detailHouseholdData.maHoKhau,
          diaChiThuongTru: detailHouseholdData.diaChiThuongTru,
          noiCap: detailHouseholdData.noiCap,
          ngayCap: detailHouseholdData.ngayCap,
          danhSachNhanKhau: []
        })
        setIsLoading (false);
      } catch (error) {
        console.log(error);
      };
    }
    console.log (initialValues)
    fetch();
  }, [])

  if (isLoading) {
    return  <div>Loading....</div>
  }

  return (

    <Box m="20px" onLoad>
      <Header title="Thay đổi hộ khẩu" />


      <Formik
        onSubmit={(values) => {
          console.log({
            "maHoKhau": values.maHoKhau,
            "diaChiThuongTru": values.diaChiThuongTru,
            "noiCap": values.noiCap,
            "ngayCap": values.ngayCap,
            "danhSachNhanKhau": values.danhSachNhanKhau
          })
          //   addHouseHold({
          //     "maHoKhau": values.maHoKhau,
          //     "diaChiThuongTru": values.diaChiThuongTru,
          //     "noiCap": values.noiCap,
          //     "ngayCap": values.ngayCap,
          //     "danhSachNhanKhau": values.danhSachNhanKhau
          //   })
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
                sx={{ gridColumn: "span 4" }}
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
                type='date'
                label="Ngày cấp"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.ngaycap}
                name="ngayCap"
                error={!!touched.ngayCap && !!errors.ngayCap}
                helperText={touched.ngayCap && errors.ngayCap}
                sx={{ gridColumn: "span 4" }}
              />
              <Field
                fullWidth
                className="custom-select"
                name="danhSachNhanKhau"
                options={state}
                component={CustomSelect}
                placeholder="Danh sách mã nhân khẩu "
                isMulti={true}
                sx={{ width: "400px" }}

              />

            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button  color="secondary" variant="contained" onClick={() => console.log(detailHouseholdData)}>
                Thay đổi hộ khẩu
              </Button>
            </Box>

          </form>
        )}
      </Formik>
    </Box>
  );
};

const checkoutSchema = yup.object().shape({
  maHoKhau: yup.string().required("required"),
  diaChiThuongTru: yup.string().required("required"),
  noiCap: yup.string().required("required"),
  ngayCap: yup.string().required("required"),
  danhSachNhanKhau: yup.array().required("required")
});


export default HouseholdAddPage;
