require('dotenv').config();
const client = require('../app/database/client'); 
const { createUser, createVehicle, createAddress, createReview} = require('./createData');



/**
 * Import users into the database
 * @param {number} quantity - number of rows to import 
 * @returns {Promise<Array>} - A promise that resolves to an array of database queries
 */
function importUsers(quantity){
    const inserts = [];
    for (let userIndex = 0; userIndex < quantity; userIndex++){
        const user = createUser();
        const query = {
            text: 'INSERT INTO "user"(firstname, lastname, username, email, password, nationality, birthdate) VALUES ($1, $2, $3, $4, $5, $6, $7);',
            values: [user.firstname, user.lastname, user.username, user.email, user.password, user.nationality, user.birthdate]
        };
        inserts.push(client.query(query));
    };
    return Promise.all(inserts);
}

/**
 * Import vehicles into the database
 */
function importVehicles(quantity){
    const inserts = [];
    for (let vehicleIndex = 0; vehicleIndex < quantity; vehicleIndex++){
        const vehicle = createVehicle();
        const query = {
            text: 'INSERT INTO vehicle(type, nb_places, vehicle_plate, modele, price, owner_id) VALUES ($1, $2, $3, $4, $5, $6);',
            values: [vehicle.type, vehicle.nbPlaces, vehicle.vehiclePlate, vehicle.modele, vehicle.price, vehicle.ownerId]
        }
        inserts.push(client.query(query));
    };
    return Promise.all(inserts)
}

/**
 * Import addresses into the database
 */
function importAddresses(quantity){
    const inserts = [];
    for (let addressIndex = 0; addressIndex < quantity; addressIndex++){
        const address = createAddress(addressIndex+1);
        const query = {
            text: 'INSERT INTO address(city, country, street, zipcode, additionnal, owner_id) VALUES ($1, $2, $3, $4, $5, $6);',
            values: [address.city, address.country, address.street, address.zipcode, address.additionnal, address.ownerId]
        };
        inserts.push(client.query(query));
    };
    return Promise.all(inserts)
}

/**
 * Import reviews into the database
 */
function importReviews(quantity){
    const inserts = [];
    for (let reviewIndex = 0; reviewIndex < quantity; reviewIndex++){
        const review = createReview();
        const query = {
            text: 'INSERT INTO review(author_id, target_id, rating, comment) VALUES ($1, $2, $3, $4);',
            values: [review.authorId, review.targetId, review.rating, review.comment]
        };
        inserts.push(client.query(query));
    }
    return Promise.all(inserts);
}


client.connect()
    .then(() => console.log("Import des données..."))
    .then(() => importUsers(1000))
    .then(() => importVehicles(1250))
    .then(() => importAddresses(1000))
    .then(() => importReviews(4500))
    .then(() => console.log("Import des données terminé"))
    .finally(() => client.end());
