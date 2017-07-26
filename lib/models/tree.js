const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    variety: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['deciduous', 'coniferous']
    },
    location: {
        current: String,
        past: [{
            previous: String,
            others: {
                type: [String]
            }
        }]
    },
    age: [{ 
        min: Number,
        max: Number
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model('Tree', schema);