const { Router } = require("express");
const { prueba } = require("../controllers/prueba");
const router = Router();

router.get("/", prueba);

module.exports = router;
