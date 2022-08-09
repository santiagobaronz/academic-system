const deleteStudents = (studentId, courseId) => {

    fetch("/delete/courseStudent", {
        method: 'POST',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify({  courseId: courseId,
                                studentId: studentId})
    }).then(
        Swal.fire(
            'Estudiante eliminado',
            'Recargue la pagina para refrescar la lista',
            'success'
          ),
        setTimeout(() => {
            console.clear()
        }, 500)
          
    )
    

}