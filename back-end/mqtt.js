const mqttConfig = {
   brokerUrl: "mqtt://192.168.43.12",
   topic1: "log",
   topic2: "data",
};
module.exports = mqttConfig;
const mqtt = require("mqtt");

const publishMessage = async (topic, message) => {
   const brokerUrl = mqttConfig.brokerUrl;
   const client = mqtt.connect(brokerUrl);

   return new Promise((resolve, reject) => {
      client.on("connect", () => {
         client.publish(topic, message, (error) => {
            if (error) {
               reject(error);
            } else {
               resolve();
            }

            // Uncomment the line below if you want to close the connection after publishing
            // client.end();
         });
      });

      // Handle connection error
      client.on("error", (error) => {
         reject(error);
      });
   });
};

module.exports.public = publishMessage;
