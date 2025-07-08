import express from "express"; //needs module in package.json "type"
import dotenv from "dotenv";
import connectDB from "./config/db.js";

dotenv.config(); // env file contents into process.env

connectDB();

const app = express();

const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
    res.send("Server is ready");
})

app.get("/products", (req, res) => {
    res.send("Products page is ready");
})

app.post("/products", async (req, res) => {
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

// console.log(process.env.MONGO_URI)

app.listen(port, () => {
    connectDB()
    console.log(`Server started at http://localhost:${port}`);
})


