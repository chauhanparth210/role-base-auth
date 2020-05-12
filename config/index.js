require("dotenv").config();

module.exports = {
  DB: process.env.DB,
  PORT: process.env.PORT,
  SECRET: process.env.SECRET,
};
