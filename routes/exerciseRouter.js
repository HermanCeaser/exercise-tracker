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

  // get all Users from the Database
  exerciseRouter.get("/exercises", (req, res) => {
    model.Exercise.find({}, (err, exercises) => {
      if (err) {
        return console.log(`Could not retrieve users from Database : ${err}`);
      }
      res.json(exercises);
    });
  });

  // Get Logs for a selected User
  exerciseRouter.get("/log", (req, res) => {
    let id = req.query.userId;
    if (id) {
      // Check if user Exists
      model.User.findById(id)
        .then((user) => {
          if (!user) throw new Error(err);
          return model.Exercise.find({ userId: id }).populate("userId");
        })
        .then((exercise) => {
          // console.log(exercise);
          res.json({
            _id: exercise[0].userId._id,
            username: exercise[0].userId.username,
            count: exercise.length,
            log: exercise.map((x) => ({
              description: x.description,
              duration: x.duration,
              date: x.date.toDateString(),
            })),
          });
        })
        .catch((err) => {
          return res.status(500).json({ error: "User not found" });
        });
    } else {
      return res.json({ error: "No UserId was passed" });
    }
    // res.send("Here is the Log for the Requested User");
  });

  // Add A User to database
  exerciseRouter.post("/new-user", (req, res) => {
    if (req.body.username) {
      const { username } = req.body;
      model.User.create({ username }, (err, user) => {
        if (err) return console.log(`Failed to create User due to : ${err}`);
        res.json({ _id: user._id, username: user.username });
      });
    }
  });

  // Add an Exercise for a user to the database
  exerciseRouter.post("/add", (req, res) => {
    // Check if Input parameters are not Empty
    if (req.body.userId && req.body.description && req.body.duration) {
      const { userId, description, duration, date } = req.body;
      //Check if user Exists in the Database
      const getUser = model.User.findById(userId);
      getUser // Create an Exercise Based on the passed User Id
        .then((user) => {
          return model.Exercise.create({
            userId: user._id,
            description: description,
            duration: parseInt(duration),
            date: date || new Date(),
          });
        })
        // Get the corresponding Username from User's Model
        .then((CreatedExercise) => {
          // console.log(CreatedExercise);
          return model.Exercise.findById(CreatedExercise._id).populate(
            "userId"
          );
        })
        // Return Populated Exercise Object with Username
        .then((data) => {
          // console.log(data);
          res.json({
            _id: data.userId._id,
            username: data.userId.username,
            date: data.date.toDateString(),
            duration: data.duration,
            description: data.description,
          });
        })
        // Catch any errors and pass them to the
        .catch((err) => {
          res.status(500).json({ error: err });
        });
    } else {
      return res.status(500).json({
        error: "userId, description and duration are all required",
      });
    }
  });

  return exerciseRouter;
};

module.exports = router;
