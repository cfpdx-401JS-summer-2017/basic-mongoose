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
    locations: [String],
    ageEstimate: { 
        min: Number,
        max: Number
    }
});

module.exports = mongoose.model('Tree', schema);