import { enrollStudent } from "./enrollStudent.js";

export const getCourseInfo = async (code) => {

    const courseInfoBox = document.querySelector("#courseInfo");
    const coursesResult = document.querySelector("#courseResult");
    const coursesForm = document.querySelector("#coursesForm");
    const coursesSwitch = document.querySelector("#coursesSwitch");


    const coursesTable = document.querySelector(".courseInfoSection");
    
    if(coursesTable != undefined){
        coursesTable.remove();
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
        courseStudentsBox.innerHTML = `
            <div class='noStudents'>
                <h3>Si hay</h3>
            </div>
        `
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
        addStudentCourse.addEventListener("click", () => {
            enrollStudent(courseInfo);
        })

}