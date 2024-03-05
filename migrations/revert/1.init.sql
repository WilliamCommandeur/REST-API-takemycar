-- Revert takemycar:1.init from pg

BEGIN;

DROP INDEX username_idx;
DROP TABLE review, address, vehicle, "user";
DROP DOMAIN pint, pnum, mail_address, rating_domain;
DROP TYPE role, type_vehicle;

COMMIT;
