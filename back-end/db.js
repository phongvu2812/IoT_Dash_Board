const mysql = require("mysql2/promise");

const dbConfig = mysql.createPool({
   host: "localhost",
   user: "root",
   password: "admin",
   database: "sys",
});

module.exports = dbConfig;
