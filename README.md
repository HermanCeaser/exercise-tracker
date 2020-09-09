# exercise-tracker

### A Microservice Project that track user ids together with their exercises.

[![Run on Repl.it](https://repl.it/badge/github/HermanCeaser/exercise-tracker)](https://repl.it/github/HermanCeaser/exercise-tracker)

### User Stories

1. I can create a user by posting form data username to `/api/exercise/new-user` and returned will be an object with username and \_id.
2. I can get an array of all users by getting `api/exercise/users` with the same info as when creating a user.
3. I can add an exercise to any user by posting form data userId(\_id), description, duration, and optionally date to /api/exercise/add. If no date supplied it will use current date. Returned will be the user object with also with the exercise fields added.
4. I can retrieve a full exercise log of any user by getting `/api/exercise/log/:userId` with a parameter of userId(\_id). Return will be the user object with added array log and count (total exercise count).
5. I can retrieve part of the log of any user by also passing along optional parameters of from & to or limit. (Date format yyyy-mm-dd, limit = int)

### Local Installation

- Clone the Repo by running `git clone https://github.com/HermanCeaser/exercise-tracker.git`
- change into the cloned repo by running `cd exercise-tracker`
- Run `npm install` to install project dependencies
- Create a `.env` file and add your database URI i.e `DB_URI=mongodb://localhost/exercise-tracker` and ensure mongodb is running
- run `npm start` and you should be good to go

### Pull Request

For any features, Feel free to create a pull Request.
