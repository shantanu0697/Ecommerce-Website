const mongoose = require("mongoose");
require("colors");
const dotenv = require("dotenv");
dotenv.config();
const connectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`Mongodb connected ${conn.connection.host}`.yellow);
  } catch (error) {
    console.error(`Error : ${error.message}.red`);
    process.exit();
  }
};

module.exports = connectDb;
