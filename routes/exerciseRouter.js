const express = require("express");
const exerciseRouter = express.Router();

const router = () => {
  exerciseRouter.get("/users", (req, res) => {
    res.send("View all Users");
  });
  exerciseRouter.get("/log/:userId", (req, res) => {
    res.send("Here is the Log for the Requested User");
  });
  exerciseRouter.post("/new-user", (req, res) => {
    res.send("User Added Succesfully");
  });
  exerciseRouter.post("/add", (req, res) => {
    res.send("New Exercise added Successfully");
  });

  return exerciseRouter;
};

module.exports = router;
