const express = require("express")

const actions = require('../data/helpers/actionModel')

const router = express.Router()

router.get('/', (req, res) => {
    actions
        .get(null)
        .then(actions => res.status(200).json(actions))
})

module.exports = router