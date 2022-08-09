import { editStudent } from "./editStudent.js";

export const getAllUsers = async (data, type) => {

    const popUpAlert = (type, message, image) => {
        Swal.fire(
            `${type}`,
            `${message}`,
            `${image}`
          );
    }

    /* Selecting the element with the class name userTable. */
    const userTable = document.querySelector(".userTable");
    
    /* Checking if the element with the class name userTable exists, if it does, it removes it. */
    if(userTable != undefined){
        userTable.remove();
    }

    /* Declaring two variables, one is an empty array and the other is undefined. */
    let studentsArray = [];
    let fetchRequest;

    /* Checking if the data and type variables are undefined, if they are, it sets the fetchRequest
    variable to "./api/students", if they are not, it sets the fetchRequest variable to
    "./api/students/{type}/{data}". */
    (data == undefined && type == undefined) ? fetchRequest = "./api/students" : fetchRequest = `./api/students/${type}/${data}`


    /* Fetching the data from the API and then it is pushing the data to the studentsArray variable. */
    await fetch(fetchRequest)
    .then(response => response.json())
    .then(data => {
        
        if(fetchRequest == "./api/students"){
            studentsArray = data.students
        }else if(fetchRequest == "./api/students/check/noEnrolled"){
            studentsArray = data;
        }else{
            studentsArray.push(data)
        };

    })

    console.log(studentsArray);
    

    /* Creating a div element and then it is selecting the element with the id studentsResult. */
    const studentsResult = document.querySelector("#studentsResult");
    const tableDiv = document.createElement("div");

    /* Checking if the studentsArray variable is not equal to an empty array, if it is not, it is
    creating a table and then it is appending the table to the studentsResult element. If it is
    equal to an empty array, it is appending a paragraph to the studentsResult element. */
    if(studentsArray.length > 0){

        tableDiv.className = "userTable";
        tableDiv.innerHTML = `
        
        <table id='results'>
            <tr class='userTr'>
                <th class='adjustWidth' style='--aw: 390px'>Nombre</th>
                <th class='adjustWidth' style='--aw: 110px'>Código</th>
                <th class='adjustWidth' style='--aw: 250px'>Correo electrónico:</th>
                <th>Cursos</th>
                <th>Promedio</th>
                <th>Editar</th>
                <th>Eliminar</th>
            </tr>
        </table>
        `;
    
        studentsResult.append(tableDiv);
        const userTable = document.querySelector("#results > tbody");

    
        /* Creating a table row for each student in the studentsArray variable. */
        studentsArray.forEach(student => {

            let finalAverage = 0, totalCredits = 0;

            for (let i = 0; i < student.courses.length; i++) {
                const element = student.courses[i];
                finalAverage = finalAverage + (element.finalNote * element.credits)
                totalCredits = totalCredits + (element.credits);
            }

            finalAverage = finalAverage/totalCredits;
            finalAverage = finalAverage.toFixed(2);

            if(finalAverage == "NaN"){
                finalAverage = "Sin nota";
            }
;    
            const fullName = `${student.name} ${student.lastName}`;
            const logoUser = student.name.charAt(0) + "" + student.lastName.charAt(0);
            const numOfCourses = student.courses.length == 0 ? "Sin cursos" : `${student.courses.length} cursos`;
    
            const rowElement = document.createElement("tr");
            rowElement.className = "userRow"
            rowElement.innerHTML = `
            
            <td><span class='logoUser'>${logoUser}</span>${fullName}</td>
            <td>${student.code}</td>
            <td>${student.email}</td>
            <td>${numOfCourses}</td>
            <td>${finalAverage}</td>
            <td><button id='${student.code}' class='editUserButton' >Editar</button></td>
            <td><button id='${student.id}' class='deleteUserButton' >Eliminar</button></td>
            `;
    
            userTable.appendChild(rowElement);

        });

        const userEditButtons = document.querySelectorAll(".editUserButton")
        userEditButtons.forEach(element => {
            element.addEventListener("click", () => {
                editStudent(element.id)
            })
        })

        const deleteUserButton = document.querySelectorAll(".deleteUserButton")
        deleteUserButton.forEach(element => {
            element.addEventListener("click", () => {
                fetch("/delete/student", {
                    method: 'POST',
                    headers: {'Content-type': 'application/json'},
                    body: JSON.stringify({studentId: element.id})
                }).then(
                    popUpAlert("El estudiante fue eliminado", "El estudiante fue eliminado de los cursos y el sistema", "success"),
                    getAllUsers(),
                    setTimeout(() => {
                        console.clear()
                    },1000)
                );
            })
        })

    }else{
        tableDiv.innerHTML = "<p class='noResultsAlert'>No se ha registrado ningún estudiante...</p>";
        studentsResult.append(tableDiv);
    }

}

