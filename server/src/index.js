const express = require("express");
const shoesRouter = require("./routers/shoes");
const authRouter = require("./routers/auth");
require("./db/mongoose");

const app = express();

const port = process.env.PORT || "5000";

app.use(express.json());
app.use(shoesRouter);
app.use(authRouter);

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
