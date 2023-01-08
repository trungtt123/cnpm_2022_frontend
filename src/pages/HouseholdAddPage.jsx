import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../components/Header";

const HouseholdAddPage = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = (values) => {
    console.log(values);
  };

  
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
                label="Mã hộ khẩu"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.firstName}
                name="mahk"
                error={!!touched.mahk && !!errors.mahk}
                helperText={touched.mahk && errors.mahk}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Địa chỉ"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.diachi}
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
  mahk: yup.string().required("required"),
  diachi: yup.string().required("required"),
  noicap: yup.string().required("required"),
  ngaycap: yup.string().required("required"),
});
const initialValues = {
  mahk: "",
  diachi: "",
  nơicap: "",
  ngaycap: "",
};

export default HouseholdAddPage;