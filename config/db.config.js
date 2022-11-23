import mongoose, { mongo } from "mongoose";

import dotenv from 'dotenv';
dotenv.config();

const MONGOURI = `mongodb+srv://${process.env.mongoUser}:${process.env.mongoPassword}@${process.env.mongoCluster}.ynfcjme.mongodb.net/${process.env.mongoDatabase}?retryWrites=true&w=majority`;


const InitiateMongoServer = async () => {
  try {
    await mongoose.connect(MONGOURI, {
      useNewUrlParser: true
    });
    console.log("Connected to MongoDB !!");
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export default InitiateMongoServer;
