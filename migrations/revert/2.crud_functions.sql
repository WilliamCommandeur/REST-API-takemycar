-- Revert takemycar:2.crud_functions from pg

BEGIN;

DROP FUNCTION
    insert_user(json),
    insert_vehicle(json),
    insert_address(json),
    insert_review(json),
    update_user(json),
    update_vehicle(json),
    update_address(json),
    update_review(json);

COMMIT;
