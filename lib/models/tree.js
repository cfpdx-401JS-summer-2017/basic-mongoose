const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    variety: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: ['deciduous', 'coniferous']
    },
    location: [{
        current: {
            type: String,
            required: true
        },
        past: [{
            previous: String,
            others: {
                type: [String]
            }
        }]
    }],
    age: [{ 
        min: Number,
        max: Number
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model('Tree', schema);