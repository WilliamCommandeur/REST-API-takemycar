-- Deploy takemycar:1.init to pg

BEGIN;

-- Création du domaine pour les email
CREATE DOMAIN mail_address AS TEXT CHECK (VALUE ~ '^[a-zA-Z0-9.!#$%&''*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$');
-- Création de l'ENUM pour les rôles
CREATE TYPE role AS ENUM ('propriétaire', 'locataire', 'locataire/propriétaire');

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
    role role NOT NULL DEFAULT 'locataire'
);

-- Création de l'index sur les username
CREATE INDEX username_idx ON "user" USING btree(username);

-- Création de l'ENUM pour les types de véhicule
CREATE TYPE type_vehicle AS ENUM ('essence', 'diesel', 'électrique');
-- Création des domaines pour les nombres positifs
CREATE DOMAIN pint AS INT CHECK(VALUE > 0);
CREATE DOMAIN pnum AS numeric CHECK (VALUE > 0.0);

-- Création de la table véhicule
CREATE TABLE IF NOT EXISTS "vehicle"
(
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    type type_vehicle NOT NULL,
    nb_places pint NOT NULL,
    vehicle_plate TEXT NOT NULL,
    modele TEXT NOT NULL,
    price pnum NOT NULL,
    owner_id INT NOT NULL REFERENCES "user"(id) ON DELETE CASCADE
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
    owner_id INT NOT NULL REFERENCES "user"(id) ON DELETE CASCADE
);

-- Création du domaine pour les notes (0 à 5)
CREATE DOMAIN rating_domain AS numeric CHECK (VALUE >= 0.0 AND VALUE <= 5.0);

-- Création de la table review
CREATE TABLE IF NOT EXISTS "review"
(
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    author_id INT NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
    target_id INT NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
    rating rating_domain NOT NULL,
    comment TEXT
);

COMMIT;