import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import Axios from "axios";
import { useEffect, useState } from "react";
const Log = () => {
   const theme = useTheme();
   const colors = tokens(theme.palette.mode);
   const [data, setData] = useState([]);
   Axios.get("http://localhost:3001/api/log").then((res) => {
      setData(res.data);
   });
   const columns = [
      { field: "id", headerName: "ID", flex: 0.1 },
      { field: "time", headerName: "Time", flex: 0.1 },
      {
         field: "type",
         headerName: "Type",
         flex: 0.1,
         cellClassName: "name-column--cell",
      },
      {
         field: "action",
         headerName: "Action",
         flex: 0.1,
         cellClassName: "name-column--cell",
      },
   ];

   return (
      <Box m="20px">
         <Header title="Logs" subtitle="Log of every actions" />
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
            <DataGrid rows={data} columns={columns} components={{ Toolbar: GridToolbar }} />
         </Box>
      </Box>
   );
};

export default Log;
