const express = require("express");
const services = require("./services");
const data = require("./load_data");

const router = express.Router();

router.get("/basic", async (req, res) => {
  try {
    if (!req.headers.authorization)
      throw "Please pass the basic authorisation header";
    const user_data = await services.basic(req.headers.authorization, data);
    res.status(200).send(user_data);
  } catch (err) {
    res.status(401).send(err);
  }
});

router.post("/jwt/login", async (req, res) => {
  try {
    if (!req.body || !req.body.username || !req.body.password)
      throw "No body/username/password";
    const { username, password } = req.body;
    const user_data = await services.jwt.login(username, password, data);
    res.status(200).send(user_data);
  } catch (err) {
    res.status(401).send(err);
  }
});

router.post("/jwt/something", async (req, res) => {
  try {
    const token =
      req.body.token || req.query.token || req.headers["x-access-token"];
    if (!token) throw "token is not passed";
    const user_data = await services.jwt.verifyToken(token);
    res.status(200).send(user_data);
  } catch (err) {
    res.status(401).send(err);
  }
});

module.exports = router;
