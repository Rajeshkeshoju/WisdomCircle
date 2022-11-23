import express from "express";
const app = express();

import cors from 'cors';
app.use(cors());


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

import login from "./routes/login.js";
import InitiateMongoServer from'./config/db.config.js';

import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 4000;

const log = (message) => {
    console.log(message);
}

InitiateMongoServer();

app.get("/", (req, res) => {
    res.send("Hello API")
});

app.post("/login", login);

app.listen(PORT, () => {
        log("App is listening");
    }
);

export default app;
