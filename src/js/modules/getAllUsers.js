export const getAllUsers = async (data, type) => {

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
        
        fetchRequest == "./api/students" ? studentsArray = data.students : studentsArray.push(data);

    })

    /* Creating a div element and then it is selecting the element with the id studentsResult. */
    const studentsResult = document.querySelector("#studentsResult");
    const tableDiv = document.createElement("div");

    /* Checking if the studentsArray variable is not equal to an empty array, if it is not, it is
    creating a table and then it is appending the table to the studentsResult element. If it is
    equal to an empty array, it is appending a paragraph to the studentsResult element. */
    if(studentsArray != []){

        tableDiv.className = "userTable";
        tableDiv.innerHTML = `
        
        <table id='results'>
            <tr class='userTr'>
                <th class='adjustWidth' style='--aw: 370px'>Nombre</th>
                <th class='adjustWidth' style='--aw: 150px'>Código</th>
                <th>Correo electrónico:</th>
                <th>Cursos inscritos</th>
                <th>Editar</th>
            </tr>
        </table>
        `;
    
        studentsResult.append(tableDiv);
        const userTable = document.querySelector("#results > tbody");
    
        /* Creating a table row for each student in the studentsArray variable. */
        studentsArray.forEach(student => {
    
            const fullName = `${student.name} ${student.lastName}`;
            const logoUser = student.name.charAt(0) + "" + student.lastName.charAt(0);
            const numOfCourses = student.courses.length == 0 ? "No hay cursos inscritos" : `${student.courses.length} cursos inscritos`;
    
            const rowElement = document.createElement("tr");
            rowElement.className = "userRow"
            rowElement.innerHTML = `
            
            <td><span class='logoUser'>${logoUser}</span>${fullName}</td>
            <td>${student.code}</td>
            <td>${student.email}</td>
            <td>${numOfCourses}</td>
            <td><button id='${student.id}' class='editUserButton'>Editar</button></td>
            `;
    
            userTable.appendChild(rowElement);
    
        });

    }else{
        tableDiv.innerHTML = "<p class='noResultsAlert'>No se ha registrado ningún estudiante...</p>";
        studentsResult.append(tableDiv);
    }

}

