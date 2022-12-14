/* Importing the function getAllUsers from the file getAllUsers.js. */
import { getAllUsers } from "./getAllUsers.js";

/**
 * It's a function that filters the users in the database based on the input of the user.
 */
export const studentFilter = () => {

    /* It's selecting the button with the id "filterStudentButton" and assigning it to the variable
    filterButton. */
    const filterButton = document.querySelector("#filterStudentButton");

    filterButton.addEventListener("click", (e) => {
        e.preventDefault();
        const filterInput = document.querySelector("#filterStudentInput").value;
        const selectorInput = document.querySelector("#selectorStudentInput").value;

        if(filterInput == "" && selectorInput == "nothing"){ 
            getAllUsers()
        }else if(filterInput == "" && selectorInput == "noEnrolled"){
            getAllUsers("noEnrolled", "check")
        }else{
            getAllUsers(filterInput, selectorInput)
        };


    })

}
