import express from "express";
const app = express();

import cors from 'cors';
app.use(cors());

import dotenv from 'dotenv';
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

import login from "./routes/login.js";
import InitiateMongoServer from'./config/db.config.js';

const PORT = process.env.PORT || 4000;

const log = (message) => {
    console.log(message);
}

InitiateMongoServer();

app.get("/", (req, res) => {
    res.send("Calling API...");
});

app.post("/login", login);


app.listen(PORT, () => {
        log("API is listening...");
    }
);

export default app;