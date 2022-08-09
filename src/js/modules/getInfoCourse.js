import { editCourse } from "./editCourse.js";
import { enrollStudent } from "./enrollStudent.js";

export const getCourseInfo = async (code) => {
    

    const courseInfoBox = document.querySelector("#courseInfo");
    const coursesResult = document.querySelector("#courseResult");
    const coursesForm = document.querySelector("#coursesForm");
    const coursesSwitch = document.querySelector("#coursesSwitch");


    const coursesTable = document.querySelector(".courseInfoSection");
    const userTable2 = document.querySelector(".userTable2");
    
    if(coursesTable != undefined){
        coursesTable.remove();
    }

    if(userTable2 != undefined){
        userTable2.remove();
    }

    coursesResult.style.display = "none";
    coursesForm.style.display = "none";
    courseInfoBox.style.display = "block";
    coursesSwitch.firstElementChild.innerHTML = "remove_red_eye";
    coursesSwitch.lastElementChild.innerHTML = "Ver cursos";

    let courseInfo;

    await fetch(`/api/courses/code/${code}`)
    .then(response => response.json())
    .then(data => courseInfo = data)

    const infoSection = document.createElement("div");
    infoSection.id = courseInfo.id;
    infoSection.className = "courseInfoSection";

    infoSection.innerHTML = `
    
    <div class='courseInfoTitle'>
        <h3>${courseInfo.courseName}</h3>
        <span class="material-icons edit-course" id='editCourseButton'>edit</span>
    </div>
    <div class='courseInfoDetails'>
        <div class='course_Code'>
            <span class="material-icons course-icon">qr_code_2</span>
            <div>
                <p class='card-course-title'>Código</p>
                <p>${courseInfo.code}</p>
            </div>
        </div>
        <div class='course_Type'>
            <span class="material-icons course-icon">filter_alt</span>
            <div>
                <p class='card-course-title'>Curso</p>
                <p>${courseInfo.typeOfCourse}</p>
            </div>
        </div>
        <div class='course_Credits'>
            <span class="material-icons course-icon">api</span>
            <div>
                <p class='card-course-title'>Créditos</p>
                <p>${courseInfo.credits} crédito(s)</p>
            </div>
        </div>
        <div class='course_Teacher'>
            <span class="material-icons course-icon">person</span>
            <div>
                <p class='card-course-title'>Profesor</p>
                <p>${courseInfo.teachersName}</p>
            </div>
        </div>
    </div>`

    courseInfoBox.append(infoSection);

    const courseStudents = document.querySelector(".courseInfoSection");
    const courseStudentsBox = document.createElement("div")
    courseStudentsBox.className = "courseStudentsBox";

    if(courseInfo.students.length != 0){
        const tableCourseDiv = document.createElement("div");
        tableCourseDiv.className = "userTable2";
        tableCourseDiv.innerHTML = `
        
        <table id='resultsCourse'>
            <tr class='courseTr'>
                <th class='adjustWidth' style='--aw: 310px'>Nombre</th>
                <th class='adjustWidth' style='--aw: 100px'>Código</th>
                <th>Nota 1</th>
                <th>Nota 2</th>
                <th>Nota 3</th>
                <th>Nota 4</th>
                <th>Definitiva</th>
                <th>Guardar</th>
                <th>Eliminar</th>
            </tr>
        </table>

        <div class='noStudents'>
            <h3>Hay ${courseInfo.students.length} estudiante(s) en este curso</h3>
            <button id='addStudentCourse'> Agregar otro estudiante a este curso </button>
        </div>
        `;

        courseStudents.append(tableCourseDiv);
        const userTable = document.querySelector("#resultsCourse > tbody");
        let students = [], studentsToShow = []

        await fetch("./api/students")
        .then(response => response.json())
        .then(data => students = data.students)

        for (let i = 0; i < students.length; i++) {
            let coursesArray = students[i].courses;
            for (let j = 0; j < coursesArray.length; j++) {
                if(coursesArray[j].courseId == courseInfo.id){
                    studentsToShow.push(students[i]);
                }
            }
        }


        studentsToShow.forEach(student => {

            
            let studentGrades = [];
            let grade4, styleOfInput, inputType;

            for (let i = 0; i < courseInfo.students.length; i++) {
                if(courseInfo.students[i].studentId  == student.id){
                    studentGrades = courseInfo.students[i];
                }
            }

            if(studentGrades.grade4 != undefined){
                grade4 = studentGrades.grade4
                styleOfInput = "inputGrades";
                inputType = "number";
            }else{
                grade4 = "N.A";
                styleOfInput = "disabled";
                inputType = "text";
            };

            const fullName = `${student.name} ${student.lastName}`;
            const logoUser = student.name.charAt(0) + "" + student.lastName.charAt(0);
    
            const rowElement = document.createElement("tr");
            rowElement.className = "userRow"
            rowElement.innerHTML = `
            
            <td><span class='logoUser'>${logoUser}</span>${fullName}</td>
            <td>${student.code}</td>
            <td><input type='number' value='${studentGrades.grade1}' placeholder='${studentGrades.grade1}' class='inputGrades input${student.id}' min="0" max="50"></td>
            <td><input type='number' value='${studentGrades.grade2}' placeholder='${studentGrades.grade2}' class='inputGrades input${student.id}' min="0" max="50"></td>
            <td><input type='number' value='${studentGrades.grade3}' placeholder='${studentGrades.grade3}' class='inputGrades input${student.id}' min="0" max="50"></td>
            <td><input type='${inputType}' value='${grade4}' ${styleOfInput} placeholder='${grade4}' class='inputGrades input${student.id}' min="0" max="50"></td>
            <th><p class='inputFinalNote'>${studentGrades.finalNote}</p></th>
            <th><button id='${student.id}' class='saveGradesButton' onclick='updateGrades(${student.id},"${courseInfo.id}", "${courseInfo.typeOfCourse}", "${courseInfo.code}")'>Guardar</button></th>
            <td><button id='${student.id}' class='deleteUserButton' onclick='deleteStudents("${student.id}",${courseInfo.id})'>Eliminar</button></td>
            `;
    
            userTable.appendChild(rowElement);


        });


    }else{
        courseStudentsBox.innerHTML = `
            <div class='noStudents'>
                <h3>No hay estudiantes en este curso</h3>
                <button id='addStudentCourse'> Agregar estudiante a este curso </button>
            </div>
        `
    }


    courseStudents.append(courseStudentsBox);

    const addStudentCourse = document.querySelector("#addStudentCourse");
    if(addStudentCourse != undefined){
        addStudentCourse.addEventListener("click", () => {
            enrollStudent(courseInfo);
        })
    }

    const editCourseButton = document.querySelector("#editCourseButton")
    editCourseButton.addEventListener("click", () => {
        editCourse(courseInfo)
    })

}