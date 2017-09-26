
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const schema = new Schema({

    name: {
        type: String,
        required: true
    },
    company: {
        type:String,
        required: true
    },
    products: {
        type: String,
        enum: ['workflow', 'support', 'portal', 'designer', 'cms', 'storage']
    },
    address: {
        street: String,
        city: String,
        state: String,
        zip: String
    },
    tier: {
        name: {
            type: String,
            required: true
        },
        level: Number,
        status: String

    }
}, {timestamps: true
});

module.exports = mongoose.model('Customer', schema);