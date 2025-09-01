const mongoose = require("mongoose");
const initData = require("./listingData.js");
const Listing = require("../models/listingSchema.js");

//mongoDB connection
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust_NEW";

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  await Listing.deleteMany({});
  initData.data = initData.data.map((obj) => ({
    ...obj,
    owner: "68984c63dec15963a1369940",
  }));
  await Listing.insertMany(initData.data);
  console.log("data was initialized");
};
initDB();
