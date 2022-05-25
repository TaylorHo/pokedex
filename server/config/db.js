const mongoose = require("mongoose");

const dbConnect = async () => {
  try {

    // Connect with the env var MONGO_URI
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(err);

    // Exit, because needs the DB running
    process.exit(1);
  }
};

module.exports = dbConnect;
