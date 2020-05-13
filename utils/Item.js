const Item = require("../models/Item");

const getAllItems = async (res) => {
  let items = await Item.find({});
  items = items.map((item) => {
    serializeItem(item);
  });
  return res.status(201).json(items);
};

const getItemDetails = async (itemid, res) => {
  const item = await Item.findOne({ _id: itemid });
  return res.status(201).json(item);
};

const addItem = async (item, res) => {
  let newItem = new Item({
    ...item,
  });
  await newItem.save();
  return res.status(201).json({ message: "Hurry! item is saved" });
};

const updateItem = async (itemid, newItem, res) => {
  let updatedItem = await Item.findOneAndUpdate(
    { _id: itemid },
    { itemname: newItem },
    { new: true }
  );
  return res
    .status(201)
    .json({ updatedItem, message: "Hurry! your item is updated" });
};

const deleteItem = async (itemid, res) => {
  const deletedItem = await Character.deleteOne({ _id: itemid });
  return deleteItem.deletedCount > 0
    ? res.status(200).json({ message: "Hurry! your item is deleted" })
    : res
        .status(404)
        .json({ message: "Opoos! your item is not found in database" });
};

const serializeItem = (item) => {
  return {
    itemname: item.itemname,
    itemid: item._id,
  };
};

module.exports = {
  getAllItems,
  getItemDetails,
  addItem,
  updateItem,
  deleteItem,
};
