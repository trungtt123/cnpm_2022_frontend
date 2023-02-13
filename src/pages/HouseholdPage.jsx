import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../theme";
import { mockDataHousehold } from "../Services/MOCK/householddata";
import Header from "../components/Header";
import { useTheme } from "@mui/material";
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Link, Redirect } from "react-router-dom";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import detailroomSlice from "../Redux/detailRoomSlice";
import { isDetailVisibleSelector, isSelectedIdSelector } from "../Redux/selector";
import { deleteHouseHold } from "../Services/API/householdService";
import axios from "../setups/custom_axios";

const HouseholdPage = () => {

  const dispatch = useDispatch();

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const handleDetail = () => {
    dispatch(detailroomSlice.actions.isDetailVisibleChange())
  }
  const handleSelectedId = (Id) => {
    dispatch(detailroomSlice.actions.isSelectedIdChange(Id));
  }

  const [dataHouseHold, setDataHouseHold] = useState([]);
  const [isDelete, setIsDelete] = useState(false);

  useEffect(
    async () => {
      try {
        const response = await axios.get(`/ho-khau/danh-sach-ho-khau`);
        setDataHouseHold(() => response.data);
      } catch (error) {
        console.log(error);
      }

      return
    }, [isDelete])


  const columns = useMemo(() => [
    {
      field: "maHoKhau",
      headerName: "Mã hộ",
      flex: 0.5
    },
    {
      field: "soThanhVien",
      headerName: "Số thành viên",
      flex: 0.5,
    },
    {
      field: "diaChi",
      headerName: "Địa chỉ thường chú",
      flex: 1,
    },
    {
      field: "noiCap",
      headerName: "Nơi cấp",
      flex: 1,
      type: 'number',
      headerAlign: "left",
      align: "left",
    },
    {
      field: "ngayCap",
      headerName: "Ngày cấp",
      flex: 0.5,
      type: 'date'
    },
    {
      field: "put",
      headerName: "",
      flex: 0.25,
      align: "center",
      renderCell: (param) =>
      {
        const link = param.row.maHoKhau + "/edit";
        return <Link to = {link}><TrackChangesIcon /> </Link>
      }
    },
    {
      field: "delete",
      headerName: "",
      flex: 0.25,
      align: "center",
      renderCell: (param) =>
        <div>
          <DeleteIcon onClick={() => {
            deleteHouseHold(param.row.maHoKhau);
            setIsDelete (!isDelete);
            console.log()
          }
          } />
        </div>
    },
    /// 
    {
      field: "details",
      headerName: "",
      flex: 0.25,
      align: "center",
      renderCell: (param) =>
        <div>
          <VisibilityIcon onClick={() => {
            handleSelectedId(param.row.maHoKhau);
            handleDetail();
          }} />
        </div>
    }
  ]);

  return (
    <Box m="20px">
      <Header
        title="Quản lý hộ khẩu"
      />
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
        }}
      >
        <DataGrid
          getRowId={(row) => row.maHoKhau}
          // response.data
          rows={dataHouseHold}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default HouseholdPage;