exports.get404 = (req, res, next) => {
  //res.status(404).sendFile(path.join(__dirname, "views", "notfound.html"));
  res.status(404).render("notfound", {
    pageTitle: "Page Not Found",
    path: "/404",
    isLoggedIn: req.session.isLoggedIn,
  });
};
