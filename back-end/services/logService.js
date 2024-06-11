const db = require("../db");

module.exports.getAllLog = async () => {
   const [data] = await db.query("select * from log");
   return data;
};
module.exports.add = async (obj) => {
   const timestamp = new Date().toISOString().slice(0, 19).replace("T", " ");
   const [{ affectedRows }] = await db.query(
      "INSERT INTO log (time, type, action) VALUES (DATE_FORMAT(?, '%Y-%m-%d %H:%i:%s'), ?, ?)",
      [timestamp, obj.type, obj.action]
   );
   return affectedRows;
};
module.exports.getLatestData = async () => {
   const [data] = await db.query("SELECT * FROM log ORDER BY id DESC LIMIT 1;");
   return data;
};
module.exports.getLightOnTimes = async () => {
   const [data] = await db.query(
      "SELECT COUNT(*) FROM log WHERE action = 'on' AND type = 'light';"
   );
   return data;
};
module.exports.getLightOffTimes = async () => {
   const [data] = await db.query(
      "SELECT COUNT(*) FROM log WHERE action = 'off' AND type = 'light';"
   );
   return data;
};
module.exports.getFanOnTimes = async () => {
   const [data] = await db.query("SELECT COUNT(*) FROM log WHERE action = 'on' AND type = 'fan';");
   return data;
};
module.exports.getFanOffTimes = async () => {
   const [data] = await db.query("SELECT COUNT(*) FROM log WHERE action = 'off' AND type = 'fan';");
   return data;
};
