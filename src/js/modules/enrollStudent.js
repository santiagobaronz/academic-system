import { getCourseInfo } from "./getInfoCourse.js";

export const enrollStudent = (course) => {

    const popUpAlert = (type, message, image) => {
        Swal.fire(
            `${type}`,
            `${message}`,
            `${image}`
          );
    }

    const fillSelect = async () => {

        let students = [];

        await fetch("./api/students")
        .then(response => response.json())
        .then(data => students = data.students)

        students.forEach(student => {

            const index = (element) => element.courseId == course.id;
            const checkArray = student.courses.some(index);

            if(!checkArray){
                const selectInput = document.querySelector("#selectStudents")
                const optionInput = document.createElement("option")
                optionInput.value = student.id;
                optionInput.id = student.id;
                optionInput.innerHTML = `${student.name} ${student.lastName}`
                selectInput.append(optionInput);
            }

        });

    }

    const mainContainer = document.querySelector(".container");
    const enrollPopUp = document.createElement("div")
    enrollPopUp.className = "enrollPopUp";

    if(course.typeOfCourse == "Teorico"){
        enrollPopUp.innerHTML = `
        <form id='formAddStudent'>
            <h3>Agregar estudiante al curso de ${course.courseName}</h3>
    
            <label>Estudiante a agregar:</label>
            <select id="selectStudents" name="selectStudents"></select>

            <div class='grades'>
                <div class='grade'>
                    <label>Nota 1 (35%)</label>
                    <input type="number" id='grade1'>
                </div>
                <div class='grade'>
                    <label>Nota 2 (35%)</label>
                    <input type="number" id='grade2'>
                </div>
                <div class='grade'>
                    <label>Nota 3 (30%)</label>
                    <input type="number" id='grade3'>
                </div>
            </div>
            <button id='buttonAddStudent'>Agregar estudiante al curso</button>
        </form>`
    }else{
        enrollPopUp.innerHTML = `
        <form id='formAddStudent' class='formExtend' method='POST' action='/edit/course/theoretical'>
            <h3>Agregar estudiante al curso de ${course.courseName}</h3>
    
            <label>Estudiante a agregar:</label>
            <select id="selectStudents" name="selectStudents"></select>

            <div class='grades gradesExtend'>
                <div class='grade'>
                    <label>Nota 1 (30%)</label>
                    <input type="number" id='grade1'>
                </div>
                <div class='grade'>
                    <label>Nota 2 (25%)</label>
                    <input type="number" id='grade2'>
                </div>
                <div class='grade'>
                    <label>Nota 3 (20%)</label>
                    <input type="number" id='grade3'>
                </div>
                <div class='grade'>
                    <label>Nota 4 (25%)</label>
                    <input type="number" id='grade4'>
                </div>
            </div>
            <button id='buttonAddStudent'>Agregar estudiante al curso</button>
        </form>`
    }

    mainContainer.append(enrollPopUp);
    fillSelect();

    document.addEventListener("mouseup", function(event) {
        var obj = document.querySelector("#formAddStudent")
        if(obj != undefined){
            const swal2Container = document.querySelector(".swal2-container")
            if(swal2Container == undefined){
                if (!obj.contains(event.target)) {
                    enrollPopUp.remove();
                }
            }
        }
    });

    const buttonAddStudent = document.querySelector("#buttonAddStudent");

    buttonAddStudent.addEventListener("click", (e) => {
        e.preventDefault();

        var formAddStudent = document.querySelector("#formAddStudent")
        let idStudent = document.querySelector("#selectStudents").value;
        let grade1 = document.querySelector("#grade1").value;
        let grade2 = document.querySelector("#grade2").value;
        let grade3 = document.querySelector("#grade3").value;

        if(grade1 == "" || grade2 == "" || grade3 == ""){
            popUpAlert("Ocurrió un problema", "Complete todos los campos", "error");
        }else{

            grade1 = parseInt(grade1);
            grade2 = parseInt(grade2);
            grade3 = parseInt(grade3);

            if((grade1 < 0 || grade1 > 50) || (grade2 < 0 || grade2 > 50) || (grade3 < 0 || grade3 > 50)){
                popUpAlert("Ocurrió un problema", "Ingrese un numero de créditos entre 0 y 50", "error");
            }else{
                if(course.typeOfCourse == "Teorico"){
                    fetch("/edit/course/theoretical", {
                        method: 'POST',
                        headers: {'Content-type': 'application/json'},
                        body: JSON.stringify({courseName: course.courseName, courseId: course.id ,id: idStudent,
                                             grade1: grade1, grade2: grade2, grade3: grade3})
                    }).then(
                        popUpAlert("El estudiante fue agregado", "El estudiante fue agregado al curso", "success"),
                        getCourseInfo(course.code),
                        enrollPopUp.remove()
                    );
        
                    setTimeout(() => {
                        console.clear()
                    }, 1000);
        
                }else{
                    let grade4 = document.querySelector("#grade4").value

                    if(grade4 == ""){
                        popUpAlert("Ocurrió un problema", "Complete todos los campos", "error");
                    }else{

                        grade4 = parseInt(grade4);

                        if(grade4 < 0 || grade4 > 50){
                            popUpAlert("Ocurrió un problema", "Ingrese un numero de créditos entre 0 y 50", "error");
                        }else{
                            fetch("/edit/course/theoretical-practical", {
                                method: 'POST',
                                headers: {'Content-type': 'application/json'},
                                body: JSON.stringify({courseName: course.courseName, courseId: course.id ,id: idStudent,
                                    grade1: grade1, grade2: grade2, grade3: grade3, grade4:grade4})
                            }).then(
                                popUpAlert("El estudiante fue agregado", "El estudiante fue agregado al curso", "success"),
                                getCourseInfo(course.code),
                                enrollPopUp.remove(),
                            );
                
                            setTimeout(() => {
                                console.clear()
                            }, 1000);
                        }
                    }
                }
            }
        }

    })

    


}