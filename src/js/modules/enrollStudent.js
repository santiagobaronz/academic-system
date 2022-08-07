export const enrollStudent = (course) => {

    const fillSelect = async () => {

        let students = [];

        await fetch("./api/students")
        .then(response => response.json())
        .then(data => students = data.students)

        console.log(students);

        students.forEach(student => {

            const selectInput = document.querySelector("#selectStudents")
            const optionInput = document.createElement("option")
            optionInput.value = student.id;
            optionInput.id = student.id;
            optionInput.innerHTML = `${student.name} ${student.lastName}`
            selectInput.append(optionInput);

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
                    <label>Nota 1 (30%)</label id='grade1'>
                    <input type="number">
                </div>
                <div class='grade'>
                    <label>Nota 2 (25%)</label id='grade2'>
                    <input type="number">
                </div>
                <div class='grade'>
                    <label>Nota 3 (20%)</label id='grade3'>
                    <input type="number">
                </div>
                <div class='grade'>
                    <label>Nota 4 (25%)</label id='grade4'>
                    <input type="number">
                </div>
            </div>
            <button id='buttonAddStudent'>Agregar estudiante al curso</button>
        </form>`
    }

    mainContainer.append(enrollPopUp);
    fillSelect();

    document.addEventListener("mouseup", function(event) {
        var obj = document.querySelector("#formAddStudent")
        if (!obj.contains(event.target)) {
            enrollPopUp.remove();
        }
    });

    const buttonAddStudent = document.querySelector("#buttonAddStudent");

    buttonAddStudent.addEventListener("click", (e) => {
        e.preventDefault();

        const idStudent = document.querySelector("#selectStudents").value;
        const grade1 = document.querySelector("#grade1").value
        const grade2 = document.querySelector("#grade2").value
        const grade3 = document.querySelector("#grade3").value

        if(course.typeOfCourse == "Teorico"){
            fetch("/edit/course/theoretical", {
                method: 'POST',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify({courseId: course.id ,id: idStudent, grade1: grade1, grade2: grade2, grade3: grade3})
            });
        }else{
            const grade4 = document.querySelector("#grade4")
            fetch("/new/course", {
                method: 'POST',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify({id: idStudent, grade1: grade1, grade2: grade2, grade3: grade3, grade4:grade4})
            });
        }

    })


}