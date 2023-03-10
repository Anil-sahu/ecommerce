
const productmodel = require("./../model/product.model");


//--------------------create new product admin--------------------------
exports.createProduct = async (req, res, next) => {
    req.body.user = req.user.id
    const product = await productmodel.create(req.body);
    res.status(200).json({ succes: true, product });

}

//---------------------update---------------product

exports.updateProduct = async (req, res, next) => {
    let product = await productmodel.findById(req.params.id);
    if (!product) {
        return res.status(500).json({
            succes: false,
            message: "product not found",
        });
    }

    product = await productmodel.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true, useFindModify: false });
    res.status(200).json({
        succes: true,
        product
    });
}


//--------------get product by    id---------------

exports.getProductById = async (req, res, next) => {
    const product = productmodel.findById(req.params.id);
    res.status(200).json({
        succes: true,
        product
    });
}


//-----------------delete product--------------------------

exports.deleteProduct = async (req, res, next) => {
    const product = await productmodel.findById(req.params.id);
    if (!product) {
        return res.status(500).json({
            succes: false,
            message: "Product is not find"
        });

    }
    await product.remove();
    res.status(200).json({
        succes: true,
        message: "Product deleted successful",
    });
}
//-----------------------------Get all product----------------------------
exports.getAllProduct = async (req, res) => {
    const product = await productmodel.find();
    res.status(200).json({
        succes: true,
        product
    });
}