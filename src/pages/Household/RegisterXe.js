import { Box, Button, TextField, Typography, Dialog, DialogTitle, DialogContent, IconButton, MenuItem } from "@mui/material";
import { tokens } from "../../theme";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import SaveAsIcon from '@mui/icons-material/SaveAs';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchAllDemographic } from "../../Redux/demographicSlice";
import CloseIcon from '@mui/icons-material/Close';
import demographicService from "../../Services/API/demographicService";
import { DesktopDatePicker, LocalizationProvider, } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import roomService from "../../Services/API/roomService";
import householdService from "../../Services/API/householdService";
import { LIST_LOAI_XE } from "../../Services/Utils/const";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const RegisterXe = ({ maHoKhau, onClose, onSuccess }) => {
    console.log('maHoKhau', maHoKhau);
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const dispatch = useDispatch();
    const [date, setDate] = useState(dayjs(new Date()));

    const handleFormSubmit = (values) => {
        if(window.confirm("Bạn chắc chắn muốn lưu?") == true) {
            householdService.addXeToHouseHold({
                tenXe: values.tenXe,
                bienKiemSoat: values.bienKiemSoat,
                maLoaiXe: values.maLoaiXe,
                maHoKhau: maHoKhau,
                moTa: values.moTa
            }).then(result => {
                toast(result.message);
                onClose && onClose();
                onSuccess && onSuccess();
            }).catch(e => {
                console.log(e);
                toast(e?.response?.data?.reason ?? e?.response?.data?.message ?? 'Có lỗi xảy ra')
            });
        }
    };
    const initialValues = {
        tenXe: "",
        bienKiemSoat: "",
        maLoaiXe: "LX001",
        moTa: ""
    };
    return (
        <Dialog open={true} maxWidth="md" style={{ backgroundColor: "transparent" }}
            sx={{
            }}>
            <DialogTitle>
                <div style={{ display: 'flex' }}>
                    <Typography variant="h6" component="div" style={{ flexGrow: 1, fontSize: 20, fontWeight: "bold" }}>
                        {"THÊM XE"}
                    </Typography>
                    <IconButton aria-label="close" onClick={() => onClose && onClose()}>
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
                                        "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                                        width: 500
                                    }}
                                >
                                    <TextField
                                        fullWidth
                                        variant="filled"
                                        type="text"
                                        label="Tên xe"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.tenXe}
                                        name="tenXe"
                                        error={!!touched.tenXe && !!errors.tenXe}
                                        helperText={touched.tenXe && errors.tenXe}
                                        sx={{ "& .MuiInputBase-root": { height: 60 }, input: { border: "none" }, gridColumn: "span 4" }}
                                    />
                                    <TextField
                                        fullWidth
                                        variant="filled"
                                        type="text"
                                        label="Biển kiểm soát"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.bienKiemSoat}
                                        name="bienKiemSoat"
                                        error={!!touched.bienKiemSoat && !!errors.bienKiemSoat}
                                        helperText={touched.bienKiemSoat && errors.bienKiemSoat}
                                        sx={{ "& .MuiInputBase-root": { height: 60 }, input: { border: "none" }, gridColumn: "span 4" }}
                                    />
                                    <TextField
                                        variant="filled"
                                        select
                                        label="Loại xe"
                                        onBlur={handleBlur}
                                        name="maLoaiXe"
                                        onChange={handleChange}
                                        defaultValue={values.maLoaiXe}
                                        sx={{ "& .MuiInputBase-root": { height: 60 }, input: { border: "none" }, gridColumn: "span 4" }}>
                                        {LIST_LOAI_XE.map((loaiXe, index) => {
                                            return <MenuItem key={index} value={loaiXe.id}>{loaiXe.label}</MenuItem>
                                        })}
                                    </TextField>
                                    <TextField
                                        fullWidth
                                        variant="filled"
                                        type="text"
                                        label="Mô tả"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.moTa}
                                        name="moTa"
                                        error={!!touched.moTa && !!errors.moTa}
                                        helperText={touched.moTa && errors.moTa}
                                        sx={{ "& .MuiInputBase-root": { height: 60 }, input: { border: "none" }, gridColumn: "span 4" }}
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
                </Box>
                {/* <ToastContainer /> */}
            </DialogContent>
        </Dialog>

    );
};

const phoneRegExp =
    /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
    tenXe: yup.string().required("Bạn chưa điền thông tin"),
    bienKiemSoat: yup.string().required("Bạn chưa điền thông tin"),
    maLoaiXe: yup.string().required("Bạn chưa chọn thông tin loại xe")
});

export default RegisterXe;


