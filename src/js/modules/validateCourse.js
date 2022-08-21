/* Validate Student form */
export const validateCourse = () => {

    /* Selecting the elements from the DOM. */
    const courseName = document.querySelector("#courseName");
    const typeOfCourse = document.querySelector("#selectCourse");
    const courseCredits = document.querySelector("#credits");
    const teacherName = document.querySelector("#teacherName");

    const nameVerification = document.querySelector("#name-course-verification");
    const typeOfVerification = document.querySelector("#typeof-course-verification");
    const creditsVerification = document.querySelector("#credits-course-verification");
    const teacherVerification = document.querySelector("#teacher-course-verification");

    const submitButton = document.querySelector("#createCoursesButton");
 

    /**
     * If the course name, type of course, course credits, and teacher name are all filled out, then
     * the submit button will be enabled.
     */
    const activateButton = () => {
        if(courseName.value == "" || typeOfCourse.value == "nothing" || courseCredits.value == "" || teacherName.value == ""){
            submitButton.style.backgroundColor = "#ccc";
            submitButton.disabled = true;
        }else{
            submitButton.style.backgroundColor = "var(--info)";
            submitButton.disabled = false;
        }
    }

    /**
     * If the value of the item is empty, undefined, or equal to the string 'nothing', then return
     * false.
     * @param item - The item that is being checked.
     * @returns Nothing.
     */
    const verifyInput = (item) => {
        if(item.value == "" || item.value == undefined || item.value == "nothing"){
           return false;
        }
    }

    /* Adding an event listener to the courseName element. When the user clicks out of the courseName
    element, the function will run. The function will check if the courseName element is empty,
    undefined, or equal to the string 'nothing'. If it is, then the function will return false. If
    it is not, then the function will return nothing. */
    courseName.addEventListener("blur", () =>{
        const result = verifyInput(courseName);
        if(result == false){
            nameVerification.classList.remove("form-icon-success");
            nameVerification.classList.add("form-icon-error");
            nameVerification.innerHTML = "error_outline"}
        else{
            nameVerification.classList.remove("form-icon-error");
            nameVerification.classList.add("form-icon-success");
            nameVerification.innerHTML = "check";
        }
        nameVerification.style.display = "block";
        activateButton();
    })

    
    /* Adding an event listener to the typeOfCourse element. When the user clicks out of the
    typeOfCourse element, the function will run. The function will check if the typeOfCourse element
    is empty, undefined, or equal to the string 'nothing'. If it is, then the function will return
    false. If it is not, then the function will return nothing. */
    typeOfCourse.addEventListener("blur", () =>{
        const result = verifyInput(typeOfCourse);
        if(result == false){
            typeOfVerification.classList.remove("form-icon-success");
            typeOfVerification.classList.add("form-icon-error");
            typeOfVerification.innerHTML = "error_outline"}
        else{
            typeOfVerification.classList.remove("form-icon-error");
            typeOfVerification.classList.add("form-icon-success");
            typeOfVerification.innerHTML = "check";
        }
        typeOfVerification.style.display = "block";
        activateButton();
    })

    /* Adding an event listener to the courseCredits element. When the user clicks out of the
        courseCredits element, the function will run. The function will check if the courseCredits
        element is empty, undefined, or equal to the string 'nothing'. If it is, then the function will
        return false. If it is not, then the function will return nothing. */
    courseCredits.addEventListener("blur", () =>{
        const result = verifyInput(courseCredits);
        if(result == false){
            creditsVerification.classList.remove("form-icon-success");
            creditsVerification.classList.add("form-icon-error");
            creditsVerification.innerHTML = "error_outline"}
        else{
            creditsVerification.classList.remove("form-icon-error");
            creditsVerification.classList.add("form-icon-success");
            creditsVerification.innerHTML = "check";
        }
        creditsVerification.style.display = "block";
        activateButton();
    })

    /* Adding an event listener to the teacherName element. When the user clicks out of the teacherName
    element, the function will run. The function will check if the teacherName element is empty,
    undefined, or equal to the string 'nothing'. If it is, then the function will return false. If
    it is not, then the function will return nothing. */
    teacherName.addEventListener("blur", () =>{
        const result = verifyInput(teacherName);
        if(result == false){
            teacherVerification.classList.remove("form-icon-success");
            teacherVerification.classList.add("form-icon-error");
            teacherVerification.innerHTML = "error_outline"}
        else{
            teacherVerification.classList.remove("form-icon-error");
            teacherVerification.classList.add("form-icon-success");
            teacherVerification.innerHTML = "check";
        }
        teacherVerification.style.display = "block";
        activateButton();
    })

}