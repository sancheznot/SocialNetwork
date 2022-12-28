const { Router } = require("express");
const { userpueba, signup, signin } = require("../controllers/user.controller");
const routes = Router();

// const username = "sancheznot"

routes.get(`/user`, userpueba);
routes.post(`/signup`, signup);
routes.post(`/signin`, signin);

module.exports = routes;
