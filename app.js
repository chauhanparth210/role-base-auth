const express = require("express");
const { connect } = require("mongoose");
const { success, error } = require("consola");
const cors = require("cors");

const app = express();
const { PORT, DB } = require("./config");

app.use(cors());
app.use(express.json());
app.use("/api/user", require("./routes/users"));

const startApp = async () => {
  try {
    await connect(DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: true,
    });
    success({ message: "Successfully connected with Database", badge: true });
    app.listen(PORT, () => {
      success({ message: `Server is running on PORT:${PORT}`, badge: true });
    });
  } catch (e) {
    error({ message: `Unable to connect with Database`, badge: true });
  }
};

startApp();
