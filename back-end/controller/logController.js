const express = require("express"),
   router = express.Router();

const mqtt = require("mqtt");
const mqttConfig = require("../mqtt");
const client = mqtt.connect(mqttConfig.brokerUrl);

const logService = require("../services/logService");
router.get("/", async (req, res) => {
   const data = await logService.getAllLog();
   res.send(data);
});
router.post("/add", async (req, res) => {
   await logService.add(req.body);
   const message = `${req.body.type}${req.body.action}`;
   await client.publish(mqttConfig.topic1, message, (err) => {
      if (err) {
         console.error("Error publishing message:", err);
      } else {
         console.log("Message published successfully:", message);
         // Close the MQTT connection after publishing
         // client.end();
      }
   });
   res.status(201).send("created successfully.");
});
router.get("/latest", async (req, res) => {
   const data = await logService.getLatestData();
   res.send(data);
});
router.get("/lightOn", async (req, res) => {
   const data = await logService.getLightOnTimes();
   res.send(data);
});
router.get("/lightOff", async (req, res) => {
   const data = await logService.getLightOffTimes();
   res.send(data);
});
router.get("/fanOn", async (req, res) => {
   const data = await logService.getFanOnTimes();
   res.send(data);
});
router.get("/fanOff", async (req, res) => {
   const data = await logService.getFanOffTimes();
   res.send(data);
});
module.exports = router;
