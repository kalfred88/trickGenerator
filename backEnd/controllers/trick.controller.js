const Trick = require('../models/trick');

module.exports = {
    getTrick: (req, res) => {
        Trick.findById(req.params.id, (err, trick) => {
            if (err) {
                res.send(err)
            }
            res.json(trick)
        })
    },

    list: (req, res) => {
        Trick.find({}, (err, trick) => {
            if (err) {
                res.send(err)
            }
            res.json(trick)
        })
    },

    addTrick: (req, res) => {
        Trick.create(req.body, (err, trick) => {
            if (err) {
                res.send(err)
            }
            res.json(trick)
        })
    },

    updateTrick: (req, res) => {
        req.body.updatedAt = new Date().toLocaleString();
        Trick.findByIdAndUpdate(req.params.id, req.body, (err, trick) => {
            if (err) {
                res.send(err)
            }
            res.json(trick)
        })
    },

    deleteTrick: (req, res) => {
        Trick.findByIdAndRemove(req.params.id, (err, trick) => {
            if (err) {
                res.send(err)
            }
            res.json(trick)
        })
    }
}