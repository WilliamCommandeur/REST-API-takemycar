BEGIN;

-- Création du domaine pour les email
CREATE DOMAIN mail_address AS TEXT CHECK (VALUE ~ '^[\w\-\.]+@([\w\-]+\.)+[\w\-]{2,4}$');

-- Création de l'ENUM pour les rôles
CREATE TYPE ROLE AS ENUM ('propriétaire', 'locataire', 'locataire/propriétaire');

-- Création de la table user
CREATE TABLE IF NOT EXISTS"user"
(
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    firstname TEXT,
    lastname TEXT,
    username TEXT NOT NULL UNIQUE,
    email mail_address NOT NULL UNIQUE,
    password TEXT NOT NULL,
    nationality TEXT NOT NULL,
    birthdate TEXT NOT NULL,
    role ROLE DEFAULT 'locataire'
);

-- Création de l'ENUM pour les types de véhicule
CREATE DOMAIN type_vehicle AS ENUM ('essence', 'diesel', 'électrique');

-- Création de la table véhicule
CREATE TABLE IF NOT EXISTS "vehicle"
(
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    type type_vehicle NOT NULL,
    nb_places INT NOT NULL,
    vehicle_plate TEXT NOT NULL,
    modele TEXT NOT NULL,
    price INT NOT NULL,
    owner_id INT NOT NULL REFERENCES "user"(id)
);

-- Création de la table address
CREATE TABLE IF NOT EXISTS "address"
(
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    city TEXT NOT NULL,
    country TEXT NOT NULL,
    street TEXT NOT NULL,
    zipcode TEXT NOT NULL,
    additionnal TEXT,
    owner_id INT NOT NULL REFERENCES "user"(id)
);

-- Création de la table review
CREATE TABLE IF NOT EXISTS "review"
(
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    author_id INT NOT NULL REFERENCES "user"(id),
    target_id INT NOT NULL REFERENCES "user"(id),
    rating INT NOT NULL,
    comment TEXT
);

COMMIT;