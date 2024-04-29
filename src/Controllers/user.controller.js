const {
  registerUserService,
  updateProfileService,
  userLoginService,
  getUsersService,
} = require("../Services/user.service");

const registerUser = async (req, res) => {
  try {
    let result = await registerUserService(req.body);
    res.json(result);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};

const updateProfile = async (req, res) => {
  try {
    let { userId } = req.params;
    let result = await updateProfileService(req.body, userId);
    res.json(result);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};

const userLogin = async (req, res) => {
  try {
    let result = await userLoginService(req.body);
    res.json(result);
  } catch (err) {
    console.log({ err });
    res.send(err);
  }
};

const getUsers = async (req, res) => {
  try {
    let result = await getUsersService();
    res.json(result);
  } catch (err) {
    console.log({ err });
    res.send(err);
  }
};

module.exports = {
  registerUser,
  updateProfile,
  userLogin,
  getUsers,
};
