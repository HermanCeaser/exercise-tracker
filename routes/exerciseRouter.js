const express = require("express");
const exerciseRouter = express.Router();

const router = (model) => {
  // get all Users from the Database
  exerciseRouter.get("/users", (req, res) => {
    model.User.find({}, (err, users) => {
      if (err) {
        return console.log(`Could not retrieve users from Database : ${err}`);
      }
      res.json(users);
    });
  });

  exerciseRouter.get("/log/:userId", (req, res) => {
    res.send("Here is the Log for the Requested User");
  });

  // Add A User to database
  exerciseRouter.post("/new-user", (req, res) => {
    if (req.body.username) {
      const { username } = req.body;
      model.User.create({ name: username }, (err, user) => {
        if (err) return console.log(`Failed to create User due to : ${err}`);
        res.json({ username: user.name, id: user._id });
      });
    }
  });

  // Add an Exercise for a user to the database
  exerciseRouter.post("/add", (req, res) => {
    // validateDate();
    if (req.body.userId && req.body.description && req.body.duration) {
      const { userId, description, duration, date } = req.body;
      model.User.findById(userId, (err, status) => {
        if (err) return console.log("User does not exist");
        model.Exercise.create(
          {
            userId: userId,
            description: description,
            duration: parseInt(duration),
            date: date || new Date(),
          },
          (err, data) => {
            if (err) return console.log(err);
            console.log(data);
            res.json({
              _id: data._id,
              userId: data.userId,
              date: data.date.toDateString(),
              duration: data.duration,
              description: data.description,
            });
          }
        );
      });
    } else {
      return res.json({
        error: "userId, description and duration are all required",
      });
    }
  });

  return exerciseRouter;
};

module.exports = router;
