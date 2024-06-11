// dataFormatter.js
import Axios from "axios";
import { tokens } from "../theme";
import { useEffect, useState } from "react";

export const fetchAndFormatChartData = async () => {
   try {
      const [data, setData] = useState([]);
      useEffect(() => {
         Axios.get("http://localhost:3001/api/data/").then((res) => {
            setData(res.data);
            console.log(data);
         });
      }, []);

      const formattedData = [
         {
            id: "Temperature",
            color: tokens("light").redAccent[400],
            data: data.map((item, index) => ({
               x: String(index + 1),
               y: item.temp,
            })),
         },
         {
            id: "Humidity",
            color: tokens("dark").blueAccent[600],
            data: data.map((item, index) => ({
               x: String(index + 1),
               y: item.hum,
            })),
         },
         {
            id: "Brightness",
            color: tokens("dark").yellow[500],
            data: data.map((item, index) => ({
               x: String(index + 1),
               y: item.bright,
            })),
         },
      ];

      return formattedData;
   } catch (error) {
      console.error("Error fetching and formatting data:", error);
      return []; // Return an empty array in case of error
   }
};
