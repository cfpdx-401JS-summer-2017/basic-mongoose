const mongoose = require('mongoose');
// native V8 promise
mongoose.Promise = Promise;

// this env name MONGODB_URI is used by heroku when adding an mLab instance
const dbUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/otters';
mongoose.connect(dbUri);

// when successfully connected
mongoose.connection.on('connected', function () {
    console.log('Mongoose default connection open to ' + dbUri); // eslint-disable-line
});

// if the connection throws an error
mongoose.connection.on('error', function (err) {
    console.log('Mongoose default connection error: ' + err); // eslint-disable-line
});

// when the connection is disconnected
mongoose.connection.on('disconnected', function() {
    console.log('Mongoose default connection disconnected'); // eslint-disable-line
});

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', function() {
    mongoose.connection.close(function() {
        console.log('Mongoose default connection disconnected through app termination'); // eslint-disable-line
        process.exit(0);
    });
});