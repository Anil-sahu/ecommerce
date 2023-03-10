const express = require("express");
const { route } = require("../app");
const { getAllProduct, createProduct, getProductById, updateProduct, deleteProduct } = require("../controller/product.controller");
const { isAuthenticate, authorizedRole } = require("../middleware/auth");

const router = express.Router();

router.route("/product").get(isAuthenticate, authorizedRole("Admin"), getAllProduct);

router.route("/product/new").post(isAuthenticate, authorizedRole("Admin"), createProduct);

router.route("/product/:id").put(isAuthenticate, authorizedRole("Admin"), updateProduct);

router.route("/product/:id").get(getProductById);

router.route("/product/:id").delete(isAuthenticate, authorizedRole("Admin"), deleteProduct);

module.exports = router;