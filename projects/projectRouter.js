const express = require("express")

const projects = require("../data/helpers/projectModel")

const router = express.Router()

router.get("/", (req, res) => {
  projects.get(null).then((projects) => res.status(200).json(projects))
})

router.post('/', (req, res) => {
    projects
    .insert(req.body)
    .then(project => res.status(201).json(project))
})

module.exports = router