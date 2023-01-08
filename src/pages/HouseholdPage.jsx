import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../theme";
import { mockDataHousehold } from "../Services/MOCK/householddata";
import Header from "../components/Header";
import { useTheme } from "@mui/material";
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Link } from "react-router-dom";
import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import detailroomSlice from "../Redux/detailRoomSlice";
import { isDetailVisibleSelector } from "../Redux/selector";

const HouseholdPage = () => {

  const dispatch = useDispatch();

  const theme = useTheme();
  const isDetailVisible = useSelector (isDetailVisibleSelector)
  const colors = tokens(theme.palette.mode);
  const handleDetail = () => {
    dispatch (detailroomSlice.actions.isDetailVisibleChange())
    console.log (isDetailVisible)
  }  
  

  const columns = useMemo ( () => [
    { field: "maho", 
      headerName: "Mã hộ", 
      flex: 0.5 
    },
    { field: "sothanhvien",
      headerName: "Số thành viên" ,
      flex: 0.5,
    },
    {
      field: "diachi",
      headerName: "Địa chỉ thường chú",
      flex: 1,
    },
    {
      field: "noicap",
      headerName: "Nơi cấp",
      flex: 1,
      type: 'number',
      headerAlign: "left",
      align: "left",
    },
    {
      field: "ngaycap",
      headerName: "Ngày cấp",
      flex: 0.5,
    },
    {
      field: "put",
      headerName: "",
      flex: 0.25,
      align: "center",
      renderCell: (param) =>
      <div>
        <TrackChangesIcon onClick = {() => console.log(param.row.maho)}/>
      </div>
    },
    {
      field: "delete",
      headerName: "",
      flex: 0.25,
      align: "center",
      renderCell: () =>
      <div>
       <DeleteIcon />
      </div>
    },
    {
      field: "details",
      headerName: "",
      flex: 0.25,
      align: "center",
      renderCell: () =>
      <div>
        <VisibilityIcon onClick= {handleDetail}/>
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
          getRowId={(row) => row.maho}
          rows={mockDataHousehold}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          //onRowClick={(e) =>console.log(e.id)}
        />
      </Box>
    </Box>
  );
};

export default HouseholdPage;