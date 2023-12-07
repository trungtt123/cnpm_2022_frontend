import { Box, Button, Typography, Dialog, DialogTitle, DialogContent, IconButton } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import axios from "../../setups/custom_axios";
import { DataGrid, GridEditInputCell } from "@mui/x-data-grid";
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import CloseIcon from '@mui/icons-material/Close';
import SaveAsIcon from '@mui/icons-material/SaveAs';

const StyledBox = styled(Box)(({ theme }) => ({
  height: 400,
  width: '100%',
  '& .MuiDataGrid-cell--editable': {
    // backgroundColor: theme.palette.mode === 'dark' ? '#fff' : 'rgb(217 243 190)',
    '& .MuiInputBase-root': {
      height: '100%',
    },
  },
  '& .Mui-error': {
    backgroundColor: `rgb(126,10,15, ${theme.palette.mode === 'dark' ? 0 : 0.1})`,
    color: theme.palette.mode === 'dark' ? '#ff4343' : '#750f0f',
  },
}));

let promiseTimeout;


const StyledTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.error.contrastText,
  },
}));

function NameEditInputCell(props) {
  const { error } = props;
  return (
    <StyledTooltip open={!!error} title={"Số tiền không hợp lệ"}>
      <GridEditInputCell {...props} />
    </StyledTooltip>
  );
}

function renderEditName(params) {
  return <NameEditInputCell {...params} />;
}
const CreateListRevenue = ({ openModal, setOpenModal, dataHouseHold, setDataHouseHold }) => {
  const preProcessEditCellProps = async (params) => {
    const hasError = params.props.value === null || params.props.value < 0;
    return { ...params.props, error: hasError };
  };

  useEffect(
    async () => {
      try {
        const response = await axios.get(`/ho-khau/danh-sach-ho-khau`);
        console.log(response);
        var list = response.data.map((value, index) => {
          return { id: index.toString(), maHoKhau: value.maHoKhau, dien: 0, nuoc: 0, internet: 0 };
        });
        setDataHouseHold(() => list);
        console.log(list);
      } catch (error) {
        console.log(error);
      }

      return
    }, []);
    const checkData = () => {
      console.log(dataHouseHold);
      let hasError = true;
      for (const item of dataHouseHold){
        if (item?.nuoc < 0 || item?.nuoc === null) hasError = false;
        if (item?.dien < 0 || item?.dien === null) hasError = false;
        if (item?.internet < 0 || item?.internet === null) hasError = false;
        if (!hasError) return false;
      }
      return true;
    }
  const columns = useMemo(() => [
    { field: "maHoKhau", headerName: "Mã hộ khẩu", flex: 0.5 },
    {
      field: "dien",
      headerName: "Tiền điện",
      flex: 1,
      type: "number",
      preProcessEditCellProps,    
      editable: true,
      
      renderEditCell: renderEditName,
    },
    {
      field: "nuoc",
      headerName: "Tiền nước",
      flex: 1,
      type: "number",
      preProcessEditCellProps,    
      editable: true,
      renderEditCell: renderEditName,
    },
    {
      field: "internet",
      headerName: "Tiền internet",
      flex: 1,
      type: "number",
      preProcessEditCellProps,   
      editable: true,
      renderEditCell: renderEditName,
    },
  ]);

  const processRowUpdate = (newRow) => {
    console.log(newRow);
    setDataHouseHold(dataHouseHold.map((item) => (item.id === newRow.id ? newRow : item)));
    return newRow;
  };

  const handleProcessRowUpdateError = (error) => {
    console.log({ children: error.message, severity: 'error' });
  }
  useEffect(() => {
    return () => {
      clearTimeout(promiseTimeout);
    };
  }, []);

  return <Dialog open={openModal} maxWidth="md" style={{ backgroundColor: "transparent" }}>
    <DialogTitle>
      <div style={{ display: 'flex' }}>
        <Typography variant="h6" component="div" style={{ flexGrow: 1, fontSize: 20, fontWeight: "bold" }}>
          {"THÊM KHOẢN THU CÁC HỘ"}
        </Typography>
        <IconButton aria-label="close" onClick={() => {
          setOpenModal(!openModal)
        }}>
          <CloseIcon />
        </IconButton>
      </div>
    </DialogTitle>
    <DialogContent dividers>
      <Box m="20px" sx={{
        height: '50vh', width: 700,
        "& .MuiTablePagination-displayedRows, .MuiTablePagination-selectLabel": {
          "margin-top": "1em",
          "margin-bottom": "1em"
        }
      }}>
        <StyledBox>
        <DataGrid
          getRowId={(row) => row.id}
          rows={dataHouseHold}
          columns={columns}
          processRowUpdate={processRowUpdate}
          onProcessRowUpdateError={handleProcessRowUpdateError}
          experimentalFeatures={{ newEditingApi: true }}
        />
        </StyledBox>
      </Box>
      <Box display="flex" justifyContent="end" mt="20px" >
        <Button color="secondary" variant="contained" startIcon={<SaveAsIcon />}
          onClick={() => {
            if(checkData() && window.confirm("Bạn chắc chắn muốn lưu?") == true) {
              setOpenModal(false);
            }
          }}>
          Lưu
        </Button>
      </Box>
    </DialogContent>
  </Dialog>;
}

export default CreateListRevenue;