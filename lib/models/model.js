const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const requiredString = {
    type: String,
    required: true
}

const schema = new Schema({ 
    name: requiredString,
    style: requiredString,
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
    ],
    hopSchedule: [
        {
            name: requiredString,
            alpha: Number,
            beta: Number,
            type: requiredString,
            enum: [ 'whole', 'pellet', 'hash', 'cryo' ],
            use: {
                designation: String,
                enum: [ 'boil', 'aroma', 'dry hop', 'whirlpool' ],
                time: Number,
                timeUnit: String
            }
        }
    ],
});

module.exports = mongoose.model('Beer', schema);