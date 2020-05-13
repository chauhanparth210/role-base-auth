const router = require("express").Router();
const { checkRole, userAuth } = require("../utils/Auth");
const {
  getAllItems,
  getItemDetails,
  addItem,
  updateItem,
  deleteItem,
} = require("../utils/Item");

router.get(
  "/",
  userAuth,
  checkRole(["user", "admin", "super-admin"]),
  async (req, res) => {
    getAllItems(res);
  }
);

router.get(
  "/:itemid",
  userAuth,
  checkRole(["admin", "super-admin"]),
  async (req, res) => {
    getItemDetails(req.params.itemid, res);
  }
);

router.post(
  "/",
  userAuth,
  checkRole(["admin", "super-admin"]),
  async (req, res) => {
    addItem(req.body, res);
  }
);

router.patch(
  "/:itemid",
  userAuth,
  checkRole(["admin", "super-admin"]),
  async (req, res) => {
    updateItem(req.params.itemid, req.body, res);
  }
);

router.delete(
  "/:itemid",
  userAuth,
  checkRole(["super-admin"]),
  async (req, res) => {
    deleteItem(req.params.itemid, res);
  }
);

module.exports = router;
