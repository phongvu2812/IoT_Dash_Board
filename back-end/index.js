const express = require("express"),
   app = express();

const axios = require("axios");

const mqtt = require("mqtt");
const mqttConfig = require("./mqtt");
const client = mqtt.connect(mqttConfig.brokerUrl);

bodyparser = require("body-parser");
require("express-async-errors");
const cors = require("cors");
const port = 3001;
const db = require("./db"),
   dataRoutes = require("./controller/dataController"),
   logRoutes = require("./controller/logController");

app.use(bodyparser.json());
app.use(cors());
app.use("/api/data", dataRoutes);
app.use("/api/log", logRoutes);
app.use((err, req, res, next) => {
   console.log(err);
   res.status(err.status || 500).send("something went wrong");
});

db.query("select * from data")
   .then(() => {
      console.log("db conection succeed");
      app.listen(port, () => console.log(`server start at ${port}`));
   })
   .catch((err) => console.log("db conection failed" + err));

client.on("connect", () => {
   client.subscribe(mqttConfig.topic1);
   client.subscribe(mqttConfig.topic2);
   console.log("Subscribed to MQTT topic");
});
client.on("message", (topic, message) => {
   // Extract relevant data from the MQTT message
   const dataString = message.toString(); // Assuming the message is a string in the format "temp:25,hum:60,bright:80"
   // console.log(dataString);
   // Extracting individual values from the string
   const tempMatch = dataString.match(/temp:(\d+)/);
   const humMatch = dataString.match(/hum:(\d+)/);
   const brightMatch = dataString.match(/bright:(\d+)/);

   // Check if all values are present
   if (tempMatch && humMatch && brightMatch) {
      const temp = parseFloat(tempMatch[1]);
      const hum = parseFloat(humMatch[1]);
      const bright = parseFloat(brightMatch[1]);
      const timestamp = new Date().toISOString().slice(0, 19).replace("T", " ");
      // console.log("Timestamp:", timestamp);

      // Prepare the SQL statement
      const sql =
         "INSERT INTO data (time,temperature, humidity, brightness) VALUES (DATE_FORMAT(?, '%Y-%m-%d %H:%i:%s'),?, ?, ?)";
      const values = [timestamp, temp, hum, bright];

      // Execute the SQL statement
      setInterval(() => {
         db.query(sql, values, (err, result) => {
            if (err) {
               console.error("Error executing SQL statement: ", err);
               return;
            }
            // console.log("Data inserted successfully");
         });
      }, 5000);
   } else {
      console.error("Invalid format for MQTT message");
   }
});
