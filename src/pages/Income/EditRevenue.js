import { Box, Button, TextField, Typography, useTheme, Dialog, DialogTitle, DialogContent, IconButton } from "@mui/material";
import { tokens } from "../../theme";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import SaveAsIcon from '@mui/icons-material/SaveAs';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchAllRevenue } from "../../Redux/revenueSlice";
import CloseIcon from '@mui/icons-material/Close';
import revenueService from "../../Services/API/revenueService";
import { DesktopDatePicker, LocalizationProvider, } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const EditRevenue = ({ openInPopup, setOpenInPopup, data }) => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const colors = tokens(theme.palette.mode);
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const [newDateStart, setNewDateStart] = useState(dayjs(data.thoiGianBatDau));
    const [newDateEnd, setNewDateEnd] = useState(dayjs(data.thoiGianKetThuc));
    const handleFormSubmit = (values) => {
        revenueService.putRevenue(data.maKhoanThu, {
            tenKhoanThu: values.tenKhoanThu,
            ghiChu: values.ghiChu,
            thoiGianBatDau: newDateStart,
            thoiGianKetThuc: newDateEnd,
            version: data.version
        }).then(mes => {
            alert(mes.message);
            dispatch(fetchAllRevenue());
            setOpenInPopup(!openInPopup);
        });
    };


    useEffect(() => {
        console.log(data.thoiGianBatDau);
        setNewDateStart(data.thoiGianBatDau);
    }, [data.thoiGianBatDau]);
    useEffect(() => {
        console.log(data.thoiGianKetThuc);
        setNewDateEnd(data.thoiGianKetThuc);
    }, [data.thoiGianKetThuc]);

    const initialValues = {
        maKhoanThu: data.maKhoanThu,
        tenKhoanThu: data.tenKhoanThu,
        loaiKhoanThu: data.loaiKhoanThu,
        ghiChu: data.ghiChu,
        thoiGianBatDau: dayjs(data.thoiGianBatDau),
        thoiGianBatDau: dayjs(data.thoiGianKetThuc),
        tongCanThu: data.tongCanThu,
        tongDaThu: data.tongDaThu
    };

    return (
        <Dialog open={openInPopup} maxWidth="md" style={{ backgroundColor: "transparent" }}>
            <DialogTitle>
                <div style={{ display: 'flex' }}>
                    <Typography variant="h6" component="div" style={{ flexGrow: 1, fontSize: 20, fontWeight: "bold" }}>
                        {"Thông tin chi tiết"}
                    </Typography>
                    <IconButton aria-label="close" onClick={() => {
                        setOpenInPopup(!openInPopup)
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
                                        "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                                    }}
                                >
                                    <TextField
                                        fullWidth
                                        variant="filled"
                                        label="Mã khoản thu"
                                        name="maKhoanThu"
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                        defaultValue={initialValues.maKhoanThu}
                                        sx={{ "& .MuiInputBase-root": { height: 60 }, input: { border: "none" }, gridColumn: "span 2" }}
                                    />
                                    <TextField
                                        fullWidth
                                        variant="filled"
                                        type="text"
                                        label="Tên khoản thu"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.tenKhoanThu}
                                        name="tenKhoanThu"
                                        error={!!touched.tenKhoanThu && !!errors.tenKhoanThu}
                                        helperText={touched.tenKhoanThu && errors.tenKhoanThu}
                                        sx={{ "& .MuiInputBase-root": { height: 60 }, input: { border: "none" }, gridColumn: "span 2" }}
                                    />
                                    <TextField
                                        fullWidth
                                        variant="filled"
                                        type="text"
                                        label="Loại khoản thu"
                                        name="loaiKhoanThu"
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                        defaultValue={initialValues.loaiKhoanThu ? ("Thu phí") : ("Ủng hộ")}
                                        sx={{ "& .MuiInputBase-root": { height: 60 }, input: { border: "none" }, gridColumn: "span 2" }}
                                    />
                                    <TextField
                                        fullWidth
                                        variant="filled"
                                        type="text"
                                        label="Ghi chú"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.ghiChu}
                                        name="ghiChu"
                                        error={!!touched.ghiChu && !!errors.ghiChu}
                                        helperText={touched.ghiChu && errors.ghiChu}
                                        sx={{ "& .MuiInputBase-root": { height: 60 }, input: { border: "none" }, gridColumn: "span 4" }}
                                    />
                                    <TextField
                                        fullWidth
                                        variant="filled"
                                        label="Tổng cần thu"
                                        name="tongCanThu"
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                        defaultValue={initialValues.tongCanThu}
                                        sx={{ "& .MuiInputBase-root": { height: 60 }, input: { border: "none" }, gridColumn: "span 2" }}
                                    />
                                    <TextField
                                        fullWidth
                                        variant="filled"
                                        label="Tổng đã thu"
                                        name="tongDaThu"
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                        defaultValue={initialValues.tongDaThu}
                                        sx={{ "& .MuiInputBase-root": { height: 60 }, input: { border: "none" }, gridColumn: "span 2" }}
                                    />
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DesktopDatePicker label="Thời gian bắt đầu"
                                            inputFormat="DD/MM/YYYY"
                                            onChange={setNewDateStart}
                                            name="thoiGianBatDau"
                                            value={newDateStart}
                                            renderInput={(params) => <TextField {...params} />}>

                                        </DesktopDatePicker>
                                        <DesktopDatePicker label="Thời gian kết thúc"
                                            inputFormat="DD/MM/YYYY"
                                            onChange={setNewDateEnd}
                                            name="thoiGianKetThuc"
                                            value={newDateEnd}
                                            renderInput={(params) => <TextField {...params} />}>

                                        </DesktopDatePicker>
                                    </LocalizationProvider>
                                </Box>
                                <Box display="flex" justifyContent="end" mt="20px" >

                                    <Button onClick={() => {
                                        if (window.confirm('Bạn thật sự muốn xóa?')) {
                                            revenueService.deleteRevenue(values.maKhoanThu, data.version).then(mes => {
                                                alert(mes.message);
                                                setOpenInPopup(!openInPopup);
                                                dispatch(fetchAllRevenue());
                                            })
                                        }
                                    }}
                                        style={{ backgroundColor: colors.redAccent[600], marginRight: 10 }}
                                        variant="contained" startIcon={<DeleteSweepIcon />}>Xóa
                                    </Button>
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


const checkoutSchema = yup.object().shape({
    tenKhoanThu: yup.string().required("Bạn chưa điền thông tin"),
});

export default EditRevenue;
