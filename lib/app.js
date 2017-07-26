const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const Person = require("./models/person");

app.use(bodyParser.json());

app.post("/people", (req,res) => {
  console.log(req.body);
new Person(req.body)
  .save(req)
  .then((person, err) => {
    // send user errors here
    console.log(person)
    console.log('@@@@@: ',err);

    // res.send(person)}
    })
  .catch(err => {
    console.log(err);
    // send server/db errors here
  });

});
app.get("/people", (req, res) => {
  Person.find()
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
