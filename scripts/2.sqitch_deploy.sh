export PGUSER=admin_tmc
export PGPASSWORD=tmc

sqitch deploy 1.init
sqitch deploy 2.crud_functions