const mongoose = require("mongoose");
const { faker } = require("@faker-js/faker");

mongoose.connect(process.env.MONGODB_URI);
mongoose.set("debug", true);
require("../models/User.js");
require("../models/Item.js");
require("../models/Comment.js");
const User = mongoose.model("User");
const Item = mongoose.model("Item");
const Comment = mongoose.model("Comment");

const seedUser = async () => {
  const user = new User();
  user.username = `${faker.name.firstName()}${faker.name.firstName()}${faker.datatype.number()}`;
  user.email = faker.internet.email();
  user.setPassword(faker.internet.password());

  return user.save();
};
const seedItem = async (user_id) => {
  const item = new Item();
  item.title = faker.commerce.product();
  item.description = faker.commerce.productDescription();
  item.image = faker.image.avatar();
  item.seller = user_id;
  return await item.save();
};

const seedComment = async (user_id, item_id) => {
  const comment = new Comment();
  comment.body = faker.lorem.paragraph();
  comment.seller = user_id;
  comment.item = item_id;
  return await comment.save();
};

(async function () {
  for (let i = 0; i < 100; i++) {
    const user = await seedUser();
    const item = await seedItem(user._id);
    await seedComment(user._id, item._id);
  }
  process.exit();
})();
