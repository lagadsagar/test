
const express = require('express')

const bodyParser = require('body-parser');
const {getStudents, getStudentById, createStudent, updateStudent, createTable, deleteStudent} = require("./queries");
const api_key = require('./apikey');
const user = require("./admin.js")

const app = express();
const port = 3000;



app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended : true
}));

app.get("/students", getStudents);
app.get("/students/:id", user, getStudentById);
app.put("/students/:id", user, updateStudent);
app.post("/create-table", createTable);
app.post("/students", api_key, createStudent);
app.delete("/students/:id",api_key, deleteStudent);


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });

