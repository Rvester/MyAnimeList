const User = require("../models/User");
const userFavorite = require("../models/UserFavorites");

const info = async (req, res) => {
  // req.params.username
  // req.userId
  console.log("working");
  console.log("user id:", req.userId);
  try {
    const foundUser = await User.findById(req.userId);

    res.status(200).json({
      username: foundUser.username,
      email: foundUser.email,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const allUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json({ users });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const clear = async (req, res) => {
  try {
    await User.deleteMany({});
    res.status(200).json({ msg: "All users have been deleted " });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const setFavorite = async (req, res) => {
  console.log("Hello");
  const { username, anime_id } = req.body;
  try {
    const response = await userFavorite.create({
      username,
      anime_id,
    });

    res.status(200).json({ userFavorite });
    console.log(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const listFavorite = async (req, res) => {
  const { username } = req.query;
  console.log({ username });
  try {
    const userFavorites = await userFavorite.find({
      username,
    });
    console.log(JSON.stringify(userFavorites, null, 2));

    res.status(200).json({ userFavorites });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

const updateFavorite = async (req, res) => {
  const { username, anime_id } = req.body;

  try {
    await userFavorite.findByIdAndUpdate({
      username,
      anime_id,
    });

    res.status(200).json({ userFavorite });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteFavorite = async (req, res) => {
  const { username, anime_id } = req.body;
  try {
    await userFavorite.delete({
      username,
      anime_id,
    });

    res.status(200).json({ userFavorite });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  info,
  allUsers,
  clear,
  setFavorite,
  listFavorite,
  updateFavorite,
  deleteFavorite,
};
