const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const Person = require("./models/person");

app.use(bodyParser.json());

app.post("/people", (req,res) => {
  // console.log('in post: ',req.body);
  return new Person(req.body)
  .save(status => {
    console.log('-------')
    console.log(Object.entries(status[0].message));
    return status;
  })
  .then(s => {

    console.log('WOW!:   ',s);
    if(errors){
      console.log(Object.entries(errors));
      console.log('&&&&&&: ',errors);
    } else{
      res.send(person);
    }
    //   console.log('in post: ',person, errors);
    //   if(errors, ()  => {

    // let tmp = Object.entries(errors);
    // console.log(tmp.message);
    //   // tmp.forEach(k => {
    //     // console.log('k: ', k);
    //   // })
    //    });
  });

      // console.log('errors: ',Object.keys(errors));





  // })
     // send user errors here
    // console.log('then: ',person.name, res.err.errors);
    // console.log(person.name +' cannot be saved because '+ err.errors.message);

  // .catch(err => {
          // console.log(err);
            // res.status(500).send('Internal Server Error');
  // });

}),

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
