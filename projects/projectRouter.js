const express = require("express")

const projects = require("../data/helpers/projectModel")

const router = express.Router()

//  get request

router.get("/", (req, res) => {
    projects
      .get(null)
      .then((projects) => res.status(200).json(projects))
      .catch((err) => {
        res.status(500).json({
          message: "Error retriving the projects",
        })
      })
})


router.get('/:id', (req, res) => {
    projects
      .get(req.params.id)
      .then((project) => {
        project
          ? res.status(200).json(project)
          : res.status(404).json({ message: "project not found" })
      })
      .catch((err) =>
        res.status(500).json({ message: "Error retriving the project" })
      )
})


router.post('/', (req, res) => {
    projects
    .insert(req.body)
    .then(project => res.status(201).json(project))
})

module.exports = router