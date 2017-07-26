const mongoose = require('mongoose');

mongoose.Promise = Promise;

const dbUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/customers';

mongoose.connect(dbUri);

// MONGOOSE CONNECTION EVENTS

mongoose.connection.on('connected', function () {
    console.log('Mongoose default connection is open to ' + dbUri);
});

mongoose.connection.on('error', function (err) {
    console.log('Mongoose default connection open to ' + dbUri);
});

mongoose.connection.on('disconnected', function () {
    console.log('Mongoose default connection disconnected');
});

process.on('SIGINT', function () {
    mongoose.connection.close( function () {
        console.log( 'Mongoose default connection disconnected through app termination' );
        process.exit(0);
    });
});