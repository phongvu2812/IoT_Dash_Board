const db = require("../db");

module.exports.getAllData = async () => {
   const [data] = await db.query("SELECT * FROM data ORDER BY id DESC LIMIT 100;");
   return data;
};
module.exports.getTempByTime = async () => {
   const [data] = await db.query("SELECT temperature FROM data ORDER BY id DESC LIMIT 1;");
   return data;
};
module.exports.getHumByTime = async () => {
   const [data] = await db.query("SELECT humidity FROM data ORDER BY id DESC LIMIT 1;");
   return data;
};
module.exports.getBrightByTime = async () => {
   const [data] = await db.query("SELECT brightness FROM data ORDER BY id DESC LIMIT 1;");
   return data;
};
module.exports.getLatestData = async () => {
   const [data] = await db.query("SELECT * FROM data ORDER BY id DESC LIMIT 1;");
   return data;
};
module.exports.deleteDataById = async (id) => {
   const [{ affectedRows }] = await db.query("delete from data where id = ? ", [id]);
   return affectedRows;
};
module.exports.get10Data = async () => {
   const [data] = await db.query("SELECT * FROM data ORDER BY id DESC LIMIT 10;");
   return data;
};

// module.exports.addData = async (temp, hum, bright) => {
//    const [[[{ affectedRows }]]] = await db.query(
//       "INSERT INTO data (temperature, humidity, brightness) VALUES (?, ?, ?) ",
//       [temp, hum, bright]
//    );
//    return affectedRows;
//    console.log(temp);
// };
