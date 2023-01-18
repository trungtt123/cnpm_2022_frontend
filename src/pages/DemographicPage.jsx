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
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import detailroomSlice from "../Redux/detailRoomSlice";
import { isDetailVisibleSelector } from "../Redux/selector";
import { mockDataDemographic } from "../Services/MOCK/demographicdata";

const DemographicPage = () => {

  const dispatch = useDispatch();

  const theme = useTheme();
  const isDetailVisible = useSelector (isDetailVisibleSelector)
  const colors = tokens(theme.palette.mode);
//   const handleDetail = () => {
//     dispatch (detailroomSlice.actions.isDetailVisibleChange())
//     console.log (isDetailVisible)
//   } 
  const columns = useMemo ( () => [
    { field: "maNhanKhau", 
      headerName: "Mã nhân khẩu", 
      flex: 0.5 
    },
    { field: "hoTen",
      headerName: "Họ tên" ,
      flex: 0.75,
    },
    {
      field: "canCuocCongDan",
      headerName: "Căn cước công dân",
      type: 'string',
      flex: 0.75,
    },
    {
      field: "ngaySinh",
      headerName: "Ngày Sinh",
      flex: 1,
      type: 'date',
      headerAlign: "left",
      align: "left",
    },
    {
      field: "danToc",
      headerName: "Dân tộc",
      flex: 0.5,
    },
    {
        field: "trangThai",
        headerName: "Trạng Thái",
        type: 'number',
        flex: 0.5,
        align: 'left',
      },
    
  ]);

  return (
    <Box m="20px">
      <Header
        title="Quản lý Nhân khẩu"
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
          getRowId={(row) => row.maNhanKhau}
          rows={mockDataDemographic}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default DemographicPage;