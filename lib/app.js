const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const Person = require("./models/person");

app.use(bodyParser.json());

// app.get('/unicorns/count', (req, res) => {
//     // use the Model method (we don't have a instance yet!)
//     // with findOne or findById to get a single object
//     Unicorn.find()
//         .count()
//         .then(count => res.send({ count }))
//         .catch(console.log);
// });
