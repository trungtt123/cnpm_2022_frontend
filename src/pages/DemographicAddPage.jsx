import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../components/Header";

const DemographicAddPage = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");

    const handleFormSubmit = (values) => {
        console.log(values);
    };


    return (
        <Box m="20px">
            <Header title="Tạo nhân khẩu khẩu" />

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
                                label="Mã nhân khẩu"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.maNhanKhau}
                                name="maNhanKhau"
                                error={!!touched.maNhanKhau && !!errors.maNhanKhau}
                                helperText={touched.maNhanKhau && errors.maNhanKhau}
                                sx={{ gridColumn: "span 2" }}
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Họ tên"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.hoTen}
                                name="hoTen"
                                error={!!touched.hoTen && !!errors.hoTen}
                                helperText={touched.hoTen && errors.hoTen}
                                sx={{ gridColumn: "span 2" }}
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Căn cước công dân"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.canCuocCongDan}
                                name="canCuocCongDan"
                                error={!!touched.canCuocCongDan && !!errors.canCuocCongDan}
                                helperText={touched.canCuocCongDan && errors.canCuocCongDan}
                                sx={{ gridColumn: "span 2" }}
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                type="date"
                                label="Ngày Sinh"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.ngaySinh}
                                name="ngaySinh"
                                error={!!touched.ngaySinh && !!errors.ngaySinh}
                                helperText={touched.ngaySinh && errors.ngaySinh}
                                sx={{ gridColumn: "span 2" }}
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Nơi sinh"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.noiSinh}
                                name="noiSinh"
                                error={!!touched.noiSinh && !!errors.noiSinh}
                                helperText={touched.noiSinh && errors.noiSinh}
                                sx={{ gridColumn: "span 2" }}
                            />

                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Dân tộc"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.danToc}
                                name="danToc"
                                error={!!touched.danToc && !!errors.danToc}
                                helperText={touched.danToc && errors.danToc}
                                sx={{ gridColumn: "span 2" }}
                            />

                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Nghề nghiệp"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.ngheNghiep}
                                name="ngheNghiep"
                                error={!!touched.ngheNghiep && !!errors.ngheNghiep}
                                helperText={touched.ngheNghiep && errors.ngheNghiep}
                                sx={{ gridColumn: "span 2" }}
                            />

                            <TextField
                                fullWidth
                                variant="filled"
                                type="Number"
                                label="Trạng thái"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.trangThai}
                                name="trangThai"
                                error={!!touched.trangThai && !!errors.trangThai}
                                helperText={touched.trangThai && errors.trangThai}
                                sx={{ gridColumn: "span 2" }}
                            />

                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Quan hệ"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.quanHe}
                                name="quanHe"
                                error={!!touched.quanHe && !!errors.quanHe}
                                helperText={touched.quanHe && errors.quanHe}
                                sx={{ gridColumn: "span 2" }}
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
                                // error={!!touched.ghiChu && !!errors.ghiChu}
                                helperText={touched.ghiChu && errors.ghiChu}
                                sx={{ gridColumn: "span 2" }}
                            />

                        </Box>
                        <Box display="flex" justifyContent="end" mt="20px">
                            <Button type="submit" color="secondary" variant="contained">
                                Tạo nhân khẩu mới
                            </Button>
                        </Box>
                    </form>
                )}
            </Formik>
        </Box>
    );
};

const checkoutSchema = yup.object().shape({
    maNhanKhau: yup.string().required("required"),
    hoTen: yup.string().required("required"),
    canCuocCongDan: yup.string().required("required"),
    ngaySinh: yup.date().required("required"),
    noiSinh: yup.string().required("required"),
    danToc: yup.string().required("required"),
    ngheNghiep: yup.string().required("required"),
    trangThai: yup.number().required("required"),
    quanHe: yup.string().required("required"),
//ghiChu: yup.string().required("required")
});
const initialValues = {
    maNhanKhau: "",
    hoTen: "",
    canCuocCongDan: "",
    ngaySinh: new Date(),
    noiSinh: "",
    danToc: "",
    ngheNghiep: "",
    trangThai: new Number,
    quanHe: "",
    ghiChu: ""
};

export default DemographicAddPage;

