const express = require("express");
const { connect } = require("mongoose");
const { success, error } = require("consola");
const cors = require("cors");
const passport = require("passport");

const app = express();
const { PORT, DB } = require("./config");

app.use(cors());
app.use(express.json());
app.use(passport.initialize());
app.use("/api/user", require("./routes/users"));
app.use("/api/items", require("./routes/items"));

require("./middleware/passport")(passport);

const startApp = async () => {
  try {
    await connect(DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
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
