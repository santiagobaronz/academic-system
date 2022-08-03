const express = require('express');
const path = require('path');
const fs = require("fs");
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('./src'));
app.use(express.json());


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

    const name = req.body.name;
    const lastName = req.body.lastName;
    const age = req.body.age;
    const email = req.body.email;
    const phoneNumber = req.body.phoneNumber;

    const student = {
        id: json.students.length + 1,
        code: `2022-${json.students.length + 1}`,
        name: name,
        lastName: lastName,
        age: parseInt(age),
        email: email,
        phoneNumber,
        courses: []
    };

    json.students.push(student);
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