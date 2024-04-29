const mongoose = require("mongoose");
require("dotenv").config();

try {
  mongoose.connect(process.env.DB_URL);
  mongoose.set("strictQuery", false);
  let db = mongoose.connection;

  db.on("open", () => {
    console.log("Connected to MongoDb");
  });

  db.on("error", (error) => {
    console.log("MongoDb connection Error", error);
  });

  db.on("close", () => {
    console.log("connection to MongoDb Closed");
  });
} catch (error) {
  console.log("Mongodb Connection Error: ", error);
}
