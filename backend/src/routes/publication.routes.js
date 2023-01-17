const { Router } = require("express");
const { public, save, getPublication } = require("../controllers/publications.controller");
const { auth } = require("../middleware/auth");
const routes = Router();

routes.get(`/public`, public);
routes.post("/save", auth, save);
routes.get('/get/:id', auth, getPublication );

module.exports = routes;
