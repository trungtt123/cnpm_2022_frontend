import { Box, IconButton, InputAdornment, TextField } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import ManageAccountsRoundedIcon from '@mui/icons-material/ManageAccountsRounded';
import SearchIcon from '@mui/icons-material/Search';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import Button from '@mui/material/Button';
import { useEffect, useMemo, useState } from "react";
import { Triangle } from "react-loader-spinner";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllRevenue, setRevenueItem, fetchRevenueItem } from "../../Redux/revenueSlice";
import dayjs from "dayjs";
import CreateRevenue from "./CreateRevenue";
import EditRevenue from "./EditRevenue";
import revenueService from "../../Services/API/revenueService";
import { Link } from "react-router-dom";

const RevenueHouse = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const dispatch = useDispatch();
    const [searchID, setSearchID] = useState('');
    const [openPopup, setOpenPopup] = useState(false);
    const revenueHouse = useSelector((state) => state.revenue.revenueHouse);
    const isLoadingHouse = useSelector((state) => state.revenue.isLoadingHouse);

    const [data, setData] = useState([]);

    useEffect(() => {
    }, [revenueHouse, isLoadingHouse, searchID]);
    const columns = useMemo(() => [
        { field: "maKhoanThu", headerName: "Mã khoản thu", flex: 0.5 },
        {
            field: "tenKhoanThu",
            headerName: "Tên khoản thu",
            flex: 1,
            cellClassName: "name-column--cell",
        },
        {
            field: "soTien",
            headerName: "Số tiền cần thu",
            flex: 1,
            valueGetter: (param) => { return (param.row.soTien + " đồng") },
        },
        {
            field: "soTienDaNop",
            headerName: "Số tiền đã nộp",
            flex: 1,
            valueGetter: (param) => { return (param.row.soTienDaNop + " đồng") },
        },
        {
            field: "tinhTrang",
            headerName: "Tình trạng",
            flex: 1,
            valueGetter: (param) => {
                if (param.row.soTien == null) return ("Ủng hộ");
                return ((param.row.soTienDaNop >= param.row.soTien) ? "Đã nộp đủ" : "Còn thiếu");
            },
        },
    ]);
    return (
        <Box m="20px">
            <Header
                title="DANH SÁCH KHOẢN THU THEO HỘ"
            />
            <Button onClick={() => {
                setOpenPopup(!openPopup);
            }}
                color="secondary" variant="contained" style={{ fontWeight: "bold" }}>
                Thanh toán</Button>
            <Box
                m="40px 0 0 0"
                height="75vh"
                sx={{
                    "& .MuiDataGrid-root": {
                        border: "none",
                    },
                    "& .MuiDataGrid-cell": {
                        borderBottom: "none",
                    },
                    "& .name-column--cell": {
                        color: colors.greenAccent[300],
                    },
                    "& .MuiDataGrid-columnHeaders": {
                        backgroundColor: colors.blueAccent[700],
                        borderBottom: "none",
                    },
                    "& .MuiDataGrid-virtualScroller": {
                        backgroundColor: colors.primary[400],
                    },
                    "& .MuiDataGrid-footerContainer": {
                        borderTop: "none",
                        backgroundColor: colors.blueAccent[700],
                    },
                    "& .MuiCheckbox-root": {
                        color: `${colors.greenAccent[200]} !important`,
                    },
                    "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                        color: `${colors.grey[100]} !important`,
                    },
                    "& .MuiTablePagination-root": {
                        color: `${colors.grey[100]} !important`,
                    },
                    "& .MuiTablePagination-displayedRows, .MuiTablePagination-selectLabel": {
                        "margin-top": "1em",
                        "margin-bottom": "1em"
                    }

                }}
            >

                {isLoadingHouse ? (
                    <div className="loading-container d-flex flex-column align-items-center ustify-content-center">
                        <Triangle
                            height="100"
                            width="100"
                            color="#1877f2"
                            ariaLabel="loading"
                        />
                        <div>Loading data...</div>
                    </div>
                ) : (
                    <DataGrid
                        getRowId={(r) => r.maKhoanThu}
                        rows={revenueHouse}
                        columns={columns}
                        components={{ Toolbar: GridToolbar }}
                    />
                )}
            </Box>
        </Box>
    );
};
export default RevenueHouse;