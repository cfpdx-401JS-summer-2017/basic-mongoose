<img src="https://cloud.githubusercontent.com/assets/478864/22186847/68223ce6-e0b1-11e6-8a62-0e3edc96725e.png" width=30> Mongoose Models
===

## Description

This assignment has you practicing full CRUD for a validated resource using ExpressJS and Mongoose.

Pick a resource, for example `unicorns`.

Create a single overall express app that uses a `lib` folder with a `models` folder.

For your resource:

* Create a schema and model: 
    * Pick one or two validations that the schema will have. 
    * Unit test the model showing the model failing validation and test a successful model.
    * Implement the validation
    * Also include in your schema:
        * Include a complex object property (a property that has subfields, like an address with city, state, zip)
        * An array property (a property that holds zero or more of some values)
* Create HTTP REST routes:
    * Write E2E API tests for all of the exposed routes
    * Routes are:
        * `GET /resources` list ([]) of all the resources
        * `GET /resources/:id` return single resource object with that id (or 404 if doesn't exist)
        * `POST /resources` add a new resource and return new entity from db with _id
        * `DELETE /resource/:id` Delete the resource with that id. Return `{ removed: <result> }` where `<result>`
        is `true` if it was deleted, otherwise `false`.
        * `PUT /resource/:id` The resources is updated, meaning the old document content is entirely replaced with the new
        content from the request body. 
        
#### Rubric:

* Resource
    * Schema and Model *2pts*
    * Model Unit Tests *2pts*
* Use Model and instance methods in routes *1pt* each = *5pts*
* Express App Project Structure (lib, lib/models, tests): *1pt*
