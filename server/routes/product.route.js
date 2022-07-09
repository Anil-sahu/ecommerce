const express = require("express");
const { route } = require("../app");
const { getAllProduct, createProduct, getProductById, updateProduct, deleteProduct } = require("../controller/product.controller");

const router = express.Router();

router.route("/product").get(getAllProduct);

router.route("/product/new").post(createProduct);

router.route("/product/:id").put(updateProduct);

router.route("/product/:id").get(getProductById);

router.route("/product/:id").delete(deleteProduct);

module.exports = router;