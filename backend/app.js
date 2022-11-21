import express from "express";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

import login from "./routes/login.js";
import InitiateMongoServer from'./config/db.config.js';

const PORT = 4000;

const log = (message) => {
    console.log(message);
}

InitiateMongoServer();

app.post("/login", login);

app.listen(PORT, () => {
        log("Listening at https://localhost:" + PORT);
    }
);

export default app;