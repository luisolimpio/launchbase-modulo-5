require("dotenv/config")
const express = require('express')
const nunjucks = require('nunjucks')
const methodOverride = require('method-override')

const routes = require('./routes')

const server = express()

server.use(express.urlencoded({
    extended: true
}))

server.use(express.static('public'))
server.use(methodOverride('_method'))
server.use(routes)

server.set("view engine", "njk")

nunjucks.configure("src/app/views", {
    express: server,
    autoescape: false,
    noCache: true
})

server.listen(process.env.PORT, function(req, res){
    console.log('Server is running!')
})