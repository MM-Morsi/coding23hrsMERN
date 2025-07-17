import express from "express"; //needs module in package.json "type"
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import Product from "./models/product.model.js";
import mongoose from "mongoose";


dotenv.config(); // env file contents into process.env

connectDB();
const port = process.env.PORT || 5000;

const app = express();
app.use(express.json()); // middle ware to use json in request body 

app.get("/", (req, res) => {
    res.send("Server is ready");
})

app.get("/products", (req, res) => {
    res.send("Products page is ready");
})

app.post("/api/products", async (req, res) => {
    const product = req.body; // the user sends this data 
    if(!product.name || !product.price || !product.image){
        return res.status(400).json({success: false, message: "Kindly provide all required fields"});
    }

    const newProduct = new Product(product);
    try{
        await newProduct.save();
        res.status(201).json({success: true, message: "Product created successfully"}); //something was added 
    } catch(error){
        console.log(error);
        res.status(500).json({success: false, message: "Internal server error"});
    }
})
// update some fields using patch and update the entire record using put 
// :id here is a route parameter 
app.put("/api/products/:id", async (req, res) => {
    const {id} = req.params;
    const product = req.body;
    // handle 400 case: wrong product id entered 
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({success: false, message: "Invalid product id"});
    }
    // try catch to handle 200 adn 500 status 
    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product, {new: true});
        res.status(200).json({success: true, message: "Product updated successfully"});
    } catch (error) {
        res.status(500).json({success: false, message: "Internal server error"})
        
    }
})
// console.log(process.env.MONGO_URI)

app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
})
