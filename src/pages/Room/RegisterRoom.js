import { Box, Button, TextField, Typography, Dialog, DialogTitle, DialogContent, IconButton } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import SaveAsIcon from '@mui/icons-material/SaveAs';
import CloseIcon from '@mui/icons-material/Close';
import roomService from "../../Services/API/roomService";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const RegisterRoom = ({ openPopup, setOpenPopup, onSuccess }) => {

    const isNonMobile = useMediaQuery("(min-width:600px)");

    const handleFormSubmit = (values) => {
        if (window.confirm("Bạn chắc chắn muốn lưu?") == true) {
            roomService.addRoom({
                tenCanHo: values.tenCanHo,
                tang: values.tang,
                dienTich: +values.dienTich,
                moTa: values.moTa
            }).then(mes => {
                toast(mes.message);
                setOpenPopup(!openPopup);
                onSuccess && onSuccess();
            }).catch(e => {
                console.log("Lỗi");
                toast(e?.response?.data?.message ?? "Có lỗi xảy ra");
            });
        }
    };
    const initialValues = {
        tenCanHo: "",
        tang: "",
        dienTich: "",
        maHoKhau: "",
        moTa: "",
    };
    return (
        <Dialog open={openPopup} maxWidth="md" style={{ backgroundColor: "transparent" }}
            sx={{
            }}>
            <DialogTitle>
                <div style={{ display: 'flex' }}>
                    <Typography variant="h6" component="div" style={{ flexGrow: 1, fontSize: 20, fontWeight: "bold" }}>
                        {"THÊM CĂN HỘ"}
                    </Typography>
                    <IconButton aria-label="close" onClick={() => {
                        setOpenPopup(!openPopup);
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
                                        width: 500
                                    }}
                                >
                                    <TextField
                                        fullWidth
                                        variant="filled"
                                        type="text"
                                        label="Tên căn hộ"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.tenCanHo}
                                        name="tenCanHo"
                                        error={!!touched.tenCanHo && !!errors.tenCanHo}
                                        helperText={touched.tenCanHo && errors.tenCanHo}
                                        sx={{ "& .MuiInputBase-root": { height: 60 }, input: { border: "none" }, gridColumn: "span 4" }}
                                    />
                                    <TextField
                                        fullWidth
                                        variant="filled"
                                        type="text"
                                        label="Tầng"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.tang}
                                        name="tang"
                                        error={!!touched.tang && !!errors.tang}
                                        helperText={touched.tang && errors.tang}
                                        sx={{ "& .MuiInputBase-root": { height: 60 }, input: { border: "none" }, gridColumn: "span 4" }}
                                    />
                                    <TextField
                                        fullWidth
                                        variant="filled"
                                        type="number"
                                        label="Diện tích"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.dienTich}
                                        name="dienTich"
                                        error={!!touched.dienTich && !!errors.dienTich}
                                        helperText={touched.dienTich && errors.dienTich}
                                        sx={{ "& .MuiInputBase-root": { height: 60 }, input: { border: "none" }, gridColumn: "span 4" }}
                                    />
                                    {/* <TextField
                                        fullWidth
                                        variant="filled"
                                        type="text"
                                        label="Mã hộ khẩu"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.ngheNghiep}
                                        name="ngheNghiep"
                                        error={!!touched.ngheNghiep && !!errors.ngheNghiep}
                                        helperText={touched.ngheNghiep && errors.ngheNghiep}
                                        sx={{ "& .MuiInputBase-root": { height: 60 }, input: { border: "none" }, gridColumn: "span 2" }}
                                    /> */}
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
            </DialogContent>
        </Dialog>

    );
};

const checkoutSchema = yup.object().shape({
    tenCanHo: yup.string().required("Bạn chưa điền thông tin"),
    tang: yup.string().required("Bạn chưa điền thông tin"),
    dienTich: yup.number().required("Bạn chưa điền thông tin").min(0, "Diện tích không hợp lệ").max(1000, "Diện tích không hợp lệ")
});

export default RegisterRoom;


