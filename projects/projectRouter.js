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

router.get("/:id", (req, res) => {
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

// POST request

router.post("/", validateProject, (req, res) => {
  projects
    .insert(req.body)
    .then((project) => res.status(201).json(project))
    .catch((err) => res.status(500).json({ error: "error" }))
})

// PUT request

router.put('/:id', (req, res) => {
    projects
      .update(req.params.id, req.body)
      .then((project) => res.status(200).json(project))
      .catch((err) => res.status(500).json({ error: "error" }))
})

//Delete request

router.delete('/:id', (req, res) => {
    projects.remove(req.params.id)
    .then(project => res.status(200).json({message: "project deleted"}))
})

// Middleware

function validateProject(req, res, next) {
  if (req.body.name && req.body.description) {
    next()
  } else {
    res
      .status(400)
      .json({ message: "missing required name or description field" })
  }
}

module.exports = router
