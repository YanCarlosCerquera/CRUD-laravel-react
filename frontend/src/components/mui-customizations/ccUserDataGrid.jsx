import React, { useMemo } from "react";
import { Link } from "react-router-dom";

import { DataGrid, gridClasses } from "@mui/x-data-grid";
import { Box, Chip, IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";  
import { 
  ccVar1Color, 
  ccVar4Color,
  ccVar7Color,
  ccVar2Color,
  ccBgVar1Color,
  ccLargeFontColor,
} from 'components/mui-customizations/styleCustomization';
import 'components/mui-customizations/muiStyling.css';

import debounce from "lodash/debounce";

import { swalLoginRegisterAlert } from "components/swal-customizations/styleCustomization";

import { useError } from "errors/errorHook";
import axiosInstance from "plugins/axiosInstance";
import wordsUpperCase from "utilities/wordsUpperCase";


// Debounce prevent 'Too many attempts...' of quick page clicking/searching/sorting
// const debounce = (func, wait) => {
//   let timeout;
//   return (...args) => {
//     clearTimeout(timeout);
//     timeout = setTimeout(() => func(...args), wait);
//   };
// }

// Calculate data grid row heights
const calculateGridHeight = async (rows, selectedIds) => {
  const rowHeight = 52;
  const headerHeight = 56;
  const footerHeight = 56;
  const calculatedHeight = 
  await rows && rows.length > 0 
      ? selectedIds.length > 0 
        ? (rows.length * rowHeight) + headerHeight + footerHeight + 53 
        : (rows.length * rowHeight) + headerHeight + footerHeight 
      : 500;
  return calculatedHeight;
}

// Striped data grid styled
const StripedStyledDataGrid = styled(DataGrid)(({ theme }) => ({
  [`& .${gridClasses.row}.even`]: {
    backgroundColor: `${ccVar4Color}26`,
    "&:hover": {
      backgroundColor: `${ccVar1Color}a3`,
      "@media (hover: none)": {
        backgroundColor: ccVar1Color,
      },
    },
    "&.Mui-selected": {
      backgroundColor: ccVar1Color,
      "&:hover": {
        backgroundColor: `${ccVar1Color}a3`,
        // Reset on touch devices, it doesn't add specificity
        "@media (hover: none)": {
          backgroundColor: `${ccVar1Color}a3`,
        },
      },
    },
  },
  "& .MuiDataGrid-container--top [role=row]": {
    backgroundColor: "#009dff",
    color: "#ffffff",
    borderTopLeftRadius: "5px",
    borderTopRightRadius: "5px",
    "& .MuiDataGrid-columnHeaderTitle, & .MuiIconButton-root, & .MuiSvgIcon-root": {
      color: "#ffffff",
    },
  },
  "& .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-columnHeader:focus-within": {
    outline: "none",
  },
  "& .MuiDataGrid-row:hover": {
    backgroundColor: ccVar1Color + "a3",
  },
  "& .Mui-selected": {
    backgroundColor: ccVar1Color + "a3!important",
  },
  "& .Mui-selected:hover": {
    backgroundColor: ccVar1Color + "!important",
  },
  "& .MuiDataGrid-cell--selected": {
    backgroundColor: "red !important",
    color: "#ffffff !important",
  },
  "& .MuiDataGrid-footerContainer": {
    backgroundColor: ccVar4Color + "61",
    borderBottomLeftRadius: "5px",
    borderBottomRightRadius: "5px",
  },
}));

const CCUserDataGrid = ({
  rows,
  rowCount,
  pageSize,
  page,
  setPage,
  setPageSize,
  sortModel,
  setSortModel,
  filterModel,
  setFilterModel,
  fetchAllUsers,
  bulkSelectedIds,
  setBulkSelectedIds,
  loading,
  children,
}) => {

  const { ccGetError } = useError();

  // Use the debounce function preventing page quick clicking problems
  // Adjust debounce delay as needed
  // Handle pagination model change
  const handlePaginationModelChange = debounce((newPaginationModel) => {
    if (!loading) {
      setPage(newPaginationModel.page);
      setPageSize(newPaginationModel.pageSize);
    }
  }, 500);

  // Handle sort model change
  const handleSortModelChange = debounce((newSortModel) => {
    setSortModel(newSortModel);
  }, 500);
  
  // Handle filter model change
  const handleFilterModelChange = debounce((newFilterModel) => {
    setFilterModel(newFilterModel);
  }, 500);
  
  // Calculated grid height according rows
  const handleGridHeight = calculateGridHeight(rows, bulkSelectedIds)

  // Handle single delete
  const handleDelete = async (id) => {
    try {
      swalLoginRegisterAlert.fire({
        title: 'Are you sure?', 
        text: "You won't be able to revert this!", 
        confirmButtonText: "Yes, delete it!",
        icon: "warning",
        showCancelButton: true,
        color: ccVar7Color,
        confirmButtonColor: ccVar2Color,
        cancelButtonColor: ccVar7Color,
        background: ccBgVar1Color,
      }).then(async result => {
        if (result.isConfirmed) {
          const result = await axiosInstance.delete(`/users/${id}`);
          if(result.data.status === "success" ) {
            await fetchAllUsers();
            swalLoginRegisterAlert.fire({
              title: `Deleted ${wordsUpperCase(result.data.status)}!`, 
              text: result.data.message, 
              icon: "success",
              iconColor: ccVar2Color,
              color: ccVar7Color,
              confirmButtonColor: ccLargeFontColor,
              background: ccBgVar1Color,
              timer: 11500, // alert timer
            });
          } else {
            await ccGetError(result);
          }
        }
      });
    } catch (error) {
      await ccGetError(error);
    }
  };

  const columns = useMemo(() => [
    { field: "srl", headerName: "SR", headerAlign: 'center', align: 'center', flex: 0.25, minWidth: 50, sortable: false, filterable: false },
    { field: "id", headerName: "ID", headerAlign: 'center', align: 'center', flex: 0.25, minWidth: 50, },
    { field: "name", headerName: "Name", headerAlign: 'center', flex: 1, minWidth: 50 },
    { field: "username", headerName: "User Name", headerAlign: 'center', flex: 1, minWidth: 50 },
    { field: "email", headerName: "Email", headerAlign: 'center', flex: 1, minWidth: 50 },
    { 
      field: "roles", 
      headerName: "Role(s)", 
      headerAlign: 'center', 
      align: 'center', 
      flex: 1, 
      minWidth: 50, 
      // editable: true,
      renderCell: (params) => (
        params.value && params.value.map((role, index) => (
          role.title
        )).join(', ')
      )
    },
    { 
      field: "status", 
      headerName: "Status", 
      headerAlign: 'center', 
      align: 'center', 
      flex: 1, 
      minWidth: 50, 
      // editable: true,
      renderCell: (params) => (
        Number(params.value) === 1 ? (
          <Chip 
            label="Enable"
            size="medium"
            sx={{
              backgroundColor: ccVar2Color + 'ad' ,
              color: 'white'
            }} 
            variant="outlined" 
          />
        ) : (
          <Chip 
            label="Disable"
            size="medium"
            sx={{
              backgroundColor: ccVar7Color + 'ad',
              color: 'white'
            }} 
            variant="outlined" 
          />
        )
      )
    },
    {
      field: "actions",
      headerName: "Actions",
      headerAlign: 'center',
      align: 'center',
      flex: 1,
      minWidth: 50,
      sortable: false, 
      filterable: false,
      renderCell: (params) => (
        <>
          <IconButton
            // Third party component like react router 'Link' can be integrated to MUI button using props.
            component={Link}
            to={`/user/edit/${params.id}`}
            color="primary"
            onClick={(event) => event.stopPropagation()} 
          >
            <EditIcon />
          </IconButton>
          <IconButton
            onClick={(event) => {
              // Prevents the row from being selected
              event.stopPropagation(); 
              handleDelete(params.id);
            }}
            color="secondary"
          >
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ], [loading]);

  return (
    <>
      <Box 
        height={handleGridHeight}
        width="100%"
        sx={{transition: 'height 0.2s ease'}}
      >
        {children}
        <StripedStyledDataGrid
          rows={rows}
          columns={columns}
          rowCount={rowCount}
          pageSize={pageSize}
          pageSizeOptions={[5, 10, 15, 20, 100, 150]}
          pagination
          paginationMode="server"
          paginationModel={{ pageSize: pageSize, page: page }}
          // onPaginationModelChange={(newPaginationModel) => {
          //   // setPage(newPaginationModel.page);
          //   // setPageSize(newPaginationModel.pageSize);
          //   if (!loading) {
          //     setPage(newPaginationModel.page);
          //     setPageSize(newPaginationModel.pageSize);
          //   }
          // }}

          onPaginationModelChange={handlePaginationModelChange}
          onSortModelChange={handleSortModelChange}
          onFilterModelChange={handleFilterModelChange}

          sortingMode="server"
          sortModel={sortModel}
          // onSortModelChange={(model) => setSortModel(model)}
          filterMode="server"
          filterModel={filterModel}
          // onFilterModelChange={(model) => setFilterModel(model)}
          getRowClassName={(params) =>
            params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
          }
          checkboxSelection
          onRowSelectionModelChange={(newSelectionModel) => {
            setBulkSelectedIds(newSelectionModel);
          }}
          disableSelectionOnClick
          disableRowSelectionOnClick
          loading={loading}
          autoHeight
        />
      </Box>
    </>
  );
};

export default CCUserDataGrid;
