const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const requiredString = {
    type: String,
    required: true
};

const schema = new Schema({ 
    name: requiredString,
    style: {
        type: String,
        required: true,
        enum: ['imperial ipa', 'stout', 'pale ale', 'pilsner']},
    stats: {
        abv: Number,
        ibu: Number,
        og: Number,
        fg: Number
    },
    grainBill: [
        {
            name: String,
            weight: Number
        }
    ]
});

module.exports = mongoose.model('Beer', schema);