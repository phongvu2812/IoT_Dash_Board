import { ResponsiveLine } from "@nivo/line";
import { useTheme } from "@mui/material";
import { tokens } from "../theme";
import { useState, useEffect } from "react";
import axios from "axios";

const LineChart = ({ isCustomLineColors = false, isDashboard = false }) => {
   const theme = useTheme();
   const colors = tokens(theme.palette.mode);
   const [data1, setData] = useState([]);
   setInterval(() => {
      axios.get("http://localhost:3001/api/data/ten").then((res) => {
         setData([
            {
               id: "temperature",
               color: tokens("dark").redAccent[500],
               data: res.data.map((item) => ({ x: item.id, y: item.temperature })),
            },
            {
               id: "humidity",
               color: tokens("dark").blueAccent[500],
               data: res.data.map((item) => ({ x: item.id, y: item.humidity })),
            },
            {
               id: "brightness",
               color: tokens("dark").yellow[600],
               data: res.data.map((item) => ({ x: item.id, y: item.brightness })),
            },
         ]);
      });
   }, 15000);

   return (
      <ResponsiveLine
         data={data1}
         theme={{
            axis: {
               domain: {
                  line: {
                     stroke: colors.grey[100],
                  },
               },
               legend: {
                  text: {
                     fill: colors.grey[100],
                  },
               },
               ticks: {
                  line: {
                     stroke: colors.grey[100],
                     strokeWidth: 1,
                  },
                  text: {
                     fill: colors.grey[100],
                  },
               },
            },
            legends: {
               text: {
                  fill: colors.grey[100],
               },
            },
            tooltip: {
               container: {
                  color: colors.primary[500],
               },
            },
         }}
         colors={isDashboard ? { datum: "color" } : { scheme: "nivo" }} // added
         margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
         xScale={{ type: "point" }}
         yScale={{
            type: "linear",
            min: "auto",
            max: "auto",
            stacked: true,
            reverse: false,
         }}
         yFormat=" >-.2f"
         curve="catmullRom"
         axisTop={null}
         axisRight={null}
         axisBottom={{
            orient: "bottom",
            tickSize: 0,
            tickPadding: 5,
            tickRotation: 0,
            legend: isDashboard ? undefined : "transportation", // added
            legendOffset: 36,
            legendPosition: "middle",
         }}
         axisLeft={null}
         enableGridX={false}
         enableGridY={false}
         pointSize={8}
         pointColor={{ theme: "background" }}
         pointBorderWidth={2}
         pointBorderColor={{ from: "serieColor" }}
         pointLabelYOffset={-12}
         useMesh={true}
         legends={[
            {
               anchor: "bottom-right",
               direction: "column",
               justify: false,
               translateX: 100,
               translateY: 0,
               itemsSpacing: 0,
               itemDirection: "left-to-right",
               itemWidth: 80,
               itemHeight: 20,
               itemOpacity: 0.75,
               symbolSize: 12,
               symbolShape: "circle",
               symbolBorderColor: "rgba(0, 0, 0, .5)",
               effects: [
                  {
                     on: "hover",
                     style: {
                        itemBackground: "rgba(0, 0, 0, .03)",
                        itemOpacity: 1,
                     },
                  },
               ],
            },
         ]}
      />
   );
};
export default LineChart;
