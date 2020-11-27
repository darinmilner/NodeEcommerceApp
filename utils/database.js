//connect to SQL Database
const Sequelize = require("sequelize");

const sequelize = new Sequelize("NodeShop", "root", "fakepw", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
