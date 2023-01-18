const { Router } = require("express");
// -----------------------------
const {
  userpueba,
  signup,
  signin,
  getOneProfile,
  userList,
  updateProfile,
  imageProfile,
  showAvatar,
  counter,
} = require("../controllers/user.controller");
// ------------------------------
const { auth } = require("../middleware/auth");
const { uploads } = require("../middleware/uploadsImg");
const routes = Router();

// const username = "sancheznot"

routes.get(`/user`, auth, userpueba);
routes.post(`/signup`, signup);
routes.post(`/signin`, signin);
routes.get(`/profile/:id`, auth, getOneProfile);
routes.get(`/list/:page?`, auth, userList);
routes.put(`/update`, auth, updateProfile);
routes.post(`/imgupload`, [auth, uploads.single("file0")], imageProfile);
routes.get(`/avatar/:file`, showAvatar);
routes.get("/counters/:id", auth, counter);
module.exports = routes;
