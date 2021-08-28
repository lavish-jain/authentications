const express = require("express");
const router = require("./routes");

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use(express.json());
app.use("/users", router);

app.listen(port, () => {
  console.log("App running and listening on port 3000!");
});
