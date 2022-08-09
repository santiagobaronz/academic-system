import { getCourseInfo } from "./getInfoCourse.js";

export const editCourse = (course) => {

    const popUpAlert = (type, message, image) => {
        Swal.fire(
            `${type}`,
            `${message}`,
            `${image}`
          );
    }

    const mainContainer = document.querySelector(".container");
    const enrollPopUp = document.createElement("div")
    enrollPopUp.className = "enrollPopUp";

    enrollPopUp.innerHTML = `
    <form id='formEditCourse'>
        <h3>Editar el curso de ${course.courseName}</h3>

        <label>Nombre del curso:</label>
        <input id='courseName' placeholder='Nombre del curso' type='text' value='${course.courseName}'>

        <label>Créditos del curso:</label>
        <input id='courseCredits' placeholder='Créditos del curso' type='number' value='${course.credits}' min='0' max='10'>

        <label>Profesor del curso:</label>
        <input id='courseTeacher' placeholder='Profesor del curso' type='text' value='${course.teachersName}'>

        <p>Recuerde que no se puede editar el tipo de curso</p>
        <button id='buttonEditCourse'>Editar el curso</button>
    </form>`
    
    mainContainer.append(enrollPopUp);

    document.addEventListener("mouseup", function(event) {
        var obj = document.querySelector("#formEditCourse")
        if(obj != undefined){
            const swal2Container = document.querySelector(".swal2-container")
            if(swal2Container == undefined){
                if (!obj.contains(event.target)) {
                    enrollPopUp.remove();
                }
            }
        }
    });

    const buttonEditCourse = document.querySelector("#buttonEditCourse");
    buttonEditCourse.addEventListener("click", (e) => {
        e.preventDefault();

        const courseName = document.querySelector("#formEditCourse > #courseName");
        const courseCredits = document.querySelector("#formEditCourse > #courseCredits");
        const courseTeacher = document.querySelector("#formEditCourse > #courseTeacher");

        if(courseName.value == "" || courseCredits.value == "" || courseTeacher.value == ""){
            popUpAlert("Ocurrió un problema", "Rellene todos los campos", "error")
        }else{
            if(courseCredits.value < 0 || courseCredits.value > 10){
                popUpAlert("Ocurrió un problema", "Ingrese un numero de créditos entre 1 y 10", "error")
            }else{
                fetch("/edit/course", {
                    method: 'POST',
                    headers: {'Content-type': 'application/json'},
                    body: JSON.stringify({  courseId: course.id,
                                            newName: courseName.value,
                                            newCredits: courseCredits.value,
                                            newTeacher: courseTeacher.value})
                }).then(
                    popUpAlert("El curso fue editado", "El curso ha sido actualizado", "success"),
                    getCourseInfo(course.code),
                    setTimeout(() => {
                        console.clear()
                    }, 500)
                );
            }
        }
    })



}

