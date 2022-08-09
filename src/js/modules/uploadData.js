export const uploadData = () => {

    const uploadData = document.querySelector("#uploadButton");

    const popUpAlert = (type, message, image) => {
        Swal.fire(
            `${type}`,
            `${message}`,
            `${image}`
          );
    }

    uploadData.addEventListener("click", () => {
        fetch("/upload/data", {
            method: 'POST',
            headers: {'Content-type': 'application/json'}
        })
        .then(
            popUpAlert("Información subida al servidor", "La información se subió a la plataforma, la pagina se actualizara en unos segundos", "success"),
            setTimeout(() => {
                console.clear()
                window.location.reload()
            }, 2500)
        )
    })
}