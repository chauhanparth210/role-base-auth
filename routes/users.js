const router = require("express").Router();
const { userRegister, userLogin } = require("../utils/Auth");

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

router.get("/profile", async (req, res) => {});

router.post("/user-protected", async (req, res) => {});

router.post("/admin-protected", async (req, res) => {});

router.post("/super-admin-protected", async (req, res) => {});

module.exports = router;
