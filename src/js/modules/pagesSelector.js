/* Importing the function getAllUsers from the file getAllUsers.js. */
import { getAllUsers } from "./getAllUsers.js";
import { getLastStudents } from "./getLastStudents.js";

export const pageSelector = () => {

    /* Page selector */

    /* Selecting the elements from the DOM. */
    const dashboardButton = document.querySelector("#dashboardButton");
    const coursesButton = document.querySelector("#coursesButton");
    const studentsButton = document.querySelector("#studentsButton");
    const metricsButton = document.querySelector("#metricsButton");
    const documentsButton = document.querySelector("#documentsButton");
    const buttonPages = [dashboardButton, coursesButton, studentsButton,
        metricsButton, documentsButton];

    const dashboardPage = document.querySelector("#dashboardPage");
    const coursesPage = document.querySelector("#coursesPage");
    const studentsPage = document.querySelector("#studentsPage");
    const metricsPage = document.querySelector("#metricsPage");
    const documentsPage = document.querySelector("#documentsPage");

    const appPages = [dashboardPage, coursesPage, studentsPage,
                    metricsPage, documentsPage];

    /**
     * It removes the display property of all the elements in the appPages array except the one that
     * matches the page parameter
     * @param page - The page you want to display.
     */
    const removeStyles = (page) => {
        appPages.forEach((element, index) => {
            if(index != page){
                element.style.display = "none";
                buttonPages[index].classList.add("inactive");
                buttonPages[index].classList.remove("active");
            }else{
                element.style.display = "block";
                buttonPages[index].classList.remove("inactive");
                buttonPages[index].classList.add("active");
            }
        });
    }

    /* Adding an event listener to each element in the buttonPages array. */
    buttonPages.forEach( (element, index) => {
        element.addEventListener("click", () => {
            removeStyles(index);
        });
    });

    /* User section selector */

    /* Selecting the elements from the DOM. */
    const studentsResult = document.querySelector("#studentsResult");
    const studentsForm = document.querySelector("#studentForm");
    const studentSwitch = document.querySelector("#studentSwitch");

    /* Adding an event listener to the studentsButton element. When the button is clicked, the function
    getAllUsers is called. */
    studentsButton.addEventListener("click", () => {
        studentsResult.style.display = "grid";
        studentsForm.style.display = "none";
        studentSwitch.firstElementChild.innerHTML = "person_add_alt_1";
        studentSwitch.lastElementChild.innerHTML = "Crear estudiante";
        getAllUsers();
    })

    dashboardButton.addEventListener("click", () => {
        getLastStudents();
    })

    /* An event listener that is listening for a click event. When the event is triggered, it checks if
    the studentsResult element is not hidden. If it is not hidden, it hides the studentsResult
    element and shows the studentsForm element. If it is hidden, it shows the studentsResult element
    and hides the studentsForm element. */
    studentSwitch.addEventListener("click", () => {
        if(studentsResult.style.display != "none"){
            studentsResult.style.display = "none";
            studentsForm.style.display = "grid";
            studentSwitch.firstElementChild.innerHTML = "remove_red_eye";
            studentSwitch.lastElementChild.innerHTML = "Ver estudiantes";
        }else{
            studentsResult.style.display = "block";
            studentsForm.style.display = "none";
            studentSwitch.firstElementChild.innerHTML = "person_add_alt_1";
            studentSwitch.lastElementChild.innerHTML = "Crear estudiante";
            getAllUsers();
        }
    });

}
