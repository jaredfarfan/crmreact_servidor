const mysql = require("mysql2/promise");
const log4js = require("log4js");
require("dotenv").config({ path: "variables.env" });

const logger = log4js.getLogger("DB Connection");
const poolConfig = {
  host: process.env.READ_DB_HOST,
  port: process.env.READ_DB_PORT,
  user: process.env.READ_DB_USER,
  password: process.env.READ_DB_PASSWORD,
  multipleStatements: true,
  database: process.env.READ_DB_NAME,
  charset: "utf8mb4",
};

logger.warn(poolConfig);

const readPool = mysql.createPool(poolConfig);
const writePool = mysql.createPool(poolConfig);

readPool.on("error", (err) => {
  logger.error(err);
  throw err;
});

writePool.on("error", (err) => {
  logger.error(err);
  throw err;
});

module.exports = { readPool, writePool };
