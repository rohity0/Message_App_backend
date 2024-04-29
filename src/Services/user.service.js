const bcrypt = require("bcrypt");
const UserModel = require("../models/UserSchema");
const { commonErrorHandling } = require("../utils/error-response");
const jwt = require("jsonwebtoken");

const registerUserService = async (data) => {
  let firstName = data.firstName.trim();
  let lastName = data.lastName.trim();
  let username = data.username.trim();
  let email = data.email.trim();
  let password = data.password;
  let errorMessage;
  try {
    if (firstName && lastName && username && email && password) {
      let user = await UserModel.findOne({
        $or: [{ username: username }, { email: email }],
      }).catch((error) => {
        let code = error.code || 500;
        errorMessage = "Something went wrong.";
        commonErrorHandling(code, errorMessage);
      });

      if (user == null) {
        // No user found
        data.password = await bcrypt.hash(password, 10);

        await UserModel.create(data);
        return {
          message: "User Created Successfully",
        };
      } else {
        // User found
        if (email == user.email) {
          errorMessage = "Email already in use.";
        } else {
          errorMessage = "Username already in use.";
        }
        commonErrorHandling(500, errorMessage);
      }
    } else {
      errorMessage = "Make sure each field has a valid value.";
      commonErrorHandling(500, errorMessage);
    }
  } catch (err) {
    throw err;
  }
};

const updateProfileService = async (data, userId) => {
  try {
    return await UserModel.findByIdAndUpdate(userId, data, { new: true });
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const userLoginService = async (data) => {
  try {
    let user = await UserModel.findOne({
      $or: [{ username: data.username }, { email: data.email }],
    });

    if (user) {
      let password = bcrypt.compare(data.password, user.password);
      if (password) {
        token = jwt.sign(
          { email: user.email, userId: user._id },
          process.env.SECRET,
          {
            expiresIn: "24 hrs",
          }
        );
        return { token };
      }
    } else {
      commonErrorHandling(500, "User doesn't exist");
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const getUsersService = async () => {
  try {
    return await UserModel.find({});
  } catch (err) {
    console.log(err);
    throw err;
  }
};

module.exports = {
  registerUserService,
  updateProfileService,
  userLoginService,
  getUsersService,
};
