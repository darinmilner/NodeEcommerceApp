const express = require("express");
const path = require("path");
const adminController = require("../controllers/adminController");
const isAuth = require("../middleware/isAuth");
const { check } = require("express-validator/check");
const router = express.Router();

router.get(
  "/add-product",
  [
    check("title").isString().isLength({ min: 3 }).trim(),
    check("imageUrl").isURL(),
    check("price").isFloat(),
    check("description").isLength({ min: 5, max: 400 }).trim(),
  ],
  isAuth,
  adminController.getAddProduct
);
router.get("/products", isAuth, adminController.getProducts);
router.post(
  "/add-product",
  [
    check("title").isString().isLength({ min: 3 }).trim(),
    check("price").isFloat(),
    check("description").isLength({ min: 5, max: 400 }).trim(),
  ],
  isAuth,
  adminController.postAddProduct
);

router.get("/edit-product/:productId", isAuth, adminController.getEditProduct);

router.post(
  "/edit-product",
  check("title").isString().isLength({ min: 3 }).trim(),
  check("price").isFloat(),
  check("description").isLength({ min: 5, max: 400 }).trim(),
  isAuth,
  adminController.postEditProduct
);
router.delete("/product/:productId", isAuth, adminController.deleteProduct);

exports.route = router;
