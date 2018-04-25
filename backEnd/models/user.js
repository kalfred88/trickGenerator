const mongoose = require('mongoose');
const passportLocalMOngoose = require('passport-local-mongoose');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    stats: {
        sessions: {
            type: Number
        },
        generatedTricks: {
            type: Number
        },
        landedTricks: {
            type: Number
        }
    }
}, {
    timestamps: true
});

userSchema.plugin(passportLocalMOngoose);

module.exports = mongoose.model('User', userSchema);