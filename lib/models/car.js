const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    brand: {
        type: String,
        required: true  
    },
    color: {
        type: String,
        required: true,
        enum: ['green', 'orange', 'silver'] 
    },
    address: {
        street: String,
        city: String,
        zip: String
    },
    style: [{
        name: {
            type: String,
            required: true
        },
        seats: Number
    }]
}, {
    timestamps: true
});
module.exports = mongoose.model('Car', schema);