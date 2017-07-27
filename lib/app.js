const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const Person = require("./models/person");

app.use(bodyParser.json());

app.post("/people", (req, res) => {
  return new Person(req.body)
  .save(status => {
    let errObject = { success: true, personName: req.body.name } || {};
    let tmp = 'errors';
    if(status && status.hasOwnProperty(tmp)) {
      for (var prop in status.errors) {
        errObject.errorName = prop;
        errObject.personName = req.body.name;
        errObject.message = status.errors[prop].message;
        errObject.success = false;
      }
    }
    res.send(errObject);
  });
});

app.get("/people", (req, res) => {
  Person.find()
    .lean() //used for read-only queries to optimize perfomance - skips mongoose extra data wrapper
    .count()
    .then(count => res.send({ count }))
    .catch(console.log);
});

// app.get('/unicorns/count', (req, res) => {
//     // use the Model method (we don't have a instance yet!)
//     // with findOne or findById to get a single object
//     Unicorn.find()
//         .count()
//         .then(count => res.send({ count }))
//         .catch(console.log);
// });

module.exports = app;
