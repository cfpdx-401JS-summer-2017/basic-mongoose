const Person = require("../lib/models/person");
const { assert } = require("chai");
// { assert } is "destructuring" and in this case refers to the assert property of chai

describe("person model tests", () => {
  it("model fails validation", () => {
    const person = new Person({
      name: "Larry",
      heightInInches: "58",
      likesRollerCoasters: null
    });
    return person.validate().catch(() => {
      ({ errors }) => {
        assert.equal(
          errors.heightInInches.properties.message,
          "Sorry! You're too short to ride the roller coaster. ☹️"
        );
        assert.equal(errors.likesRollerCoasters.value, null);
      };
    });
  }), it("model passes validation", () => {
    const person = new Person({
      heightInInches: "74",
      name: "Leisure Suit Larry",
      likesRollerCoasters: true
    });
    return person
      .validate()
      .then(() => {
        assert.equal(person.name, "Leisure Suit Larry");
        assert.equal(person.likesRollerCoasters, true);
      })
      .catch(
        () => {
          throw new Error("Validation errors");
        },
        ({ errors }) => {
          console.log(errors);
        }
      );
  }), it("tests quirks Schema", () => {
    const person = new Person({
      name: "Kerri",
      heightInInches: "62",
      likesRollerCoasters: true,
      quirks: [
        {
          annoying: "talks really slowly"
        },
        {
          odd: "is nocturnal"
        }
      ]
    });
    return person
      .validate()
      .then(() => {
        assert.equal(person.heightInInches, "62");
        assert.equal(person.quirks[0].annoying, "talks really slowly");
      })
      .catch(
        () => {
          throw new Error("Validation errors");
        },
        ({ errors }) => {
          console.log(errors);
        }
      );
  }), it("checks properties that are out of order", () => {
    const person = new Person({
      heightInInches: "62",
      name: "Winona Ryder",
      likesRollerCoasters: true
    });
    return person
      .validate()
      .then(() => {
        assert.equal(person.name, "Winona Ryder");
        assert.ok(person.timestamp);
      })
      .catch(
        () => {
          throw new Error("Validation errors");
        },
        ({ errors }) => {
          console.log(errors);
        }
      );
  });
});
