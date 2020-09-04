const express = require("express")

const actions = require('../data/helpers/actionModel')

const router = express.Router()

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

module.exports = router