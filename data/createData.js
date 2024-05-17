const { faker } = require('@faker-js/faker/locale/fr');
const { generateRandomInt } = require('../app/util/randomInt');
const {
  User, Vehicle, Address, Review,
} = require('../app/models');

/**
 * Creates a new user with random data
 * @returns {User} A new instance of User class
 */
function createUser() {
  const firstname = faker.person.firstName();
  const lastname = faker.person.lastName();
  const username = `${lastname.toLowerCase()}_${firstname.toLowerCase()}${faker.number.int(99)}`;
  const email = faker.internet.email({ firstName: firstname, lastName: lastname });
  const password = faker.internet.password();
  const nationality = faker.location.country();
  const birthdate = `${faker.date.birthdate()}`;

  const user = new User(firstname, lastname, username, email, password, nationality, birthdate);
  return user;
}

/**
 * Create a new vehicle with random data
 * @returns {Vehicle} A new instance of Vehicle class
 */
function createVehicle() {
  const vehicleType = ['essence', 'diesel', 'électrique'];
  const type = vehicleType[generateRandomInt(0, 2)];
  const nbPlaces = generateRandomInt(2, 7);
  const vehiclePlate = faker.vehicle.vrm();
  const modele = faker.vehicle.vehicle();
  const price = faker.number.float({ fractionDigits: 1, min: 10, max: 200 });
  const ownerId = generateRandomInt(1, 1000);

  const vehicle = new Vehicle(type, nbPlaces, vehiclePlate, modele, price, ownerId);
  return vehicle;
}

/**
 * Creates a new address with random data
 * I need to pass a parameter variable that will be incremented when I import my data into the database so that each user has an associated address.
 * @param {number} counter - The ID of the owner associated with the address
 * @returns {Address} A new instance of Address class
 */
function createAddress(counter) {
  const city = faker.location.city();
  const country = 'France';
  const street = faker.location.streetAddress();
  const zipcode = faker.location.zipCode();
  const additionnal = faker.location.secondaryAddress();
  const ownerId = counter;

  const address = new Address(city, country, street, zipcode, additionnal, ownerId);
  return address;
}

/**
 * Creates a new review with random data
 * @returns {Review} A new instance of Review class
 */
function createReview() {
  const authorId = generateRandomInt(1, 1000);
  let targetId = generateRandomInt(1, 1000);
  if (targetId === authorId) {
    targetId = generateRandomInt(1, 1000);
  }
  const rating = generateRandomInt(100, 500) / 100;
  const comment = faker.lorem.words(15);

  const review = new Review(authorId, targetId, rating, comment);
  return review;
}

module.exports = {
  createUser,
  createVehicle,
  createAddress,
  createReview,
};
