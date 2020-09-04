const express = require("express")

const actionsRouter = require('./actions/actionRouter')
const projectsRouter = require('./projects/projectRouter')

const server = express()
server.use(logger)
server.use(express.json())

server.get("/", (req, res) => {
  res.send(`<h2>Sprint Chanllege</h2>`)
})

server.use('/api/actions', actionsRouter)
server.use('/api/projects', projectsRouter)

function logger(req, res, next) {
  const { method, url } = req
  const time = new Date().toString().slice(15, 25)
  console.log(`a ${method} request was made to ${url} at ${time}`)
  next()
}

module.exports = server