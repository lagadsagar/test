

const { Pool } = require('pg');


const pool = new Pool({
    user :  "postgres",
    host : "localhost",
    database: "school",
    password: 'Kishor@2210',
    port : 5433
});



module.exports = { pool };
