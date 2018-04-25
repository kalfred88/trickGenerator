const mongoose = require('mongoose');

const trickSchema = mongoose.Schema({
    trickname: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true,
    },
    difficulty: {
        type: String,
        enum: ['easy', 'medium', 'hard', 'veryhard', 'extreme'],
        required: true
    },
    link: {
        type: String
    }
}, {
    timestamps: true
});


module.exports = mongoose.model('Trick', trickSchema);