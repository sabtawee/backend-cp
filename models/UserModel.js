const Sequilize = require("sequelize");

const db = require("../configs/db");

const { DataTypes } = require("sequelize");

const UserModel = db.define(
  "login",
  {},
  {
    freezeTableName: true,
  }
);

module.exports = UserModel;
