const express = require('express');
const path = require('path');
const fs = require("fs");
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('./src'));
app.use(express.json());

const students = [
    {"id": 1, "name": "Jorge", "age": 20, "enroll": true},
    {"id": 2, "name": "Manuel", "age": 30, "enroll": true},
    {"id": 3, "name": "Ana", "age": 40, "enroll": false}
]

app.get('/', (req, res) => {
    res.setHeader('Content-type', 'text/html');
    res.sendFile('index.html')
})

app.get('/api/students', (req, res) => {
    const file = fs.readFileSync('./src/db/students.json', 'utf-8');
    res.setHeader('Content-type', 'text/json');
    res.send(file);
});

/*app.get('/api/students/:id', (req, res) => {
    const student = students.find(c => c.id === parseInt(req.params.id));
    if(!student) return res.status(404).send('Estudiante no encontrado');
    else res.send(student);
})*/

app.post('/new', (req,res) => {
    res.setHeader('Content-type', 'text/html');

    let file = fs.readFileSync('./src/db/students.json', 'utf-8');
    const json = JSON.parse(file);

    const nombre = req.body.nombre;
    const edad = req.body.edad;

    const student = {
        id: json.estudiantes.length + 1,
        code: `2022-${id}`,
        name: nombre,
        lastName: lastName,
        age: parseInt(edad),
        courses: []
    };

    json.estudiantes.push(student);
    file = fs.writeFileSync('./src/db/students.json', JSON.stringify(json));
})

/*app.delete('/api/students/:id', (req, res) => {
    const student = students.find(c => c.id === parseInt(req.params.id));
    if(!student) return res.status(404).send('Estudiante no encontrado');
    
    const index = students.indexOf(student);
    students.splice(index,1);
    res.send(student);
})*/

const port = process.env.port || 80;
app.listen(port, () => console.log(`Escuchando en el puerto ${port}...`));