// server/db.ts
import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

export const sequelize = new Sequelize(
  process.env.DB_NAME!,   // database name
  process.env.DB_USER!,   // username
  process.env.DB_PASS!,   // password (empty string is fine)
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    logging: false,       // optional, disable SQL logs
  }

);

// Test the connection
(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connection established successfully!");
  } catch (error) {
    console.error("❌ Unable to connect to the database:", error);
  }
})();


  console.log("DB_NAME:", process.env.DB_NAME);
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_PASS:", process.env.DB_PASS === "" ? "(empty)" : process.env.DB_PASS);
console.log("DB_HOST:", process.env.DB_HOST);
