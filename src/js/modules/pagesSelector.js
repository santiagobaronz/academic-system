/* Selecting the elements */

export const pageSelector = () => {

    /* Page selector */

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

    buttonPages.forEach( (element, index) => {
        element.addEventListener("click", () => {
            removeStyles(index);
        });
    });

    /* User section selector */

    const studentsResult = document.querySelector("#studentsResult");
    const studentsForm = document.querySelector("#studentForm");
    const studentSwitch = document.querySelector("#studentSwitch");

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
        }
    });

}
