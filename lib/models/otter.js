const mongoose = require('mongoose');
// require the Schema class
const Schema = mongoose.Schema;

const schema = new Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: ['river', 'sea', 'space', 'angry']
    },
    color: {
        type: String
    },
    food: [{
        name: {
            type: String,
            required: true
        },
        lbs: Number
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model('Otter', schema);