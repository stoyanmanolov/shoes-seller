const User = require("../../models/User");

const isAvailable = async (data) => {
  const user = await User.findOne(data);
  if (user) {
    return false;
  }
  return true;
};

module.exports = isAvailable;
