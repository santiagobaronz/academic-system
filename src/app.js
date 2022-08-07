/* Imports */
const express = require('express');
const path = require('path');
const fs = require("fs");
const bodyParser = require('body-parser');

/* Express functions */
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('./src'));
app.use(express.json());


/* This is a route that is listening for a GET request to the root of the server. When it receives a
request, it will set the content type to HTML and send the index.html file. */
app.get('/', (req, res) => {
    res.setHeader('Content-type', 'text/html');
    res.sendFile('index.html')
})

/* Students Root */

app.get('/api/students', (req, res) => {
    const file = fs.readFileSync('./src/db/students.json', 'utf-8');
    res.setHeader('Content-type', 'text/json');
    res.send(file);
});


app.get('/api/students/name/:name', (req, res) => {
    let file = fs.readFileSync('./src/db/students.json', 'utf-8');
    const json = JSON.parse(file);

    
    let studentsArray = [], student;
    studentsArray = json;

    for (let i = 0; i < studentsArray.students.length; i++) {
        const nameToCompare = `${studentsArray.students[i].name} ${studentsArray.students[i].lastName}`
        if(nameToCompare ==  req.params.name){
            student = studentsArray.students[i]
        }
    }

    if(!student) return res.send("No se encontró a este estudiante")
    else res.send(student);

});


app.get('/api/students/code/:code', (req, res) => {
    let file = fs.readFileSync('./src/db/students.json', 'utf-8');
    const json = JSON.parse(file);

    
    let studentsArray = [], student;
    studentsArray = json;

    for (let i = 0; i < studentsArray.students.length; i++) {
        if(studentsArray.students[i].code ==  req.params.code){
            student = studentsArray.students[i]
        }
    }

    if(!student) return res.send("No se encontró a este estudiante")
    else res.send(student);

});

app.get('/api/students/email/:email', (req, res) => {
    let file = fs.readFileSync('./src/db/students.json', 'utf-8');
    const json = JSON.parse(file);

    
    let studentsArray = [], student;
    studentsArray = json;

    for (let i = 0; i < studentsArray.students.length; i++) {
        if(studentsArray.students[i].email ==  req.params.email){
            student = studentsArray.students[i]
        }
    }

    if(!student) return res.send("No se encontró a este estudiante")
    else res.send(student);

});

app.get('/api/students/phone/:phone', (req, res) => {
    let file = fs.readFileSync('./src/db/students.json', 'utf-8');
    const json = JSON.parse(file);

    
    let studentsArray = [], student;
    studentsArray = json;

    for (let i = 0; i < studentsArray.students.length; i++) {
        if(studentsArray.students[i].phoneNumber ==  req.params.phone){
            student = studentsArray.students[i]
        }
    }

    if(!student) return res.send("No se encontró a este estudiante")
    else res.send(student);

});


/* A route that is listening for a POST request to the /new path. */
app.post('/new/student', (req,res) => {
    res.setHeader('Content-type', 'application/json');

    let file = fs.readFileSync('./src/db/students.json', 'utf-8');
    const json = JSON.parse(file);

    const getLastId = () => {
        let idToReturn;
        const arrayLength = json.students.length;
        arrayLength == 0 ? idToReturn = arrayLength + 1 : idToReturn = json.students[arrayLength - 1].id + 1;
        return idToReturn;
    }

    const name = req.body.name;
    const lastName = req.body.lastName;
    const age = req.body.age;
    const email = req.body.email;
    const phoneNumber = req.body.phoneNumber;
    const saveDate =  new Date().toLocaleString();
    const idToSave = getLastId();

    const student = {
        id: idToSave,
        code: `2022-${idToSave}`,
        name: name.trim(),
        lastName: lastName.trim(),
        age: parseInt(age),
        email: email.trim(),
        phoneNumber: phoneNumber.trim(),
        registrationDate: saveDate,
        courses: []
    };

    json.students.push(student);
    file = fs.writeFileSync('./src/db/students.json', JSON.stringify(json,null,2));
})



/* Courses Root */

app.get('/api/courses', (req, res) => {
    const file = fs.readFileSync('./src/db/courses.json', 'utf-8');
    res.setHeader('Content-type', 'text/json');
    res.send(file);
});

app.get('/api/courses/name/:name', (req, res) => {
    let file = fs.readFileSync('./src/db/courses.json', 'utf-8');
    const json = JSON.parse(file);

    let coursesArray = [], course;
    coursesArray = json;

    for (let i = 0; i < coursesArray.courses.length; i++) {
        const nameToCompare = coursesArray.courses[i].courseName

        if(nameToCompare ==  req.params.name){
            course = coursesArray.courses[i]
        }
    }

    if(!course) return res.send("No se encontró este curso")
    else res.send(course);

});

