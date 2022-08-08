import { getCourseInfo } from "./getInfoCourse.js";


export const getAllCourses = async (data, type) => {

    /* Selecting the element with the class name userTable. */
    const coursesTable = document.querySelector(".coursesResultsGrid");
    
    /* Checking if the element with the class name userTable exists, if it does, it removes it. */
    if(coursesTable != undefined){
        coursesTable.remove();
    }

    /* Declaring two variables, one is an empty array and the other is undefined. */
    let coursesArray = [];
    let fetchRequest;

    /* Checking if the data and type variables are undefined, if they are, it sets the fetchRequest
    variable to "./api/students", if they are not, it sets the fetchRequest variable to
    "./api/students/{type}/{data}". */
    (data == undefined && type == undefined) ? fetchRequest = "./api/courses" : fetchRequest = `./api/courses/${type}/${data}`


    /* Fetching the data from the API and then it is pushing the data to the studentsArray variable. */
    await fetch(fetchRequest)
    .then(response => response.json())
    .then(data => {
        
        if(fetchRequest == "./api/courses/theoretical/all" || fetchRequest == "./api/courses/theoretical-practical/all"){
            coursesArray = data;
        }else if(fetchRequest == "./api/courses"){
            coursesArray = data.courses
        }else{
            coursesArray.push(data)
        };


    })

    /* Creating a div element and then it is selecting the element with the id studentsResult. */
    const coursesResult = document.querySelector("#courseResult");
    const tableDiv = document.createElement("div");

    /* Checking if the studentsArray variable is not equal to an empty array, if it is not, it is
    creating a table and then it is appending the table to the studentsResult element. If it is
    equal to an empty array, it is appending a paragraph to the studentsResult element. */
    if(coursesArray != []){

        tableDiv.className = "coursesResultsGrid";
        tableDiv.innerHTML = `<div id='coursesResults'></div>`;
    
        coursesResult.append(tableDiv);
        const userTable = document.querySelector("#coursesResults");

        

        /* Creating a table row for each student in the studentsArray variable. */
        coursesArray.forEach(course => {
    
            const numOfStudents = course.students.length == 0 ? "Ningún estudiante inscrito" : `${course.students.length} estudiantes inscritos`;
    
            const boxElement = document.createElement("div");
            boxElement.className = "courseBox"
            boxElement.id = course.id;
            boxElement.addEventListener("click", () =>{
                getCourseInfo(course.code);
            })
            boxElement.innerHTML = `
            
            <h3>${course.courseName}</h3>
            <p class='courseCode'>Código de curso: ${course.code}</p>
            <p>Tipo de curso: ${course.typeOfCourse}</p>
            <p>Créditos: ${course.credits}</p>
            <td>${numOfStudents}</td>
            <i class="material-icons-round icon-card-course">arrow_right_alt</i>
            `;

    
            userTable.appendChild(boxElement);
    
        });

    }else{
        tableDiv.innerHTML = "<p class='noResultsAlert'>No se ha registrado ningún estudiante...</p>";
        coursesResult.append(tableDiv);
    }

}

