const {Router } = require('express')
const {follow} = require('../controllers/follow.controller')
const routes = Router()

routes.get('/follow' , follow )

module.exports = routes