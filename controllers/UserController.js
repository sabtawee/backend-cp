const UserModel = require("../models/UserModel");
const JWT = require("jsonwebtoken");
const secret = "cp-bankdev-v1";

const login = async (req, res) => {
  const { userid, user_pass } = req.body;
  const user = await UserModel.sequelize.query(
    `SELECT * FROM login WHERE userid = '${userid}' AND user_pass = '${user_pass}'`
  );
  // console.log(user);
  if (user) {
    const userdata = user[0];
    const token = JWT.sign({ userdata }, secret, { expiresIn: "1h" });
    res.status(200).json({
      message: "Login Success",
      token,
      user: user[0],
      status: 200,
    });
  } else {
    console.log("Login Failed");
    res.json({ message: "Login Failed", status: 500 });
  }
};

const authen = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.json({ auth: false, message: "No token provided" });
    }
    const decoded = JWT.verify(token, secret);
    console.log(decoded);
    const user = await UserModel.sequelize.query(
      `SELECT * FROM login WHERE account_id = '${decoded.userdata[0].account_id}'`
    );
    // console.log(user[0]);
    if (!user) {
      return res.json({ status: 500, auth: false, message: "No user found" });
    }
    res.json({ status: 200, auth: true, user: user[0] });
  } catch (error) {
    res.json({ status: 500, auth: false, message: "No user found" });
    console.log({ message: error.message });
  }
};

const checkUser = async (req, res) => {
  try {
    const { userid } = req.body;
    const user = await UserModel.sequelize.query(
      `SELECT * FROM login WHERE userid = '${userid}'`
    );
    if (user[0].length > 0) {
      res.json({ message: "User already exists", status: 200 });
    } else {
      res.json({ message: "User not found", status: 500 });
    }
  } catch (error) {
    res.json({ message: "User not found", status: 500 });
  }
};

const register = async (req, res) => {
  try {
    const { userid, user_pass, email, birthday } = req.body;
    let sex = "M";
    const user = await UserModel.sequelize.query(
      `INSERT INTO login (userid, user_pass, sex, email, birthdate) VALUES ('${userid}', '${user_pass}', '${sex}', '${email}', '${birthday}')`
    );
    res.json({ message: "Register Success", status: 200 });
  } catch (error) {
    console.log({ message: error.message });
  }
};

const changePassword = async (req, res) => {
  try {
    const { userid, user_pass } = req.body;
    const user = await UserModel.sequelize.query(
      `UPDATE login SET user_pass = '${user_pass}' WHERE userid = '${userid}'`
    );
    res.json({ message: "Change Password Success", status: 200 });
  } catch (error) {
    res.json({ message: "Change Password Failed", status: 500, error });
    console.log({ message: error.message });
  }
};

const changeEmail = async (req, res) => {
  try {
    const { userid, email } = req.body;
    const user = await UserModel.sequelize.query(`
    UPDATE login SET email = '${email}' WHERE userid = '${userid}'`);
    res.json({ message: "Change Email Success", status: 200 });
  } catch (error) {
    res.json({ message: "Change Email Failed", status: 500, error });
    console.log({ message: error.message });
  }
};

module.exports = {
  login,
  authen,
  register,
  checkUser,
  changePassword,
  changeEmail,
};
