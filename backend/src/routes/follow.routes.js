const { Router } = require("express");
const {
  follow,
  saveFollower,
  deleteFollower,
  following,
  followers,
} = require("../controllers/follow.controller");
const { auth } = require("../middleware/auth");
const routes = Router();

routes.get("/follow", follow);
routes.post("/save", auth, saveFollower);
routes.delete("/unfollow/:id", auth, deleteFollower);
routes.get("/following/:id?/:page?", auth, following);
routes.get("/follower/:id?/:page?", auth, followers);

module.exports = routes;
