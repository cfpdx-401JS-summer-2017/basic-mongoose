const mongoose = require('mongoose');
mongoose.Promise = Promise;

const dbUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/otters';
mongoose.connect(dbUri);

mongoose.connection.on('connected', function () {
    console.log('Mongoose default connection open to ' + dbUri); // eslint-disable-line
});

mongoose.connection.on('error', function (err) {
    console.log('Mongoose default connection error: ' + err); // eslint-disable-line
});

mongoose.connection.on('disconnected', function() {
    console.log('Mongoose default connection disconnected'); // eslint-disable-line
});

process.on('SIGINT', function() {
    mongoose.connection.close(function() {
        console.log('Mongoose default connection disconnected through app termination'); // eslint-disable-line
        process.exit(0);
    });
});