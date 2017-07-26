const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    name: {
        type: String,
        required: true
    },
    continent: {
        type: String,
        required: true,
        enum: ['Africa', 'Antarctica', 'Asia', 'Australia', 'Europe', 'North America', 'South America']
    },
    language: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model('Countries', schema);
