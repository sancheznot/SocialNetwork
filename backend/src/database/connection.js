const mongoose = require("mongoose");

const { RS_APP_HOST, RS_APP_DATABASE } = process.env;

const MONGODB = `mongodb://${RS_APP_HOST}/${RS_APP_DATABASE}`;
mongoose.set("strictQuery", true);

const connection = async () => {
  try {
    await mongoose.connect(MONGODB);
    console.log(`connected to DataBase ${RS_APP_DATABASE}`);
  } catch (error) {
    console.error(error);
    throw new Error("No connection to mongoDB server");
  }
};

module.exports = {
  connection,
};
