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


/* Upload Data */

app.post('/upload/data', (req, res) => {
    res.setHeader('Content-type', 'text/html');

    let fileStudents = fs.readFileSync('./src/db/students.json', 'utf-8');
    let jsonStudents = JSON.parse(fileStudents);
    let fileCourses = fs.readFileSync('./src/db/courses.json', 'utf-8');
    let jsonCourses = JSON.parse(fileCourses);

    let fileStudentsDF = fs.readFileSync('./src/db/backup/studentsDF.json', 'utf-8');
    let jsonStudentsDF = JSON.parse(fileStudentsDF);
    let fileCoursesDF = fs.readFileSync('./src/db/backup/coursesDF.json', 'utf-8');
    let jsonCoursesDF = JSON.parse(fileCoursesDF);

    jsonCourses = jsonCoursesDF;
    jsonStudents = jsonStudentsDF;

    fileCourses = fs.writeFileSync('./src/db/courses.json', JSON.stringify(jsonCourses,null,2));
    fileStudents = fs.writeFileSync('./src/db/students.json', JSON.stringify(jsonStudents,null,2));

})


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

app.get('/api/students/check/:noEnrolled', (req, res) => {
    let file = fs.readFileSync('./src/db/students.json', 'utf-8');
    const json = JSON.parse(file);

    let studentsArray = []
    const students = json.students;

    for (let i = 0; i < json.students.length; i++) {
        if(json.students[i].courses.length == 0){
            studentsArray.push(json.students[i]);
        }
    }

    res.send(studentsArray);
});


/* Reading the students.json file and then it is comparing the name of the student with the name that
is passed in the url. If the name is found, it returns the student object, if not, it returns a
message. */
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

    if(!student) return res.send("No se encontr?? a este estudiante")
    else res.send(student);

});


/* Reading the students.json file and then it is comparing the code of the student with the code that
is passed in the url. If the code is found, it returns the student object, if not, it returns a
message. */
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

    if(!student) return res.send("No se encontr?? a este estudiante")
    else res.send(student);

});

/* Reading the students.json file and then it is comparing the email of the student with the email that
is passed in the url. If the email is found, it returns the student object, if not, it returns a
message. */
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

    if(!student) return res.send("No se encontr?? a este estudiante")
    else res.send(student);

});

/* Reading the students.json file and then it is comparing the phone of the student with the phone that
is passed in the url. If the phone is found, it returns the student object, if not, it returns a
message. */
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

    if(!student) return res.send("No se encontr?? a este estudiante")
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

    const index = (element) => element.email == email;
    const checkArray = json.students.some(index);

    if(!checkArray){

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

    }

})



/* Courses Root */

app.get('/api/courses', (req, res) => {
    const file = fs.readFileSync('./src/db/courses.json', 'utf-8');
    res.setHeader('Content-type', 'text/json');
    res.send(file);
});

/* Reading the courses.json file and then it is comparing the name of the course with the name that
is passed in the url. If the name is found, it returns the course object, if not, it returns a
message. */
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

    if(!course) return res.send("No se encontr?? este curso")
    else res.send(course);

});


/* Reading the courses.json file and then it is comparing the code of the course with the code that
is passed in the url. If the code is found, it returns the course object, if not, it returns a
message. */
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

    if(!course) return res.send("No se encontr?? este curso")
    else res.send(course);

});

/* Reading the courses.json file and then it is comparing the type of the course with the type that
is passed in the url. If the type is found, it returns the courses array, if not, it returns a
message. */
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

    if(coursesResult.length == 0) return res.send("No se encontr?? este curso")
    else res.send(VariableToReturn);

});

/* Reading the courses.json file and then it is comparing the type of the course with the type that
is passed in the url. If the type is found, it returns the courses array, if not, it returns a
message. */
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

    if(coursesResult.length == 0) return res.send("No se encontr?? este curso")
    else res.send(VariableToReturn);

});


/* Edit a student */
app.post('/edit/student', (req,res) => {
    res.setHeader('Content-type', 'application/json');

    let fileStudents = fs.readFileSync('./src/db/students.json', 'utf-8');
    const jsonStudents = JSON.parse(fileStudents);

    const studentId = req.body.studentId;
    const studentName = req.body.studentName;
    const studentLastName = req.body.studentLastName;
    const studentEmail = req.body.studentEmail;
    const studentPhone = req.body.studentPhone;
  

    const index = (element) => element.id == studentId;
    const indexArray = jsonStudents.students.findIndex(index);
    
    jsonStudents.students[indexArray].name = studentName;
    jsonStudents.students[indexArray].lastName = studentLastName;
    jsonStudents.students[indexArray].email = studentEmail;
    jsonStudents.students[indexArray].phoneNumber = studentPhone;
    fileStudents = fs.writeFileSync('./src/db/students.json', JSON.stringify(jsonStudents,null,2));

})

