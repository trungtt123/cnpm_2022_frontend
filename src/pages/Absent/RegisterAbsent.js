import { Box, Button, TextField, Typography, Dialog, DialogTitle, DialogContent, IconButton } from "@mui/material";
import { tokens } from "../../theme";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import SaveAsIcon from '@mui/icons-material/SaveAs';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import { useEffect, useState, } from "react";
import { useDispatch } from "react-redux";
import { fetchAllAbsents } from "../../Redux/absentSlice";
import CloseIcon from '@mui/icons-material/Close';
import absentService from "../../Services/API/absentService";
import { DesktopDatePicker, LocalizationProvider,} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const RegisterAbsent = ({ openPopup, setOpenPopup }) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [date, setDate] = useState(dayjs(new Date()));
  const dispatch = useDispatch();
  const handleFormSubmit = (values) => {
    absentService.postAbsent({
      maNhanKhau: values.maNhanKhau,
      thoiHan: date,
      lyDo: values.lyDo,
    }).then(mes => {
      alert(mes.message);
      setOpenPopup(!openPopup);
      dispatch(fetchAllAbsents());
    })
  };
  const handleOnChange = (newValue) => {
    setDate(newValue);
  }
  const initialValues = {
    maNhanKhau: "",
    lyDo: "",
  };
  return (
    <Dialog open={openPopup} maxWidth="md" style={{ backgroundColor: "transparent" }}
      sx={{
      }}>
      <DialogTitle>
        <div style={{ display: 'flex' }}>
          <Typography variant="h6" component="div" style={{ flexGrow: 1, fontSize: 20, fontWeight: "bold" }}>
            {"ĐĂNG KÝ TẠM VẮNG"}
          </Typography>
          <IconButton aria-label="close" onClick={() => {
            setOpenPopup(!openPopup)
          }}>
            <CloseIcon></CloseIcon>
          </IconButton>
        </div>
      </DialogTitle>
      <DialogContent dividers>
        <Box m="20px">
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
                    "& > div": { gridColumn: isNonMobile ? undefined : "span 2" },
                  }}
                >
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Mã nhân khẩu"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.maNhanKhau}
                    name="maNhanKhau"
                    error={!!touched.maNhanKhau && !!errors.maNhanKhau}
                    helperText={touched.maNhanKhau && errors.maNhanKhau}
                    sx={{ "& .MuiInputBase-root": { height: 60 }, input: { border: "none" }, gridColumn: "span 2" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Lý do"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.lyDo}
                    name="lyDo"
                    error={!!touched.lyDo && !!errors.lyDo}
                    helperText={touched.lyDo && errors.lyDo}
                    sx={{ "& .MuiInputBase-root": { height: 60 }, input: { border: "none" }, gridColumn: "span 4" }}
                  />
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DesktopDatePicker label="Date desktop"
                    inputFormat="MM/DD/YYYY"
                    onChange={handleOnChange}
                    value={date}
                    renderInput={(params) => <TextField {...params} />}>

                  </DesktopDatePicker>
                  </LocalizationProvider>
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
        </Box>
      </DialogContent>
    </Dialog>

  );
};

const idRegEXp = /^\d+$/;

const checkoutSchema = yup.object().shape({
  maNhanKhau: yup.string().matches(idRegEXp, "Mã nhân khẩu không hợp lệ").required("Bạn chưa điền thông tin"),
  lyDo: yup.string().required("Bạn chưa điền thông tin"),
});

export default RegisterAbsent;


