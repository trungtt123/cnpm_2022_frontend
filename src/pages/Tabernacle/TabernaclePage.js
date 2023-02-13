import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import ManageAccountsRoundedIcon from '@mui/icons-material/ManageAccountsRounded';
import Button from '@mui/material/Button';
import { fetchAllTabernacles } from "../../Redux/tabernacleSlice";
import { useEffect, useMemo, useState } from "react";
import { Triangle } from "react-loader-spinner";
import { useSelector, useDispatch } from "react-redux";
import RegisterTabernacle from "./RegisterTabernacle";
import EditTabernacle from "./EditTabernacle";
import tabernacleService from "../../Services/API/tabernacleService";

const TabernaclePage = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch();
  const [openPopup, setOpenPopup] = useState(false);
  const [openInPopup, setOpenInPopup] = useState(false);
  const { tabernacleList, isLoading } = useSelector((state) => state.tabernacle);
  const [data, setData] = useState([]);

  const EditButton = ({ maTamTru, openInPopup, setOpenInPopup }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
  
    return (
        <Button onClick={() => {
          tabernacleService.getTabernacle(maTamTru).then(mes => {
            setData(mes.data);
            setOpenInPopup(!openInPopup);
          });
        }}
          startIcon={<ManageAccountsRoundedIcon />}
          variant="contained"
          style={{ backgroundColor: colors.greenAccent[700], border: "none" }}>Chi tiết
        </Button>
    );
  }
  useEffect(() => {
    /*dispatch(resetTabernacleSlice());*/
    if (!isLoading) {
      dispatch(fetchAllTabernacles());
    }

  }, []);
  useEffect(() => {
  }, [tabernacleList]);
  const columns = useMemo(() => [
    { field: "maTamTru", headerName: "Mã tạm trú", flex: 0.5 },
    {
      field: "hoTen",
      headerName: "Họ và tên",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "diaChiThuongTru",
      headerName: "Địa chỉ thường trú",
      flex: 1,
    },
    {
      field: "diaChiTamTru",
      headerName: "Địa chỉ tạm trú",
      flex: 1,
    },
    {
      field: "canCuocCongDan",
      headerName: "Căn cước công dân",
      flex: 1,
    },
    {
      field: "chiTiet",
      headerName: "",
      flex: 1,
      renderCell: (param) => <EditButton maTamTru={param.row.maTamTru} openInPopup={openInPopup} setOpenInPopup={setOpenInPopup}/>,
    }
  ]);
  return (
    <Box m="20px">
      <Header
        title="DANH SÁCH TẠM TRÚ"
      />
      <Button onClick={()=>{
        setOpenPopup(!openPopup);}}
        color="secondary" variant="contained" style={{ fontWeight: "bold" }}>
        Đăng ký tạm trú</Button>
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
        <RegisterTabernacle openPopup={openPopup} setOpenPopup={setOpenPopup}>
        </RegisterTabernacle>
        <EditTabernacle openInPopup={openInPopup} setOpenInPopup={setOpenInPopup} data={data}>
        </EditTabernacle>
        {isLoading ? (
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
            getRowId={(r) => r.maTamTru}
            rows={tabernacleList}
            columns={columns}
            components={{ Toolbar: GridToolbar }}
          />
        )}
      </Box>
    </Box>
  );
};
export default TabernaclePage;