/* Delete a student */
app.post('/delete/student', (req,res) => {
    res.setHeader('Content-type', 'application/json');

    const studentId = parseInt(req.body.studentId);

    // Eliminar estudiante de la DB
    // Eliminar notas del estudiante en los cursos en los que este

    let fileCourses = fs.readFileSync('./src/db/courses.json', 'utf-8');
    const jsonCourses = JSON.parse(fileCourses);

    let fileStudents = fs.readFileSync('./src/db/students.json', 'utf-8');
    const jsonStudents = JSON.parse(fileStudents);

    const index = (element) => element.id == studentId;
    const indexArray = jsonStudents.students.findIndex(index);

    if(indexArray != -1){
        const courseToDelete = jsonStudents.students[indexArray].courses;

        courseToDelete.forEach(course => {
            const courseId = course.courseId

            const index = (element) => element.id == courseId;
            const indexCArray = jsonCourses.courses.findIndex(index);
            const studentsArray = jsonCourses.courses[indexCArray].students;
            const newStudentsArray = studentsArray.filter((item) => item.studentId !== String(studentId));
            jsonCourses.courses[indexCArray].students = newStudentsArray;
            fileCourses = fs.writeFileSync('./src/db/courses.json', JSON.stringify(jsonCourses,null,2));
        });
    }

    const newCoursesArray = jsonStudents.students.filter((item) => item.id !== studentId);
    jsonStudents.students = newCoursesArray;
    fileStudents = fs.writeFileSync('./src/db/students.json', JSON.stringify(jsonStudents,null,2));

})

/* Edit a course */
app.post('/edit/course/theoretical', (req,res) => {
    res.setHeader('Content-type', 'application/json');

    let fileCourses = fs.readFileSync('./src/db/courses.json', 'utf-8');
    const jsonCourses = JSON.parse(fileCourses);

    let fileStudents = fs.readFileSync('./src/db/students.json', 'utf-8');
    const jsonStudents = JSON.parse(fileStudents);

    const courseId = parseInt(req.body.courseId);
    const studentId = parseInt(req.body.id);
    const grade1 = req.body.grade1;
    const grade2 = req.body.grade2;
    const grade3 = req.body.grade3;
    const credits = parseInt(req.body.credits);
    let finalNote = (grade1*0.35) + (grade2*0.35) + (grade3*0.30);
    finalNote = Math.round(finalNote);

    const indexFunction = (element) => element.id == courseId; 
    const indexOfCourse = jsonCourses.courses.findIndex(indexFunction)

    const check1 = (element) => element.studentId == studentId;
    const checkArray = jsonCourses.courses[indexOfCourse].students.some(check1);

    if(!checkArray){
        const course_Courses = {
            studentId: studentId,
            grade1: grade1,
            grade2: grade2,
            grade3: grade3,
            finalNote: finalNote
        }
    
        const course_Students = {
            courseId: courseId,
            finalNote: finalNote,
            credits: credits
        }
    
        const index = (element) => element.id == studentId; 
        jsonStudents.students[jsonStudents.students.findIndex(index)].courses.push(course_Students);
        fileStudents = fs.writeFileSync('./src/db/students.json', JSON.stringify(jsonStudents,null,2));
        
        const index2 = (element) => element.id == courseId; 
        jsonCourses.courses[jsonCourses.courses.findIndex(index2)].students.push(course_Courses);
        fileCourses = fs.writeFileSync('./src/db/courses.json', JSON.stringify(jsonCourses,null,2));
    }
    

})

