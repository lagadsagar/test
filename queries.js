
const { pool } = require("./data");

const getStudents = (request, response) => {
    pool.query('SELECT * FROM "student" ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error
        }
        return response.status(200).json(results.rows);
    })
};


const getStudentById = (request, response) => {
    const id = parseInt(request.params.id);
    pool.query('SELECT * FROM "student" WHERE id = $1', [id], (error, results) => {
        if (error) {
            return response.status(500).json({ error: "Failed to get student", message: error.message });
        }
        if (results.rowCount == 0) {
            return response.status(404).send("User not found");
        } else {
            return response.status(200).json(results.rows[0]);
        }
    });
};

const createTable = (request, response) => {
    pool.query(
        'CREATE TABLE IF NOT EXISTS "student" (id SERIAL PRIMARY KEY, name VARCHAR(100), age INT, city VARCHAR(400), phone BIGINT)',
        (error, results) => {
        if (error) {
            return response.status(500).json({ error: "Failed to create student table", message: error.message });
        }
        response.status(201).json({ message: "Table created successfully" });
    });
};


const createStudent = (request, response) => {
    const {name, age, city, phone } = request.body;
    pool.query(
        'INSERT INTO "student" (name, age, city, phone) VALUES ($1, $2, $3, $4) RETURNING *', [name, age, city, phone], 
        (error, results) => {
        if (error) {
            return response.status(500).json({ error: "Failed to create student", message: error.message });
        }
        //response.status(201).send("Student Created Successfully")
        response.status(201).json(results.rows[0]);
    });
};

const updateStudent = (request, response) => {
    const id = parseInt(request.params.id);
    try {
        const { name, age, city, phone } = request.body;
        pool.query('UPDATE "student" SET name = $1, age = $2, city = $3, phone = $4 WHERE id = $5 RETURNING *' , 
            [name, age, city, phone, id], (error, results) => {
            if (error) {
                throw error
            }
            response.status(201).json({ success: true, message: "Student created successfully", data: results.rows[0] });
            //response.status(200).json(results.rows);
        })
    } catch (error) {
        responseReturn.status = false;
    }
};

const deleteStudent = (request, response) => {
    const id = parseInt(request.params.id)
    pool.query('DELETE FROM "student" WHERE id = $1', [id], (error, results) => {
        if (error) {
            response.status(500).json({ error: "Failed to delete student", message: error.message });
        }
        //response.status(201).send("Student deleted");
        response.status(201).json({ success: true, message: "Student deleted successfully", data: results.rows[0] });
    })
}



module.exports = {
    getStudents,
    getStudentById,
    createTable,
    createStudent,
    updateStudent,
    deleteStudent

};