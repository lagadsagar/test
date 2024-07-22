const { pool } = require('./data');

const Admin = (req, res, next) => {
    const email = req.headers['email'];
    const password = req.headers['password'];

    console.log(email,password)

    pool.query('SELECT * FROM "admin" WHERE email = $1 AND password = $2', [email, password], (error, results) => {
        if (error) {
            return res.status(500).json({ error: error.message });
        }
        if (results.rowCount === 0) {
            return res.status(403).json({ error: "Invalid email or password" });
        }
        if (results){
            next();
        }
        
    });
};

module.exports = Admin;


