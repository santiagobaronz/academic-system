/* Validate Student form */
export const validateStudent = () => {

    /* Selecting the elements from the DOM. */
    const studentName = document.querySelector("#name");
    const studentLastName = document.querySelector("#lastName");
    const studentAge = document.querySelector("#age");
    const studentEmail = document.querySelector("#email");
    const studentPhoneNumber = document.querySelector("#phoneNumber");

    const nameVerification = document.querySelector("#name-verification");
    const lastNameVerification = document.querySelector("#lastName-verification");
    const ageVerification = document.querySelector("#age-verification");
    const emailVerification = document.querySelector("#email-verification");
    const phoneVerification = document.querySelector("#phoneNumber-verification");

    const submitButton = document.querySelector("#createStudentButton");
 

    /**
     * If the value of the input fields are empty, the button will be disabled and the background color
     * will be grey. If the value of the input fields are not empty, the button will be enabled and the
     * background color will be blue.
     */
    const activateButton = () => {
        if(studentName.value == "" || studentLastName.value == "" || studentAge.value == "" || studentEmail.value == "" || studentPhoneNumber.value == ""){
            submitButton.style.backgroundColor = "#ccc";
            submitButton.disabled = true;
        }else{
            submitButton.style.backgroundColor = "var(--info)";
            submitButton.disabled = false;
        }
    }

    /**
     * If the value of the item is empty or undefined, return false.
     * @param item - The input element that is being checked.
     * @returns the value of the item.value.
     */
    const verifyInput = (item) => {
        if(item.value == "" || item.value == undefined){
           return false;
        }
    }

    /* Checking if the input field is empty or not. If it is empty, it will display an error message.
    If it is not empty, it will display a success message. */
    studentName.addEventListener("blur", () =>{
        const result = verifyInput(studentName);
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

    /* Checking if the input field is empty or not. If it is empty, it will display an error message.
        If it is not empty, it will display a success message. */
    studentLastName.addEventListener("blur", () =>{
        const result = verifyInput(studentLastName);
        if(result == false){
            lastNameVerification.classList.remove("form-icon-success");
            lastNameVerification.classList.add("form-icon-error");
            lastNameVerification.innerHTML = "error_outline"}
        else{
            lastNameVerification.classList.remove("form-icon-error");
            lastNameVerification.classList.add("form-icon-success");
            lastNameVerification.innerHTML = "check";
        }
        lastNameVerification.style.display = "block";
        activateButton();
    })

    /* Checking if the input field is empty or not. If it is empty, it will display an error message.
        If it is not empty, it will display a success message. */
    studentAge.addEventListener("blur", () =>{
        const result = verifyInput(studentAge);
        if(result == false){
            ageVerification.classList.remove("form-icon-success");
            ageVerification.classList.add("form-icon-error");
            ageVerification.innerHTML = "error_outline"}
        else{
            ageVerification.classList.remove("form-icon-error");
            ageVerification.classList.add("form-icon-success");
            ageVerification.innerHTML = "check";
        }
        ageVerification.style.display = "block";
        activateButton();
    })

    /* Checking if the input field is empty or not. If it is empty, it will display an error message.
        If it is not empty, it will display a success message. */
    studentEmail.addEventListener("blur", () =>{
        const result = verifyInput(studentEmail);
        if(result == false){
            emailVerification.classList.remove("form-icon-success");
            emailVerification.classList.add("form-icon-error");
            emailVerification.innerHTML = "error_outline"}
        else{
            emailVerification.classList.remove("form-icon-error");
            emailVerification.classList.add("form-icon-success");
            emailVerification.innerHTML = "check";
        }
        emailVerification.style.display = "block";
        activateButton();
    })

    /* Checking if the input field is empty or not. If it is empty, it will display an error message.
        If it is not empty, it will display a success message. */
    studentPhoneNumber.addEventListener("blur", () =>{
        const result = verifyInput(studentPhoneNumber);
        if(result == false){
            phoneVerification.classList.remove("form-icon-success");
            phoneVerification.classList.add("form-icon-error");
            phoneVerification.innerHTML = "error_outline"}
        else{
            phoneVerification.classList.remove("form-icon-error");
            phoneVerification.classList.add("form-icon-success");
            phoneVerification.innerHTML = "check";
        }
        phoneVerification.style.display = "block";
        activateButton();
    })


}