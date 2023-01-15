const Sequelize = require("sequelize");

const db = new Sequelize(" ragnarokbeta_sakray", "root", "vmfldhsl1", {
  host: "localhost",
  dialect: "mysql",
  define: {
    timestamps: false,
  },
});
// const db = new Sequelize("datacms", "root", "", {
//   host: "localhost",
//   dialect: "mysql",
//   define: {
//     timestamps: false,
//   },
// });

module.exports = db;
