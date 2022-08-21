import { getCourseInfo } from "./getInfoCourse.js";

export const updateGrades = (studentId, courseId, typeOfCourse, courseCode, credits) => {

    /**
     * If the user clicks the button, then the function will fire an alert with the type and message
     * that was passed in.
     * @param type - The type of error.
     * @param message - The message you want to display in the alert.
     */
    const errorAlert = (type, message) => {
        Swal.fire(
            `${type}`,
            `${message}`,
            'error'
          );
    }

    /**
     * It's a function that fires a SweetAlert2 alert when called.
     */
    const successAlert = () => {
        Swal.fire(
            'Notas actualizadas',
            'Las notas del estudiante fueron actualizadas',
            'success'
          );
    }

/* It's getting all the inputs that have the class `input` and storing them in an array. */
    let grades = []
    let errorBoolean = 0;
    let gradesInput = document.querySelectorAll(`.input${studentId}`);

    /* It's getting all the inputs that have the class `input` and storing them in an array. */
    gradesInput.forEach( grade => {

        if(grade.value < 0 || grade.value > 50){
            errorAlert("Fuera de rango", "Ingrese valores entre 0 y 50")
            errorBoolean++;
        }
        grades.push(grade.value)
    })

    /* It's checking if the user has entered a value that is not between 0 and 50. If the user has
    entered a value that is not between 0 and 50, then the function will fire an alert with the type
    and message that was passed in. */
    if(errorBoolean == 0){

        if(typeOfCourse == "Teorico"){

            if(grades[0] == "" || grades[1] == "" || grades[2] == ""){
                errorAlert("Faltan datos", "No deje espacios en blanco");
            }else{
                const grade1 = grades[0];
                const grade2 = grades[1];
                const grade3 = grades[2];
                const finalNote = (grade1*0.35) + (grade2*0.35) + (grade3*0.30);

                fetch("/edit/update-grades", {
                    method: 'POST',
                    headers: {'Content-type': 'application/json'},
                    body: JSON.stringify({  courseId: courseId,
                                            studentId: studentId,
                                            grade1: grade1,
                                            grade2: grade2,
                                            grade3: grade3,
                                            grade4: "NA",
                                            credits: credits,
                                            finalNote: finalNote})
                }).then(
                    successAlert(),
                    getCourseInfo(courseCode),
                    setTimeout(() => {
                        console.clear()
                    }, 500)
                );
            }
        }else{
            if(grades[0] == "" || grades[1] == "" || grades[2] == "" || grades[3] == ""){
                errorAlert("Faltan datos", "No deje espacios en blanco");
            }else{
                const grade1 = grades[0];
                const grade2 = grades[1];
                const grade3 = grades[2];
                const grade4 = grades[3];
                const finalNote = (grade1*0.30) + (grade2*0.25) + (grade3*0.20) + (grade4*0.25);

                fetch("/edit/update-grades", {
                    method: 'POST',
                    headers: {'Content-type': 'application/json'},
                    body: JSON.stringify({  courseId: courseId,
                                            studentId: studentId,
                                            grade1: grade1,
                                            grade2: grade2,
                                            grade3: grade3,
                                            grade4: grade4,
                                            credits: credits,
                                            finalNote: finalNote})
                }).then(
                    successAlert(),
                    getCourseInfo(courseCode),
                    setTimeout(() => {
                        console.clear()
                    }, 500)
                );
            }
        }
    }
}