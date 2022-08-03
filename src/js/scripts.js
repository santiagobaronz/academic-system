// Imports
import {getDate} from './modules/date.js';
import { pageSelector } from './modules/pagesSelector.js';


window.addEventListener("load", () => {

        

        fetch("./api/students")
        .then(response => response.json())
        .then(data => {
            
            const studentsArray = data.students;
            console.log(studentsArray);
        }
        );

        const studentsResult = document.querySelector("#studentsResult");
        const tableDiv = document.createElement("div");

        tableDiv.innerHTML = `
        
        <table id='results'>
            <tr>
                <th>Código</th>
                <th>Nombre</th>
                <th>Correo electrónico:</th>
                <th>Numero de teléfono</th>
                <th>Cursos inscritos</th>
                <th>Editar</th>
            </tr>
        </table>
        `

        studentsResult.append(tableDiv);

        













    // Page selector
    pageSelector();
    // Date module
    getDate();
})
