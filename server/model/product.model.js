const mongoose = require("mongoose");
const productSchema = mongoose.Schema({
    name: {
        type: String, require: [true, "Please! Enter product name"]
    },
    description: {
        type: String,
        require: [true, "Please! write something about your product"]
    },
    price: {
        type: Number,
        require: [true, "Please! Enter price of product."],
        maxLength: [8]
    },
    rating: {
        type: Number,
        default: 0
    },
    image: [
        {
            public_id: {
                type: String,
                required: true,

            },
            url: {
                type: String,
                required: true,

            }
        }

    ],
    category: {
        type: String,
        require: [true, "Please! Enter product category"]
    },

    stock: {
        type: Number,
        require: [true, "Please! Enter product stock"],
        maxLength: [4, "Stack cannot axceed 4 charector"],
        default: 1
    },
    numberOfReview: {
        type: Number,
        default: 0
    },

    review: [{
        name: {
            type: String,
            require: true
        },
        rating: {
            type: Number,
            require: true,
        },
        comments: {
            type: String,
            require: true
        }
    }],
    user: {
        type: String,
        ref: "User",
        require: true,
    },
    createDate: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model("product", productSchema);