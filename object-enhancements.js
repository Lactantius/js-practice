/* Same keys and values */
/* Old version */
function createInstructor(firstName, lastName) {
  return {
    firstName: firstName,
    lastName: lastName,
  };
}

/* Write an ES2015 Version */
function createES2015Instructor(firstName, lastName) {
  return {
    firstName,
    lastName,
  };
}

/* Computed property names */
/* Old version */
var favoriteNumber = 42;

var instructor = {
  firstName: "Colt",
};

instructor[favoriteNumber] = "That is my favorite!";

/* Write an ES2015 Version */

const favoriteNumberES2015 = 42;
const instructorES2015 = {
  firstName: "Colt",
  [favoriteNumber]: "That's my favorite!",
};

/* Object Methods */
/* Old version */
var instructor = {
  firstName: "Colt",
  sayHi: function () {
    return "Hi!";
  },
  sayBye: function () {
    return this.firstName + " says bye!";
  },
};

/* Write an ES2015 Version */
const instructorColt = {
  firstName: "Colt",
  sayHi() {
    return "Hi!";
  },
  sayBye() {
    return this.firstName + " says bye!";
  },
};

/* createAnimal function */
function createAnimal(species, verb, noise) {
  return {
    species,
    [verb]() {
      return noise;
    },
  };
}
