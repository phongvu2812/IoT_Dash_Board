import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import WaterIcon from "@mui/icons-material/Water";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import StatBox from "../../components/StatBox";
import { Fan } from "lucide-react";
import { useEffect, useState } from "react";
import Axios from "axios";

const Dashboard = () => {
   const [lightOn, setLightOn] = useState([]);
   const [lightOff, setLightOff] = useState([]);
   const [fanOn, setFantOn] = useState([]);
   const [fanOff, setFanOff] = useState([]);
   const theme = useTheme();
   const colors = tokens(theme.palette.mode);
   const [data, setData] = useState([]);
   setInterval(() => {
      Axios.get("http://localhost:3001/api/data/latest").then((res) => {
         setData(res.data);
      });
   }, 10000);
   Axios.get("http://localhost:3001/api/log/lightOn").then((res) => {
      setLightOn(res.data[0]["COUNT(*)"]);
   });
   Axios.get("http://localhost:3001/api/log/lightOff").then((res) => {
      setLightOff(res.data[0]["COUNT(*)"]);
   });
   Axios.get("http://localhost:3001/api/log/fanOn").then((res) => {
      setFantOn(res.data[0]["COUNT(*)"]);
   });
   Axios.get("http://localhost:3001/api/log/fanOff").then((res) => {
      setFanOff(res.data[0]["COUNT(*)"]);
   });
   const [isClicked1, setIsClicked1] = useState(false);
   const handleClick1 = () => {
      setIsClicked1(!isClicked1);
      const message = isClicked1 ? "OFF" : "ON";
      const reqBody = {
         type: "Light",
         action: message,
      };
      // console.log(reqBody);
      Axios.post("http://localhost:3001/api/log/add", reqBody);
   };
   const [isClicked2, setIsClicked2] = useState(false);
   const handleClick2 = () => {
      setIsClicked2(!isClicked2);
      const message = isClicked2 ? "OFF" : "ON";
      const reqBody = {
         type: "Fan",
         action: message,
      };
      console.log(reqBody);
      Axios.post("http://localhost:3001/api/log/add", reqBody);
   };
   const hum = data.humidity;
   const temp = data.temperature;
   const bright = data.brightness;
   const createBrightnessGradient = (value, lowThreshold, mediumThreshold, highThreshold) => {
      const value1 = [100, 300, 500, 700];

      if (value < lowThreshold) {
         return value1[0];
      } else if (value >= lowThreshold && value <= mediumThreshold) {
         return value1[1];
      } else if (value >= mediumThreshold && value <= highThreshold) {
         return value1[2];
      } else {
         return value1[3];
      }
   };
   const createTemperatureGradient = (value, lowThreshold, mediumThreshold, highThreshold) => {
      const value1 = [700, 500, 300, 100];

      if (value < lowThreshold) {
         return value1[0];
      } else if (value >= lowThreshold && value <= mediumThreshold) {
         return value1[1];
      } else if (value >= mediumThreshold && value <= highThreshold) {
         return value1[2];
      } else {
         return value1[3];
      }
   };
   const createHumidityGradient = (value, lowThreshold, mediumThreshold, highThreshold) => {
      const value1 = [700, 500, 300, 100];

      if (value < lowThreshold) {
         return value1[0];
      } else if (value >= lowThreshold && value <= mediumThreshold) {
         return value1[1];
      } else if (value >= mediumThreshold && value <= highThreshold) {
         return value1[2];
      } else {
         return value1[3];
      }
   };
   const tempCl = colors.redAccent[createTemperatureGradient(temp, 13, 25, 35)];
   const humCl = colors.greenAccent[createHumidityGradient(hum, 15, 40, 100)];
   const brightCl = colors.yellow[createBrightnessGradient(bright, 10, 20, 30)];
   const test = 15;
   // console.log(createBrightnessGradient(100, 100, 300, 600));
   return (
      <Box m="20px">
         {/* HEADER */}
         <Box display="flex" justifyContent="space-between" alignItems="center">
            <Header title="IOT DASHBOARD" subtitle="Welcome to your dashboard" />
         </Box>
         {/* GRID & CHARTS */}
         <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gridAutoRows="140px" gap="20px">
            {/* ROW 1 */}
            <Box
               gridColumn="span 4"
               backgroundColor={tempCl}
               display="flex"
               alignItems="center"
               justifyContent="center"
            >
               <StatBox
                  title={temp}
                  subtitle="Temperature"
                  icon={<ThermostatIcon sx={{ color: colors.redAccent[600], fontSize: "70px" }} />}
               />
            </Box>
            <Box
               gridColumn="span 4"
               backgroundColor={humCl}
               display="flex"
               alignItems="center"
               justifyContent="center"
            >
               <StatBox
                  title={hum}
                  subtitle="Humidity"
                  icon={<WaterIcon sx={{ color: colors.blueAccent[600], fontSize: "70px" }} />}
               />
            </Box>
            <Box
               gridColumn="span 4"
               backgroundColor={brightCl}
               display="flex"
               alignItems="center"
               justifyContent="center"
            >
               <StatBox
                  title={bright}
                  subtitle="Brightness"
                  icon={<LightbulbIcon sx={{ color: colors.yellow[600], fontSize: "70px" }} />}
               />
            </Box>

            {/* ROW 2 */}
            <Box gridColumn="span 8" gridRow="span 2" backgroundColor={colors.primary[400]}>
               <Box
                  mt="25px"
                  p="0 30px"
                  display="flex "
                  justifyContent="space-between"
                  alignItems="center"
               >
                  <Box>
                     <Typography variant="h5" fontWeight="600" color={colors.grey[100]}>
                        IoT line chart
                     </Typography>
                  </Box>
                  <Box>
                     <IconButton>
                        <DownloadOutlinedIcon
                           sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                        />
                     </IconButton>
                  </Box>
               </Box>
               <Box height="250px" m="-20px 0 0 0">
                  <LineChart isDashboard={true} />
               </Box>
            </Box>
            <Box
               gridColumn="span 4"
               gridRow="span 2"
               backgroundColor={colors.primary[400]}
               overflow="auto"
            >
               <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  borderBottom={`4px solid ${colors.primary[500]}`}
                  colors={colors.grey[100]}
                  p="15px"
               >
                  <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
                     Action
                  </Typography>
               </Box>
               <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  borderBottom={`4px solid ${colors.primary[500]}`}
                  p="15px"
               >
                  <Box>
                     <LightbulbIcon sx={{ color: colors.yellow[600], fontSize: "40px" }} />
                     <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
                        ON Times:{lightOn}
                     </Typography>
                     <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
                        OFF Times: {lightOff}
                     </Typography>
                  </Box>
                  <Box>
                     <Button
                        id="Light"
                        variant="contained"
                        color={isClicked1 ? "button1" : "button2"}
                        onClick={handleClick1}
                        sx={{
                           color: colors.grey[100],
                           fontSize: "14px",
                           fontWeight: "bold",
                           padding: "10px 20px",
                        }}
                     >
                        {isClicked1 ? "ON" : "OFF"}
                     </Button>
                  </Box>
               </Box>
               <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  borderBottom={`4px solid ${colors.primary[500]}`}
                  p="15px"
               >
                  <Box>
                     <Fan width={40} height={40} color={colors.yellow[900]} />
                     <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
                        ON Times :{fanOn}
                     </Typography>
                     <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
                        OFF Times : {fanOff}
                     </Typography>
                  </Box>
                  <Box>
                     <Button
                        id="Fan"
                        variant="contained"
                        color={isClicked2 ? "button1" : "button2"}
                        onClick={handleClick2}
                        sx={{
                           color: colors.grey[100],
                           fontSize: "14px",
                           fontWeight: "bold",
                           padding: "10px 20px",
                        }}
                     >
                        {isClicked2 ? "ON" : "OFF"}
                     </Button>
                  </Box>
               </Box>
            </Box>
         </Box>
      </Box>
   );
};

export default Dashboard;
