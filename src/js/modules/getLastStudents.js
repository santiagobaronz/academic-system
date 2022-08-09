/* getLastStudents function */
export const getLastStudents = async () => {

    let studentsArray = [], coursesArray = [];

    await fetch("./api/students")
    .then(response => response.json())
    .then(data => studentsArray = data.students)

    await fetch("./api/courses")
    .then(response => response.json())
    .then(data => coursesArray = data.courses)

    const metricsToCheck = document.querySelector(".systemInfoGrid2")

    if(metricsToCheck != undefined){
        metricsToCheck.remove()
    }

    const gridInfoSection = document.createElement("div")
    gridInfoSection.className = "systemInfoGrid2";
    gridInfoSection.innerHTML = `
    
    <div class='infoSystemCard'>
        <span class='span-infoSystem'>${studentsArray.length} </span>
        <h3>estudiantes en total</h3>
    </div>
    <div class='infoSystemCard'>
        <span class='span-infoSystem'>${coursesArray.length}</span>
        <h3>cursos en total</h3>
    </div>
    `

    const systemMetrics = document.querySelector("#systemInfo2");
    systemMetrics.append(gridInfoSection);

    const studentsMainTable = document.querySelector(".lastStudents");
    
    if(studentsMainTable != undefined){
        studentsMainTable.remove();
    }
    
    const lastStudentsSection = document.querySelector("#last-students")
    const tableLastStudents = document.createElement("div");


    tableLastStudents.className = "lastStudents";
    tableLastStudents.innerHTML = `
    
    <table id='lastStudents'>
        <tr class='lastStudentsColumns'>
        </tr>
    </table>
    `;

    lastStudentsSection.append(tableLastStudents);
    const studentsTable = document.querySelector("#lastStudents > tbody")

    let lastStudentsArray = []

    await fetch("./api/students")
    .then(response => response.json())
    .then(data => lastStudentsArray = data.students);

    lastStudentsArray.reverse();

    let ArrayLength
    lastStudentsArray.length < 5 ? ArrayLength = lastStudentsArray.length : ArrayLength = 5;

    for (let i = 0; i < ArrayLength; i++) {
       
        const fullName = `${lastStudentsArray[i].name} ${lastStudentsArray[i].lastName}`;
        const logoUser = lastStudentsArray[i].name.charAt(0) + "" + lastStudentsArray[i].lastName.charAt(0);

        const rowElement = document.createElement("tr");
        rowElement.className = "studentRow"
        rowElement.innerHTML = `
        
        <td><span class='logoUser'>${logoUser}</span>${fullName}</td>
        <td>${lastStudentsArray[i].code}</td>
        `;

        studentsTable.appendChild(rowElement);
        
    }
}