rm migrations/sqitch.plan

sqitch init takemycar --engine pg --top-dir migrations

sqitch add 1.init -n "création des tables"
sqitch add 2.crud_functions -n "ajout des fonctions CRUD"
