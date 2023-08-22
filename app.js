require("dotenv").config();
require("express-async-errors");

const express = require("express");
const errorHandlerMiddleware = require("./middleware/error-handler");
const notFound = require("./middleware/not-found");
const jwtRouter = require("./routes/jwt");
const app = express();

const port = 5000;

app.use(express.static("./public"));
app.use(express.json());

app.use("/api/v1", jwtRouter);

//Middleware
app.use(notFound);
app.use(errorHandlerMiddleware);
app.get("/", (req, res) => res.send("Hello World!"));

const start = async () => {
  try {
    app.listen(port, () =>
      console.log(`Example app listening on port ${port}!`)
    );
  } catch (error) {
    console.error(error);
  }
};

start();
