import { Box, Button, TextField, Typography, Dialog, DialogTitle, DialogContent, IconButton, MenuItem } from "@mui/material";
import { tokens } from "../../theme";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import SaveAsIcon from '@mui/icons-material/SaveAs';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import { useEffect, useRef, useState, } from "react";
import { useDispatch } from "react-redux";
import { fetchAllRevenue, fetchRevenueItem, fetchAllRevenueHouse } from "../../Redux/revenueSlice";
import CloseIcon from '@mui/icons-material/Close';
import revenueService from "../../Services/API/revenueService";
import { useSelector } from "react-redux";
import { DesktopDatePicker, LocalizationProvider, } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const PayRevenue = ({ openPopup, setOpenPopup, maKhoanThuTheoHo, maKhoanThu, soTienCanThu, maHoKhau }) => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const [soTienCanTra, setSoTienCanTra] = useState(0);
    const [soTienDaNop, setSoTienDaNop] = useState(0);
    const loaiKhoanThu = useSelector((state) => state.revenue.loaiKhoanThu);
    const dispatch = useDispatch();
    const handleFormSubmit = (values) => {
        revenueService.payRevenue({
            maKhoanThuTheoHo: values.maKhoanThuTheoHo,
            tenHoaDon: values.tenHoaDon,
            soTienDaNop: (loaiKhoanThu === 1 && values.soTienDaNop > values.soTienCanThu) ? values.soTienCanThu : values.soTienDaNop
        }).then(mes => {
            alert(mes.message);
            setOpenPopup(!openPopup);
            dispatch(fetchRevenueItem(maKhoanThu));
            dispatch(fetchAllRevenueHouse(maHoKhau));
        })
    };
    const initialValues = {
        maKhoanThuTheoHo: maKhoanThuTheoHo,
        tenHoaDon: "",
        soTienDaNop: soTienDaNop,
        soTienCanThu: soTienCanThu,
    };
    return (
        <Dialog open={openPopup} maxWidth="md" style={{ backgroundColor: "transparent" }}
            sx={{
            }}>
            <DialogTitle>
                <div style={{ display: 'flex' }}>
                    <Typography variant="h6" component="div" style={{ flexGrow: 1, fontSize: 20, fontWeight: "bold" }}>
                        {"Thanh toán khoản thu"}
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
                                        label="Mã khoản thu theo hộ"
                                        name="maKhoanThuTheoHo"
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                        defaultValue={initialValues.maKhoanThuTheoHo}
                                        sx={{ "& .MuiInputBase-root": { height: 60 }, input: { border: "none" }, gridColumn: "span 2" }}
                                    />
                                    <TextField
                                        fullWidth
                                        variant="filled"
                                        type="text"
                                        label="Tên hóa đơn"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.tenHoaDon}
                                        name="tenHoaDon"
                                        error={!!touched.tenHoaDon && !!errors.tenHoaDon}
                                        helperText={touched.tenHoaDon && errors.tenHoaDon}
                                        sx={{ "& .MuiInputBase-root": { height: 60 }, input: { border: "none" }, gridColumn: "span 4" }}
                                    />
                                    <TextField
                                        variant="filled"
                                        label="Số tiền nộp"
                                        type="number"
                                        onBlur={handleBlur}
                                        name="soTienDaNop"
                                        onChange={handleChange}
                                        value={values.soTienDaNop}
                                        error={!!touched.soTienDaNop && !!errors.soTienDaNop}
                                        helperText={touched.soTienDaNop && errors.soTienDaNop}
                                        sx={{ "& .MuiInputBase-root": { height: 60 }, input: { border: "none" }, gridColumn: "span 4" }}>
                                    </TextField>
                                    {
                                        loaiKhoanThu === 1 && <TextField
                                            disabled
                                            variant="filled"
                                            type="number"
                                            label="Số tiền trả lại"
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                            value={Math.max(0, values.soTienDaNop - soTienCanThu)}
                                            sx={{ "& .MuiInputBase-root": { height: 60 }, input: { border: "none" }, gridColumn: "span 4" }}>
                                        </TextField>
                                    }
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
    tenHoaDon: yup.string().required("Bạn chưa điền thông tin"),
    soTienDaNop: yup.number().required("Bạn chưa điền thông tin").min(0, "Số tiền không hợp lệ"),

});

export default PayRevenue;


