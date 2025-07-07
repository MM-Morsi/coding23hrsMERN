import express from "express"; //needs module in package.json "type"
import dotenv from "dotenv";

dotenv.config();

const app = express();

const port = process.env.PORT || 5000;

// home page route 
app.get("/", (req, res) => {
    res.send("Server is ready");
})

app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
})