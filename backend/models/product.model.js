import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true, // they must provide the name 
    },
    price: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
}, {
    timestamps: true //createdAt, updateAt field
});

const Product = mongoose.model("Product", productSchema); // we need to write it in singular capital form for mongoose 

export default Product;


