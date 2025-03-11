const User = require('../models/user');

exports.createAndSaveUser = async (username) => {
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return { username: existingUser.username, _id: existingUser._id }; // Return existing user if found
    }

    const user = new User({ username });
    const savedUser = await user.save();
    return { username: savedUser.username, _id: savedUser._id };
  } catch (err) {
    console.error(err);
    throw new Error('Error creating user');
  }
};

exports.findAllUsers = async () => {
  try {
    const users = await User.find({});
    return users.map(({ _id, username }) => ({ _id, username }));
  } catch (err) {
    console.error(err);
    throw new Error('Error retrieving users');
  }
};
