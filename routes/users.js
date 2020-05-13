const router = require("express").Router();
const {
  userRegister,
  userLogin,
  userAuth,
  serializeUser,
  checkRole,
} = require("../utils/Auth");
// const { success } = require("consola");

router.post("/register-user", async (req, res) => {
  await userRegister(req.body, "user", res);
});

router.post("/register-admin", async (req, res) => {
  await userRegister(req.body, "admin", res);
});

router.post("/register-super-admin", async (req, res) => {
  await userRegister(req.body, "super-admin", res);
});

router.post("/login-user", async (req, res) => {
  await userLogin(req.body, "user", res);
});

router.post("/login-admin", async (req, res) => {
  await userLogin(req.body, "admin", res);
});

router.post("/login-super-admin", async (req, res) => {
  await userLogin(req.body, "super-admin", res);
});

router.get("/profile", userAuth, async (req, res) => {
  // success({ user: req.user._doc });
  res.status(201).json({ user: serializeUser(req.user._doc) });
});

router.get(
  "/user-protected",
  userAuth,
  checkRole(["user"]),
  async (req, res) => {
    return res.send("Hey! User");
  }
);

router.get(
  "/admin-protected",
  userAuth,
  checkRole(["admin"]),
  async (req, res) => {
    return res.send("Hey! Admin");
  }
);

router.get(
  "/super-admin-protected",
  userAuth,
  checkRole(["super-admin"]),
  async (req, res) => {
    return res.send("Hey! Super Admin");
  }
);

router.get(
  "/super-admin-and-admin-protected",
  userAuth,
  checkRole(["super-admin", "admin"]),
  async (req, res) => {
    return res.send("Hey! Super Admin or Admin");
  }
);

module.exports = router;
