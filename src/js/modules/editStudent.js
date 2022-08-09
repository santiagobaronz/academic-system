import { getAllUsers } from "./getAllUsers.js";

export const editStudent = async (userCode) => {

    const popUpAlert = (type, message, image) => {
        Swal.fire(
            `${type}`,
            `${message}`,
            `${image}`
          );
    }

    let student = []

    await fetch(`./api/students/code/${userCode}`)
        .then(response => response.json())
        .then(data => student = data)

    const mainContainer = document.querySelector(".container");
    const enrollPopUp = document.createElement("div")
    enrollPopUp.className = "enrollPopUp";

    enrollPopUp.innerHTML = `
    <form id='formEditStudent'>
        <h3>Editar el estudiante ${student.name} ${student.lastName}</h3>

        <label>Nombre del estudiante:</label>
        <input id='studentName' placeholder='Nombre del curso' type='text' value='${student.name}'>

        <label>Apellidos:</label>
        <input id='studentLastName' placeholder='Créditos del curso' type='text' value='${student.lastName}'>

        <label>Correo electrónico:</label>
        <input id='studentEmail' placeholder='Profesor del curso' type='text' value='${student.email}'>

        <label>Numero de teléfono:</label>
        <input id='studentPhone' placeholder='Profesor del curso' type='text' value='${student.phoneNumber}'>

        <button id='buttonEditStudent'>Editar el estudiante</button>
    </form>`
    

    mainContainer.append(enrollPopUp);

    document.addEventListener("mouseup", function(event) {
        var obj = document.querySelector("#formEditStudent")
        if(obj != undefined){
            const swal2Container = document.querySelector(".swal2-container")
            if(swal2Container == undefined){
                if (!obj.contains(event.target)) {
                    enrollPopUp.remove();
                }
            }
        }
    });

    const buttonEditStudent = document.querySelector("#buttonEditStudent");
    buttonEditStudent.addEventListener("click", (e) => {
        e.preventDefault();

        const studentName = document.querySelector("#formEditStudent > #studentName");
        const studentLastName = document.querySelector("#formEditStudent > #studentLastName");
        const studentEmail = document.querySelector("#formEditStudent > #studentEmail");
        const studentPhone = document.querySelector("#formEditStudent > #studentPhone");

        if(studentName.value == "" || studentLastName.value == "" || studentEmail.value == "" || studentPhone.value == ""){
            popUpAlert("Ocurrió un problema", "Rellene todos los campos", "error")
        }else{
            fetch("/edit/student", {
                method: 'POST',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify({  studentId: student.id,
                                        studentName: studentName.value,
                                        studentLastName: studentLastName.value,
                                        studentEmail: studentEmail.value,
                                        studentPhone: studentPhone.value})
            }).then(
                popUpAlert("El estudiante fue editado", "Los datos del estudiante fueron actualizados", "success"),
                getAllUsers(),
                setTimeout(() => {
                    console.clear()
                }, 500)
            );
        }
    })

}