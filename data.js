

const { Pool } = require('pg');


const pool = new Pool({
    user :  "postgres",
    host : "db",
    database: "school",
    password: 'Kishor@2210',
    port : 5432
});



module.exports = { pool };
