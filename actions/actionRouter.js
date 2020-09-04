const express = require("express")

const actions = require('../data/helpers/actionModel')

const router = express.Router()

//GET request

router.get('/', (req, res) => {
    actions
      .get(null)
      .then((actions) => res.status(200).json(actions))
      .catch((err) => {
        console.log(err)
        res.status(500).json({ message: "error" })
      })
})

router.get('/:id', (req, res) => {
    actions
      .get(req.params.id)
        .then((action) => {
            action
              ? res.status(200).json(action)
              : res.status(404).json({ message: "action not found" })
        })
      .catch((err) =>
        res.status(500).json({ message: "Error retriving the action" })
      )
})

//POST request

router.post("/", validateAction, (req, res) => {
  actions
    .insert(req.body)
    .then((action) => res.status(201).json(action))
    .catch((err) => res.status(500).json({ error: "error" }))
})

//Middleware
function validateAction(req, res, next) {
  if (req.body.project_id && req.body.description) {
    next()
  } else {
    res
      .status(400)
      .json({ message: "missing required project id or description field" })
  }
}

module.exports = router