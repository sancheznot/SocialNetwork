const { Router } = require("express");
const {
  public,
  save,
  getPublication,
  deletePublication,
  getOnePublicationUser,
  uploadFile,
  media,
  feed
} = require("../controllers/publications.controller");
const { auth } = require("../middleware/auth");
const { uploads } = require("../middleware/uploadsImg");
const routes = Router();

routes.get(`/public`, public);
routes.post("/save", auth, save);
routes.get("/get/:id", auth, getPublication);
routes.delete("/delete/:id", auth, deletePublication);
routes.get("/user/:id/:page?", auth, getOnePublicationUser);
routes.post('/imgpubupload/:id', [auth, uploads.single("file0")], uploadFile);
routes.get("/media/:file", media)
routes.get("/feed", auth, feed)

module.exports = routes;
