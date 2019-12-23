const express = require("express");
const shoesRouter = require("./routers/shoes");

const app = express();

const port = process.env.PORT || "5000";

app.use(express.json());
app.use(shoesRouter);

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
