/* Save user function */

import { getAllUsers } from "./getAllUsers.js";

export const saveUser = () => {
    const createStudentButton = document.querySelector("#createStudentButton");


    createStudentButton.addEventListener("click", (e) => {

        e.preventDefault();

        const studentName = document.querySelector("#name").value;
        const studentLastName = document.querySelector("#lastName").value;
        const studentAge = document.querySelector("#age").value;
        const studentEmail = document.querySelector("#email").value;
        const studentPhoneNumber = document.querySelector("#phoneNumber").value;

        fetch("/new/student", {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({name: studentName, lastName: studentLastName, age: studentAge,
                                email: studentEmail, phoneNumber: studentPhoneNumber})
        });


        const studentsResult = document.querySelector("#studentsResult");
        const studentsForm = document.querySelector("#studentForm");
        const studentSwitch = document.querySelector("#studentSwitch");

        studentsResult.style.display = "grid";
        studentsForm.style.display = "none";
        studentSwitch.firstElementChild.innerHTML = "person_add_alt_1";
        studentSwitch.lastElementChild.innerHTML = "Crear estudiante";
 
        Swal.fire(
            'Estudiante creado con éxito',
            'El estudiante ha sido guardado',
            'success'
          );

        getAllUsers();

        document.getElementById("formCreateStudents").reset();
        const nameVerification = document.querySelector("#name-verification");
        const lastNameVerification = document.querySelector("#lastName-verification");
        const ageVerification = document.querySelector("#age-verification");
        const emailVerification = document.querySelector("#email-verification");
        const phoneVerification = document.querySelector("#phoneNumber-verification");

        nameVerification.style.display = "none";
        lastNameVerification.style.display = "none";
        ageVerification.style.display = "none";
        emailVerification.style.display = "none";
        phoneVerification.style.display = "none";
        createStudentButton.disabled = true;
        createStudentButton.style.backgroundColor = "#ccc";


        setTimeout(() => {
            console.clear()
        }, 1000);

    });
}