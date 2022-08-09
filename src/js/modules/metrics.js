export const mainMetrics = async () => {

    let studentsArray = [];
    let topStudents = [];

    await fetch("./api/students")
    .then(response => response.json())
    .then(data => studentsArray = data.students)

    studentsArray.forEach(student => {

        let finalAverage = 0, totalCredits = 0;

        for (let i = 0; i < student.courses.length; i++) {
            const element = student.courses[i];
            finalAverage = finalAverage + (element.finalNote * element.credits)
            totalCredits = totalCredits + (element.credits);
        }

        finalAverage = finalAverage/totalCredits;
        finalAverage = finalAverage.toFixed(2);

        topStudents.push({name: student.name, lastName: student.lastName, finalAverage: finalAverage})

    })

    topStudents.sort((a,b) => a.finalAverage - b.finalAverage).reverse()

    const noteFilter = document.createElement("div")
    noteFilter.className = "infoCourses"

    noteFilter.innerHTML = `
    <div id='topStudents' class='courseInfoCard'>
        <h3>Estudiantes ordenados por nota</h3>
    </div>
    <div id='something' class='courseInfoCard'>
        <h3>xd</h3>
    </div>
    `
    const divToAppend = document.querySelector(".main-metrics")
    divToAppend.append(noteFilter);

    let topStudentFilter = 0;

    topStudents.length > 10 ? topStudentFilter = 10 : topStudentFilter = topStudents.length

    for (let i = 0; i < topStudentFilter; i++) {
        const fullName = `${topStudents[i].name} ${topStudents[i].lastName}`;
        const logoUser = topStudents[i].name.charAt(0) + "" + topStudents[i].lastName.charAt(0);
        const gridElement = document.createElement("div")

        gridElement.className = 'gridCourseResult'
        gridElement.innerHTML = `
        <div>
            <span class='logoUser'>${logoUser}</span>${fullName}
        </div>
        <div>
            <p>${topStudents[i].finalAverage}</p>
        </div>`

        const topStudentsDiv = document.querySelector("#topStudents")
        topStudentsDiv.append(gridElement);
    }

}