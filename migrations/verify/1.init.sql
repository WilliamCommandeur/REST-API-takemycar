-- Verify takemycar:1.init on pg

BEGIN;

SELECT * FROM "user", "vehicle", "address", "review"

ROLLBACK;
