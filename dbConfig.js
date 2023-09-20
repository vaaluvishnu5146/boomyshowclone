const { default: mongoose } = require("mongoose");

console.log(process.env.NODE_ENVIRONMENT);

async function init() {
  const URI = `${process.env.NODE_DATABASE_CONNECTION_STRING_DEV}/${process.env.NODE_DATABASE_NAME}`;
  if (process.env.NODE_ENVIRONMENT === "production") {
    URI = `mongodb+srv://${process.env.NODE_MONGODB_USERNAME}:${process.env.NODE_MONGODB_PASSWORD}@cluster0.ez75xfb.mongodb.net/${process.env.NODE_DATABASE_NAME}`;
  }
  try {
    await mongoose.connect(URI);
    console.log("Connected to database");
  } catch (error) {
    console.log("Error", error);
  }
}

module.exports = {
  init,
};
