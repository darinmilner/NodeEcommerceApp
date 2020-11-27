const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const admimRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const user = require("./routes/user");
const notFound = require("./controllers/404");
const sequelize = require("./utils/database");
const Product = require("./models/product");
const User = require("./models/user");
const Cart = require("./models/cart");
const CartItem = require("./models/cart-item");
const Order = require("./models/order");
const orderItem = require("./models/order-item");
//const expressHbs = require("express-handlebars");

const app = express();

// app.engine(
//   "handlebars",
//   expressHbs({ layoutsDir: "views/layouts", defaultLayout: "main-layout" })
// );

app.set("view engine", "ejs");
//app.set("view engine", "pug");
//app.set("view engine", "handlebars");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findByPk(1)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

app.use("/admin", admimRoutes.route);
app.use(shopRoutes);
app.use(user);

app.use(notFound.get404);

Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product, { through: orderItem });

sequelize
  //.sync({ force: true })
  .sync()
  .then((result) => {
    return User.findByPk(1);
    //console.log(result);
  })
  .then((user) => {
    if (!user) {
      return User.create({ name: "admin", email: "admin@admin.com" });
    }
    return user;
  })
  .then((user) => {
    //console.log(user);
    return user.createCart();
  })
  .then((cart) => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