/* Edit a course */
app.post('/edit/course/theoretical-practical', (req,res) => {
    res.setHeader('Content-type', 'application/json');

    let fileCourses = fs.readFileSync('./src/db/courses.json', 'utf-8');
    const jsonCourses = JSON.parse(fileCourses);

    let fileStudents = fs.readFileSync('./src/db/students.json', 'utf-8');
    const jsonStudents = JSON.parse(fileStudents);

    const courseId = parseInt(req.body.courseId);
    const studentId = parseInt(req.body.id);
    const grade1 = req.body.grade1;
    const grade2 = req.body.grade2;
    const grade3 = req.body.grade3;
    const grade4 = req.body.grade4;
    const credits = parseInt(req.body.credits);
    let finalNote = (grade1*0.30) + (grade2*0.25) + (grade3*0.20) + (grade4*0.25);
    finalNote = Math.round(finalNote);

    const indexFunction = (element) => element.id == courseId; 
    const indexOfCourse = jsonCourses.courses.findIndex(indexFunction)

    const check1 = (element) => element.studentId == studentId;
    const checkArray = jsonCourses.courses[indexOfCourse].students.some(check1);

    if(!checkArray){

        const course_Courses = {
            studentId: studentId,
            grade1: grade1,
            grade2: grade2,
            grade3: grade3,
            grade4: grade4,
            finalNote: finalNote
        }
    
        const course_Students = {
            courseId: courseId,
            finalNote: finalNote,
            credits: credits
        }
    
        const index = (element) => element.id == studentId; 
    
        jsonStudents.students[jsonStudents.students.findIndex(index)].courses.push(course_Students);
        fileStudents = fs.writeFileSync('./src/db/students.json', JSON.stringify(jsonStudents,null,2));
        
        const index2 = (element) => element.id == courseId; 
    
        jsonCourses.courses[jsonCourses.courses.findIndex(index2)].students.push(course_Courses);
        fileCourses = fs.writeFileSync('./src/db/courses.json', JSON.stringify(jsonCourses,null,2));

    }
})

/* Update grades */
app.post('/edit/update-grades', (req,res) => {
    res.setHeader('Content-type', 'application/json');

    let fileCourses = fs.readFileSync('./src/db/courses.json', 'utf-8');
    const jsonCourses = JSON.parse(fileCourses);

    let fileStudents = fs.readFileSync('./src/db/students.json', 'utf-8');
    const jsonStudents = JSON.parse(fileStudents);

    const courseId = parseInt(req.body.courseId);
    const studentId = parseInt(req.body.studentId);
    const grade1 = req.body.grade1;
    const grade2 = req.body.grade2;
    const grade3 = req.body.grade3;
    const grade4 = req.body.grade4;
    const credits = parseInt(req.body.credits);
    let finalNote = req.body.finalNote;
    finalNote = Math.round(finalNote);

    let grades_Courses;

    if(grade4 == "NA"){
        grades_Courses = {
            studentId: studentId,
            grade1: grade1,
            grade2: grade2,
            grade3: grade3,
            finalNote: finalNote
        }
    }else{
        grades_Courses = {
            studentId: studentId,
            grade1: grade1,
            grade2: grade2,
            grade3: grade3,
            grade4: grade4,
            finalNote: finalNote
        }
    }

    const course_Students = {
        courseId: courseId,
        finalNote: finalNote,
        credits: credits
    }

    const index = (element) => element.id == courseId;
    const index2 = (element) => element.studentId == studentId;
    const indexArray1 = jsonCourses.courses.findIndex(index);
    const indexArray2 = jsonCourses.courses[indexArray1].students.findIndex(index2);
    jsonCourses.courses[indexArray1].students[indexArray2] = grades_Courses;
    fileCourses = fs.writeFileSync('./src/db/courses.json', JSON.stringify(jsonCourses,null,2));

    const indexUpdate = (element) => element.id == studentId;
    const indexArrayUpdate = jsonStudents.students.findIndex(indexUpdate);
    const indexUpdate2 = (element) => element.courseId == courseId;
    const indexArrayUpdate2 = jsonStudents.students[indexArrayUpdate].courses.findIndex(indexUpdate2)
    jsonStudents.students[indexArrayUpdate].courses[indexArrayUpdate2] = course_Students
    fileStudents = fs.writeFileSync('./src/db/students.json', JSON.stringify(jsonStudents,null,2));


})

