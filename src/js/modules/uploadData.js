export const uploadData = () => {

    /* Selecting the button with the id "uploadButton" and assigning it to the variable "uploadData" */
    const uploadData = document.querySelector("#uploadButton");

    /**
     * This function takes in three parameters, and then uses the SweetAlert2 library to display a
     * popup alert with the parameters as the title, message, and image.
     * @param type - The type of alert you want to show.
     * @param message - The message you want to display in the alert.
     * @param image - success, error, warning, info, question
     */
    const popUpAlert = (type, message, image) => {
        Swal.fire(
            `${type}`,
            `${message}`,
            `${image}`
          );
    }

    /* Listening for a click event on the button with the id "uploadButton", and when it is clicked, it
    will send a POST request to the server, and then display a popup alert. */
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