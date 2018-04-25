const User = require('../models/user');
const express = require('express');

module.exports = {
    getUser: (req, res) => {
        res.json({
            user: req.user
        })
    },

    /* register: (req, res, next) => {
        User.register(new User({
            username: req.body.username,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email
        }), req.body.password, (err) => {
            if (err) {
                res.json({
                    error: err
                })
            }
            res.json({
                success: "Sikeres regisztráció"
            })
        });
    }, */
    register: (req, res) => {
        const username = req.body.username;
        const email = req.body.email;
        const password = req.body.password;
        const password2 = req.body.password2;
        /*
         // Validation
         req.checkBody('username', 'Username is required!').notEmpty();
         req.checkBody('email', 'E-mail is required!').notEmpty();
         req.checkBody('email', 'E-mail is not valid!').isEmail();
         req.checkBody('password', 'Password is required!').notEmpty();
         req.checkBody('password2', 'Name is required!').equals(password);

         const errors = req.validationErrors();

         if (errors) {
             errors: errors
         }
         else {*/
        User.register(new User({
            username: username,
            email: email
        }), password, (err) => {
            if (err) {
                res.json({
                    error: err
                })
            }
            //res.redirect('/home')
            res.json({
                success: "Sikeres regisztráció"
            })
        });
        //}
    },

    update: (req, res) => {
        // Validate Request
        if (!req.body.email) {
            return res.status(400).send({
                message: "User email can not be empty"
            });
        }

        // Find user and update it with the request body
        User.findByIdAndUpdate(req.params.userId, {
                email: req.body.email || "Untitled User",
                password: req.body.password
            }, {
                new: true
                //The {new: true} option in the findByIdAndUpdate() method is used to return the modified document to the then() function instead of the original.
            })
            .then(user => {
                if (!user) {
                    return res.status(404).send({
                        message: "User not found with id " + req.params.userId
                    });
                }
                res.send(user);
            }).catch(err => {
                if (err.kind === 'ObjectId') {
                    return res.status(404).send({
                        message: "User not found with id " + req.params.userId
                    });
                }
                return res.status(500).send({
                    message: "Error updating user with id " + req.params.userId
                });
            });
    },

    delete: (res, req) => {
        const query = {
            _id: id
        };
        User.remove(query);
    },

    login: (req, res) => {
        res.json({
            user: req.user,
            success: "Sikeres login"
        })
    },

    logout: (req, res) => {
        req.logout();
        //res.redirect('/');
        res.json({
            success: "Sikeres logout"
        })
    }
}