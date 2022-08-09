import { getCourseInfo } from "./getInfoCourse.js"

export const deleteStudents = (studentId, courseId, courseCode) => {

    fetch("/delete/courseStudent", {
        method: 'POST',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify({  courseId: courseId,
                                studentId: studentId})
    }).then(
        Swal.fire(
            'Estudiante eliminado',
            'El estudiante fue eliminado del curso',
            'success'
          ),
        getCourseInfo(courseCode),
        setTimeout(() => {
            console.clear()
        }, 500)
          
    )
    

}