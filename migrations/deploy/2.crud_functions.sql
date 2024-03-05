-- Deploy takemycar:2.crud_functions to pg

BEGIN;

--Création des fonctions pour ajouter des utilisateurs, véhicules, adresses et reviews
CREATE FUNCTION insert_user(json) RETURNS "user" AS
$$
    INSERT INTO "user"(firstname, lastname, username, email, password, nationality, birthdate)
    VALUES(
        ($1 ->> 'firstname')::TEXT,
        ($1 ->> 'lastname')::TEXT,
        ($1 ->> 'username')::TEXT,
        ($1 ->> 'email')::mail_address,
        ($1 ->> 'password')::TEXT,
        ($1 ->> 'nationality')::TEXT,
        ($1 ->> 'birthdate')::TEXT
    ) RETURNING *;
$$ LANGUAGE sql STRICT;

CREATE FUNCTION insert_vehicle(json) RETURNS vehicle AS
$$
    INSERT INTO vehicle(type, nb_places, vehicle_plate, modele, price, owner_id)
    VALUES(
        ($1 ->> 'type')::type_vehicle,
        ($1 ->> 'nb_places')::pint,
        ($1 ->> 'vehicle_plate')::TEXT,
        ($1 ->> 'modele')::TEXT,
        ($1 ->> 'price')::pnum,
        ($1 ->> 'owner_id')::INT
    ) RETURNING *;
$$ LANGUAGE sql STRICT;

CREATE FUNCTION insert_address(json) RETURNS address AS
$$
    INSERT INTO address(city, country, street, zipcode, additionnal, owner_id)
    VALUES (
        ($1 ->> 'city')::TEXT,
        ($1 ->> 'country')::TEXT,
        ($1 ->> 'street')::TEXT,
        ($1 ->> 'zipcode')::TEXT,
        ($1 ->> 'additionnal')::TEXT,
        ($1 ->> 'owner_id')::INT
    ) RETURNING *;
$$ LANGUAGE sql STRICT;

CREATE FUNCTION insert_review(json) RETURNS review AS
$$
    INSERT INTO review(author_id, target_id, rating, comment)
    VALUES (
        ($1 ->> 'author_id')::INT,
        ($1 ->> 'target_id')::INT,
        ($1 ->> 'rating')::rating_domain,
        ($1 ->> 'comment')::TEXT
    ) RETURNING *;
$$ LANGUAGE sql STRICT;

--Création des fonctions pour modifier des utilsateurs, véhicules, adresses et reviews
CREATE FUNCTION update_user(json) RETURNS "user" AS
$$
    UPDATE "user" SET
        firstname = (($1 ->> 'firstname')::TEXT),
        lastname = (($1 ->> 'lastname')::TEXT),
        username = (($1 ->> 'username')::TEXT),
        email = (($1 ->> 'email')::mail_address),
        password = (($1 ->> 'password')::TEXT),
        nationality = (($1 ->> 'nationality')::TEXT),
        birthdate = (($1 ->> 'birthdate')::TEXT)
        WHERE id = (($1 ->> 'id')::INT)
        RETURNING *;
$$ LANGUAGE sql STRICT;

CREATE FUNCTION update_vehicle(json) RETURNS vehicle AS
$$
    UPDATE vehicle SET
        type = (($1 ->> 'type')::type_vehicle),
        nb_places = (($1 ->> 'nb_places')::pint),
        vehicle_plate = (($1 ->> 'vehicle_plate')::TEXT),
        modele = (($1 ->> 'modele')::TEXT),
        price = (($1 ->> 'price')::pnum),
        owner_id = (($1 ->> 'owner_id')::INT)
        WHERE id = (($1 ->> 'id')::INT)
        RETURNING *;
$$ LANGUAGE sql STRICT;

CREATE FUNCTION update_address(json) RETURNS address AS
$$
    UPDATE address SET
        city = (($1 ->> 'city')::TEXT),
        country = (($1 ->> 'country')::TEXT),
        street = (($1 ->> 'street')::TEXT),
        zipcode = (($1 ->> 'zipcode')::TEXT),
        additionnal = (($1 ->> 'additionnal')::TEXT),
        owner_id = (($1 ->> 'owner_id')::INT)
        WHERE id = (($1 ->> 'id')::INT)
        RETURNING *;
$$ LANGUAGE sql STRICT;

CREATE FUNCTION update_review(json) RETURNS review AS
$$
    UPDATE review SET
        author_id = (($1 ->> 'author_id')::INT),
        target_id = (($1 ->> 'target_id')::INT),
        rating = (($1 ->> 'rating')::rating_domain),
        comment = (($1 ->>'comment')::TEXT)
        WHERE id = (($1 ->> 'id')::INT)
        RETURNING *;
$$ LANGUAGE sql STRICT;

COMMIT;
