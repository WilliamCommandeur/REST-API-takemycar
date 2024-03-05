-- Verify takemycar:2.crud_functions on pg

BEGIN;

SELECT * FROM insert_user('{
    "firstname": "Jean",
    "lastname": "Dupont",
    "username": "jdupont",
    "email": "jean_dupont@test.fr",
    "password": "azerty123",
    "nationality": "Française",
    "birthdate": "01/01/1975"
}');

SELECT * FROM insert_vehicle('{
    "type": "essence",
    "nb_places" : 5,
    "vehicle_plate": "AB-123-CD",
    "modele": "Renault Twingo 3",
    "price": 30,
    "owner_id": 1
}');

SELECT * FROM insert_address('{
    "city": "Paris",
    "country": "France",
    "street": "Rue de la paix",
    "zipcode": "75000",
    "additionnal" : "3ème étage",
    "owner_id": 1
}');

SELECT * FROM insert_review('{
    "author_id": 1,
    "target_id": 2,
    "rating": 4.5,
    "comment": "Véhicule conforme aux photos, propriétaire très sympa"
}');

ROLLBACK;
