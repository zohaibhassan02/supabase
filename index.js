import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import upload from 'express-fileupload';
import users from "./routes/users.js";
import inventory from "./routes/inventory.js";
import menu from "./routes/menu.js";
import search from "./routes/search.js";

dotenv.config();

var PORT = process.env.PORT;

const app = express();
app.use(cors());
app.use(express.json());
app.use(upload());
app.use(express.static("public"));

app.use("/api/users", users);

app.use("/api/inventory", inventory);

app.use("/api/menu", menu)

app.use("/api/search", search);

app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`));