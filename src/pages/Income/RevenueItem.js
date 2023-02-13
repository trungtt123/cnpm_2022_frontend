import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import ManageAccountsRoundedIcon from '@mui/icons-material/ManageAccountsRounded';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import Button from '@mui/material/Button';
import { useEffect, useMemo, useState } from "react";
import { Triangle } from "react-loader-spinner";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllRevenue, fetchAllRevenueHouse, fetchRevenueItem } from "../../Redux/revenueSlice";
import dayjs from "dayjs";
import CreateRevenue from "./CreateRevenue";
import EditRevenue from "./EditRevenue";
import revenueService from "../../Services/API/revenueService";
import PayRevenue from "./PayRevenue";
import { useHistory } from "react-router-dom";

const RevenueItem = () => {
    const theme = useTheme();
    const history = useHistory();
    const colors = tokens(theme.palette.mode);
    const dispatch = useDispatch();
    const revenueItem = useSelector((state) => state.revenue.revenueItem)
    const isLoadingItem = useSelector((state) => state.revenue.isLoadingItem);
    const idKhoanThu = useSelector((state) => state.revenue.maKhoanThu);
    const loaiKhoanThu = useSelector((state) => state.revenue.loaiKhoanThu);
    const [id, setId] = useState(0);
    const [openPopup, setOpenPopup] = useState(false);
    const [soTienCanThu, setSoTienCanThu] = useState(0);

    const PayButton = ({ maKhoanThuTheoHo, openPopup, setOpenPopup, soTienCanThu }) => {
        const theme = useTheme();
        const colors = tokens(theme.palette.mode);
    
        return (
          <Button onClick={() => {
            setId(maKhoanThuTheoHo);
            setSoTienCanThu(soTienCanThu);
            setOpenPopup(!openPopup);
          }}
            startIcon={<ManageAccountsRoundedIcon />}
            variant="contained"
            style={{ backgroundColor: colors.greenAccent[700], border: "none" }}>Thanh toán
          </Button>
        );
      }

    const columns = useMemo(() => [
        { field: "maKhoanThuTheoHo", headerName: "Mã khoản thu theo hộ", flex: 1 },
        {
            field: "maHoKhau",
            headerName: "Mã hộ khẩu",
            flex: 0.5,
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
                if (loaiKhoanThu == 0) return ("Tiền ủng hộ");
                return ((param.row.soTienDaNop >= param.row.soTien) ? "Đã nộp đủ" : ("Còn thiếu " + (param.row.soTien - param.row.soTienDaNop) + " đồng"));
            },
        },
        {
            field: "thanhToan",
            headerName: "Thanh toán",
            flex: 1,
            renderCell: (param) => {return (param.row.soTienDaNop < param.row.soTien || loaiKhoanThu === 0) && <PayButton  openPopup={openPopup} 
            soTienCanThu={param.row.soTien - param.row.soTienDaNop}
            setOpenPopup={setOpenPopup} maKhoanThuTheoHo={param.row.maKhoanThuTheoHo}/> },
          },
    ]);
      useEffect(() => {
        if (!idKhoanThu){
            history.push('/revenue');
        }
      }, [idKhoanThu]);
    return (
        <Box m="20px">
            <Header
                title="DANH SÁCH CÁC HỘ CẦN THU PHÍ"
            />
            <Box
                m="40px 0 0 0"
                height="75vh"
                sx={{
                    "& .MuiDataGrid-root": {
                        border: "none",
                    },
                    "& .MuiDataGrid-cell": {
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
                <PayRevenue openPopup={openPopup} setOpenPopup={setOpenPopup} maKhoanThuTheoHo={id} maKhoanThu ={idKhoanThu} soTienCanThu={soTienCanThu}/>
                {isLoadingItem ? (
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
                        getRowId={(r) => r.maKhoanThuTheoHo}
                        rows={revenueItem}
                        columns={columns}
                        components={{ Toolbar: GridToolbar }}
                    />
                )}
            </Box>
        </Box>
    );
};
export default RevenueItem;