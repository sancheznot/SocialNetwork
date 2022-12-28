const { Router } = require('express')
const {public} = require('../controllers/publications.controller')
const routes = Router()

routes.get(`/public`, public)

module.exports = routes
