require('dotenv').config();
const { faker } = require('@faker-js/faker/locale/fr');
const {Client} = require('pg');

const client = new Client(process.env.DB_URL);

const NB_users = 1e3;

function importUsers(){
    const inserts = [];
    for (let userIndex = 0; userIndex < NB_users; userIndex++){
        const firstname = faker.person.firstName();
        const lastname = faker.person.lastName();
        const username = `${lastname.toLowerCase()}_${firstname.toLowerCase()}${faker.number.int(99)}`;
        const email = faker.internet.email({firstName: firstname, lastName:lastname});
        const password = faker.internet.password();
        const nationality = faker.location.country();
        const birthdate = `${faker.date.birthdate()}`;
        const query = {
            text: 'INSERT INTO "user"(firstname, lastname, username, email, password, nationality, birthdate) VALUES ($1, $2, $3, $4, $5, $6, $7);',
            values: [firstname, lastname, username, email, password, nationality, birthdate]
        };
        inserts.push(client.query(query));
    };
    return Promise.all(inserts);
}

const NB_vehicles = 1250;
const vehicleType = ['essence', 'diesel', 'électrique'];
function generateRandomInt(min, max){
    return Math.floor(Math.random() * (max - min +1)) + min;
}
function importVehicles(){
    const inserts = [];
    for (let vehicleIndex = 0; vehicleIndex < NB_vehicles; vehicleIndex++){
        const type = vehicleType[generateRandomInt(0,2)];
        const nb_places = generateRandomInt(2, 7);
        const vehiclePlate = faker.vehicle.vrm();
        const modele = faker.vehicle.vehicle();
        const price = faker.number.float({fractionDigits:1, min:10, max:200});
        const owner_id = generateRandomInt(1,1000);
        const query = {
            text: 'INSERT INTO vehicle(type, nb_places, vehicle_plate, modele, price, owner_id) VALUES ($1, $2, $3, $4, $5, $6);',
            values: [type, nb_places, vehiclePlate, modele, price, owner_id]
        }
        inserts.push(client.query(query));
    };
    return Promise.all(inserts)
}

client.connect();
// importUsers();
importVehicles();
// client.end();