/* Importing the function getAllUsers from the file getAllUsers.js. */
import { getAllCourses } from "./getAllCourses.js";

/**
 * It's a function that filters the users in the database based on the input of the user.
 */
export const courseFilter = () => {


    const selectorInput = document.querySelector("#selectorCoursesInput");
    const filterInput = document.querySelector("#filterCoursesInput");

    selectorInput.addEventListener("change", () => {
        if(selectorInput.value == "theoretical" || selectorInput.value == "theoretical-practical"){
            filterInput.disabled = true;
        }else{
            filterInput.disabled = false;
        }
    })

    /* It's selecting the button with the id "filterStudentButton" and assigning it to the variable
    filterButton. */
    const filterButton = document.querySelector("#filterCoursesButton");

    filterButton.addEventListener("click", (e) => {
        e.preventDefault();
        let filterInput = document.querySelector("#filterCoursesInput").value;
        const selectorInput = document.querySelector("#selectorCoursesInput").value;

        if(selectorInput == "nothing"){
            getAllCourses()
        }else if(selectorInput == "theoretical" || selectorInput == "theoretical-practical"){
            filterInput = "all";
            getAllCourses(filterInput, selectorInput)
        }else if(filterInput != "" && (selectorInput == "name" || selectorInput == "code")){
            getAllCourses(filterInput, selectorInput)
        }

    })

}
