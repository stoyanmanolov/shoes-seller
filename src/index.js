const express = require("express");
const shoesRouter = require("./routers/shoes");
const authRouter = require("./routers/auth");
const ordersRouter = require("./routers/orders");
const path = require("path");
require("./db/mongoose");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const app = express();

const port = process.env.PORT || "5000";

app.use(express.json());
app.use(shoesRouter);
app.use(authRouter);
app.use(ordersRouter);
app.use("/images", express.static(__dirname + "/images"));

app.listen(port, () => {
  console.log("Server is up on port " + port);
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
