import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import SaveAsIcon from '@mui/icons-material/SaveAs';
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "../setups/custom_axios";
import { logout } from "../Redux/authSlice";


const ChangePasswordPage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(
    (state) => state.auth
  );
  const handleFormSubmit = (values) => {
    /*alert(JSON.stringify(values, null, 2));*/
    if ((values.newPassword === values.confirmPassword) && window.confirm("Bạn chắc chắn muốn đổi mật khẩu?")) {
      axios.put('/change-password', {
        userName: values?.userName,
        oldPassword: values.oldPassword,
        newPassword: values.newPassword
      }).then(mes => {
        toast(mes.message);
        dispatch(logout());
      }).catch(e => {
        toast(e.response.data.reason ?? e.response.data.message ?? "Có lỗi xảy ra")
      })
    }
  };
  const initialValues = {
    userName: user?.userName,
    oldPassword: "",
    newPassword: "",
    confirmPassword: ""
  };
  return (
    <div style={{ margin: "auto", width: '500px' }}>
      <div className="text-center mt-3 mb-3" >
        <h3>ĐỔI MẬT KHẨU</h3>
      </div>

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
                "& > div": { gridColumn: "span 4" },
                width: 500
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Tên đăng nhập"
                onBlur={handleBlur}
                value={values.userName}
                name="userName"
                sx={{ "& .MuiInputBase-root": { height: 60 }, input: { border: "none" }, gridColumn: "span 10" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="password"
                label="Mật khẩu cũ"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.oldPassword}
                name="oldPassword"
                error={!!touched.oldPassword && !!errors.oldPassword}
                helperText={touched.oldPassword && errors.oldPassword}
                sx={{ "& .MuiInputBase-root": { height: 60 }, input: { border: "none" }, gridColumn: "span 10" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="password"
                label="Mật khẩu mới"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.newPassword}
                name="newPassword"
                error={!!touched.newPassword && !!errors.newPassword}
                helperText={touched.newPassword && errors.newPassword}
                sx={{ "& .MuiInputBase-root": { height: 60 }, input: { border: "none" }, gridColumn: "span 10" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="password"
                label="Xác nhận mật khẩu mới"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.confirmPassword}
                name="confirmPassword"
                error={!!touched.confirmPassword && (!!errors.confirmPassword || values.newPassword != values.confirmPassword)}
                helperText={touched.confirmPassword && (errors.confirmPassword || (values.newPassword != values.confirmPassword && "Xác nhận mật khẩu không đúng"))}
                sx={{ "& .MuiInputBase-root": { height: 60 }, input: { border: "none" }, gridColumn: "span 10" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px" >
              <Button
                type="submit" color="secondary" variant="contained" startIcon={<SaveAsIcon />}>
                Lưu
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </div>
  );
};

const checkoutSchema = yup.object().shape({
  oldPassword: yup.string().required("Bạn chưa điền thông tin").min(5, "Mật khẩu có ít nhất 5 ký tự"),
  newPassword: yup.string().required("Bạn chưa điền thông tin").min(5, "Mật khẩu có ít nhất 5 ký tự"),
  confirmPassword: yup.string().required("Bạn chưa điền thông tin").min(5, "Mật khẩu có ít nhất 5 ký tự")
});

export default ChangePasswordPage;