/* Delete a student of a course */
app.post('/delete/courseStudent', (req,res) => {
    res.setHeader('Content-type', 'application/json');

    let fileCourses = fs.readFileSync('./src/db/courses.json', 'utf-8');
    const jsonCourses = JSON.parse(fileCourses);

    let fileStudents = fs.readFileSync('./src/db/students.json', 'utf-8');
    const jsonStudents = JSON.parse(fileStudents);

    const courseId = parseInt(req.body.courseId);
    const studentId = parseInt(req.body.studentId);

    const index = (element) => element.id == studentId;
    const indexArray1 = jsonStudents.students.findIndex(index);
    const newCoursesArray = jsonStudents.students[indexArray1].courses.filter((item) => item.courseId !== courseId);
    jsonStudents.students[indexArray1].courses = newCoursesArray;
    fileStudents = fs.writeFileSync('./src/db/students.json', JSON.stringify(jsonStudents,null,2));

    const index3 = (element) => element.id == courseId;
    const indexArray2 = jsonCourses.courses.findIndex(index3);
    const newStudentsArray = jsonCourses.courses[indexArray2].students.filter((item) => item.studentId !== studentId);
    jsonCourses.courses[indexArray2].students = newStudentsArray;
    fileCourses = fs.writeFileSync('./src/db/courses.json', JSON.stringify(jsonCourses,null,2));

})

/* Edit a course */
app.post('/edit/course', (req,res) => {
    res.setHeader('Content-type', 'application/json');

    let fileCourses = fs.readFileSync('./src/db/courses.json', 'utf-8');
    const jsonCourses = JSON.parse(fileCourses);

    let fileStudents = fs.readFileSync('./src/db/students.json', 'utf-8');
    const jsonStudents = JSON.parse(fileStudents);

    const courseId = parseInt(req.body.courseId);
    const newName = req.body.newName;
    const newCredits = parseInt(req.body.newCredits);
    const newTeacher = req.body.newTeacher;
  

    const index = (element) => element.id == courseId;
    const indexArray = jsonCourses.courses.findIndex(index);
    jsonCourses.courses[indexArray].courseName = newName;
    jsonCourses.courses[indexArray].credits = newCredits;
    jsonCourses.courses[indexArray].teachersName = newTeacher;
    fileCourses = fs.writeFileSync('./src/db/courses.json', JSON.stringify(jsonCourses,null,2));

    let studentsArray = jsonStudents.students;

    console.log(typeof courseId);

    studentsArray.forEach((student, i) => {
        const index = (element) => element.courseId == courseId;
        const indexArray = student.courses.findIndex(index);
        if(indexArray != -1){
            jsonStudents.students[i].courses[indexArray].credits = newCredits
            fileStudents = fs.writeFileSync('./src/db/students.json', JSON.stringify(jsonStudents,null,2));
        }
    })
    

})

/* Delete a course */
app.post('/delete/course', (req,res) => {
    res.setHeader('Content-type', 'application/json');

    const courseId = parseInt(req.body.courseId);

    // Eliminar estudiante de la DB
    // Eliminar notas del estudiante en los cursos en los que este

    let fileCourses = fs.readFileSync('./src/db/courses.json', 'utf-8');
    const jsonCourses = JSON.parse(fileCourses);

    let fileStudents = fs.readFileSync('./src/db/students.json', 'utf-8');
    const jsonStudents = JSON.parse(fileStudents);

    const index = (element) => element.id == courseId;
    const indexArray = jsonCourses.courses.findIndex(index);

    if(indexArray != -1){
        const studentToDelete = jsonCourses.courses[indexArray].students;

        studentToDelete.forEach(student => {
            const studentId = student.studentId;

            const index = (element) => element.id == studentId;
            const indexCArray = jsonStudents.students.findIndex(index);
            const studentsArray = jsonStudents.students[indexCArray].courses;
            const newStudentsArray = studentsArray.filter((item) => item.courseId !== courseId);
            jsonStudents.students[indexCArray].courses = newStudentsArray;
            fileCourses = fs.writeFileSync('./src/db/students.json', JSON.stringify(jsonStudents,null,2));
        });
    }

    const newCoursesArray = jsonCourses.courses.filter((item) => item.id !== courseId);
    jsonCourses.courses = newCoursesArray;
    fileCourses = fs.writeFileSync('./src/db/courses.json', JSON.stringify(jsonCourses,null,2));

})

/* Create a new course */
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
    const courseCredits = parseInt(req.body.credits);
    const teacherName = req.body.teacherName;
    const saveDate =  new Date().toLocaleString();
    const idToSave = getLastId();

    
    const index = (element) => element.courseName == courseName;
    const checkArray = json.courses.some(index);

    if(!checkArray){

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

    }

})

/* This is a way to set the port of the server. If the port is not set, it will use the default port
80. */
const port = process.env.port || 80;
app.listen(port, () => console.log(`Escuchando en el puerto ${port}...`));