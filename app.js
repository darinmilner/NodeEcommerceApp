const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const user = require("./routes/user");
const notFound = require("./controllers/404");
const mongoConnect = require("./utils/database").mongoConnect;
const User = require("./models/user");
const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findById("5fc3dde16c6a72b7efc22acd")
    .then((user) => {
      req.user = new User(user.name, user.email, user.cart, user._id);
      next();
    })
    .catch((err) => console.log(err));
});

app.use("/admin", adminRoutes.route);
app.use(shopRoutes);
//app.use(user);

app.use(notFound.get404);

mongoConnect(() => {
  app.listen(3000);
});
