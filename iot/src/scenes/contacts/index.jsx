import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
// import { mockDataContacts } from "../../data/mockData";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import Axios from "axios";

const Contacts = () => {
   const theme = useTheme();
   const colors = tokens(theme.palette.mode);
   const [data, setData] = useState([]);
   Axios.get("http://localhost:3001/api/data").then((res) => {
      setData(res.data);
   });
   const columns = [
      {
         field: "id",
         headerName: "ID",
         type: "number",
         flex: 0.01,
         cellClassName: "name-column--cell",
         headerAlign: "center",
         align: "center",
      },
      {
         field: "time",
         headerName: "Time",
         headerAlign: "center",
         flex: 0.1,
         cellClassName: "name-column--cell",
         align: "center",
      },
      {
         field: "temperature",
         headerName: "Temperature",
         type: "number",
         headerAlign: "center",
         align: "center",
         flex: 0.1,
      },
      {
         field: "humidity",
         headerName: "Humidity",
         type: "number",
         headerAlign: "center",
         align: "center",
         flex: 0.1,
      },
      {
         field: "brightness",
         headerName: "Brightness",
         type: "number",
         headerAlign: "center",
         align: "center",
         flex: 0.1,
      },
   ];

   return (
      <Box m="20px">
         <Header title="DATA" subtitle="Data of everythings" />
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

export default Contacts;
