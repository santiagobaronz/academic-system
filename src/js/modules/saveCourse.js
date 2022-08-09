import { getAllCourses } from "./getAllCourses.js";

export const saveCourse = () => {
    const createCourseButton = document.querySelector("#createCoursesButton");

    createCourseButton.addEventListener("click", (e) => {

        e.preventDefault();

        const courseName = document.querySelector("#courseName").value;
        const TypeOfCourse = document.querySelector("#selectCourse").value;
        const courseCredits = document.querySelector("#credits").value;
        const teacherName = document.querySelector("#teacherName").value;
    
        fetch("/new/course", {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({CourseName: courseName, selectCourse: TypeOfCourse,
                                credits: courseCredits, teacherName: teacherName})
        }).then(

            Swal.fire(
                'Curso creado con éxito',
                'El curso ha sido guardado',
                'success'
              )

        );


        const coursesResults = document.querySelector("#courseResult");
        const coursesForm = document.querySelector("#coursesForm");
        const coursesSwitch = document.querySelector("#coursesSwitch");

        coursesResults.style.display = "grid";
        coursesForm.style.display = "none";
        coursesSwitch.firstElementChild.innerHTML = "person_add_alt_1";
        coursesSwitch.lastElementChild.innerHTML = "Crear curso";

        document.getElementById("formCreateCourses").reset();
        const nameVerification = document.querySelector("#name-course-verification");
        const typeOfVerification = document.querySelector("#typeof-course-verification");
        const creditsVerification = document.querySelector("#credits-course-verification");
        const teacherVerification = document.querySelector("#teacher-course-verification");

        nameVerification.style.display = "none";
        typeOfVerification.style.display = "none";
        creditsVerification.style.display = "none";
        teacherVerification.style.display = "none";
        createCourseButton.disabled = true;
        createCourseButton.style.backgroundColor = "#ccc";

        getAllCourses();


        setTimeout(() => {
            console.clear()
        }, 1000);

    });
}