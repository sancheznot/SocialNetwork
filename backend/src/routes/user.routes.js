const { Router } = require("express");
const { router } = require("../app");
const { userpueba, signup, signin, getOneProfile, userList } = require("../controllers/user.controller");
const { auth } = require("../middleware/auth");
const routes = Router();

// const username = "sancheznot" 

routes.get(`/user`, auth, userpueba);
routes.post(`/signup`, signup);
routes.post(`/signin`, signin);
routes.get(`/profile/:id`,auth, getOneProfile)
routes.get(`/list/:page?`, auth, userList)
module.exports = routes; 
