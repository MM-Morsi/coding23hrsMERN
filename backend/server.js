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

app.post("/products", (req, res) => {
    pass
})

// console.log(process.env.MONGO_URI)

app.listen(port, () => {
    connectDB()
    console.log(`Server started at http://localhost:${port}`);
})


