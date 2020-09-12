const mongoose = require("mongoose");

const url = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/shoes-seller";

mongoose.connect(url, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
