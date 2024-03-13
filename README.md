# REST API
Here is a REST API for a peer-to-peer car rental website. To build this API, I used Node.js, Sqitch, Faker, and PostgreSQL for database management.  

Download or clone then  
```
npm install
mv .env.example .env
mv sqitch.conf.example sqitch.conf
export PGUSER=<YOUR_USERNAME>
createuser admin_tmc -P
createdb tmc -O admin_tmc
bash scripts/1.init_sqitch.sh
bash scripts/2.sqitch_deploy.sh
npm run dev
```