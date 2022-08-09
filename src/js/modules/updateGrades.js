const updateGrades = (studentId, courseId, typeOfCourse, courseCode) => {

    const errorAlert = (type, message) => {
        Swal.fire(
            `${type}`,
            `${message}`,
            'error'
          );
    }

    const successAlert = () => {
        Swal.fire(
            'Notas actualizadas',
            'Recargue la pagina para ver la nota actualizada',
            'success'
          );
    }

    let grades = []
    let errorBoolean = 0;
    let gradesInput = document.querySelectorAll(`.input${studentId}`);

    gradesInput.forEach( grade => {

        if(grade.value < 0 || grade.value > 50){
            errorAlert("Fuera de rango", "Ingrese valores entre 0 y 50")
            errorBoolean++;
        }

        grades.push(grade.value)
    })

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
                                            finalNote: finalNote})
                }).then(
                    successAlert(),
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
                                            finalNote: finalNote})
                }).then(
                    successAlert(),
                    setTimeout(() => {
                        console.clear()
                    }, 500)
                    
                );
            }
        }
    }
}