app.get('/api/courses/code/:code', (req, res) => {
    let file = fs.readFileSync('./src/db/courses.json', 'utf-8');
    const json = JSON.parse(file);

    let coursesArray = [], course;
    coursesArray = json;

    for (let i = 0; i < coursesArray.courses.length; i++) {
        const nameToCompare = coursesArray.courses[i].code

        if(nameToCompare ==  req.params.code){
            course = coursesArray.courses[i]
        }
    }

    if(!course) return res.send("No se encontró este curso")
    else res.send(course);

});

app.get('/api/courses/theoretical/all', (req, res) => {
    let file = fs.readFileSync('./src/db/courses.json', 'utf-8');
    const json = JSON.parse(file);

    let coursesArray = [], coursesResult = [];
    coursesArray = json;

    for (let i = 0; i < coursesArray.courses.length; i++) {
        const nameToCompare = coursesArray.courses[i].typeOfCourse

        if(nameToCompare ===  "Teorico"){
            coursesResult.push(coursesArray.courses[i])
        }
    }

    let VariableToReturn = JSON.stringify(coursesResult);

    if(coursesResult.length == 0) return res.send("No se encontró este curso")
    else res.send(VariableToReturn);

});

app.get('/api/courses/theoretical-practical/all', (req, res) => {
    let file = fs.readFileSync('./src/db/courses.json', 'utf-8');
    const json = JSON.parse(file);

    let coursesArray = [], coursesResult = [];
    coursesArray = json;

    for (let i = 0; i < coursesArray.courses.length; i++) {
        const nameToCompare = coursesArray.courses[i].typeOfCourse

        if(nameToCompare ===  "Teorico-Practico"){
            coursesResult.push(coursesArray.courses[i])
        }
    }

    let VariableToReturn = JSON.stringify(coursesResult);

    if(coursesResult.length == 0) return res.send("No se encontró este curso")
    else res.send(VariableToReturn);

});

// Cursoooooooooooooooooooooooooooooooooooos


app.post('/edit/course/theoretical', (req,res) => {
    res.setHeader('Content-type', 'application/json');

    let file = fs.readFileSync('./src/db/courses.json', 'utf-8');
    const json = JSON.parse(file);

    const courseId = req.body.courseId;
    const studentId = req.body.id;
    const grade1 = req.body.grade1;
    const grade2 = req.body.grade2;
    const grade3 = req.body.grade3;
    
    const course = {
        studentId: studentId,
        grade1: grade1,
        grade2: grade2,
        grade3: grade3
    }

    json.courses[courseId-1].students.push(course);
    file = fs.writeFileSync('./src/db/courses.json', JSON.stringify(json,null,2));
})








app.post('/edit/course', (req,res) => {
    res.setHeader('Content-type', 'application/json');

    let file = fs.readFileSync('./src/db/courses.json', 'utf-8');
    const json = JSON.parse(file);

    const code = req.body.id;
    console.log(code);

    json.courses[code].courseName = "XX"
    file = fs.writeFileSync('./src/db/courses.json', JSON.stringify(json,null,2));
})



app.post('/new/course', (req,res) => {
    res.setHeader('Content-type', 'application/json');

    let file = fs.readFileSync('./src/db/courses.json', 'utf-8');
    const json = JSON.parse(file);

    const getLastId = () => {
        let idToReturn;
        const arrayLength = json.courses.length;
        arrayLength == 0 ? idToReturn = arrayLength + 1 : idToReturn = json.courses[arrayLength - 1].id + 1;
        return idToReturn;
    }

    const courseName = req.body.CourseName;
    const courseType = req.body.selectCourse;
    const courseCredits = req.body.credits;
    const teacherName = req.body.teacherName;
    const saveDate =  new Date().toLocaleString();
    const idToSave = getLastId();

    const course = {
        id: idToSave,
        code: `2022-(C${idToSave})`,
        courseName: courseName.trim(),
        typeOfCourse: courseType.trim(),
        credits: courseCredits,
        teachersName: teacherName.trim(),
        creationDate: saveDate,
        students: []
    };

    json.courses.push(course);
    file = fs.writeFileSync('./src/db/courses.json', JSON.stringify(json,null,2));
})








/*app.delete('/api/students/:id', (req, res) => {
    const student = students.find(c => c.id === parseInt(req.params.id));
    if(!student) return res.status(404).send('Estudiante no encontrado');
    
    const index = students.indexOf(student);
    students.splice(index,1);
    res.send(student);
})*/

/* This is a way to set the port of the server. If the port is not set, it will use the default port
80. */
const port = process.env.port || 80;
app.listen(port, () => console.log(`Escuchando en el puerto ${port}...`));