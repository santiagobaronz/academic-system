// Imports
import {getDate} from './modules/date.js';
import { getAllUsers } from './modules/getAllUsers.js';
import { getLastStudents } from './modules/getLastStudents.js';
import { pageSelector } from './modules/pagesSelector.js';
import { saveUser } from './modules/saveUser.js';
import { studentFilter } from './modules/studentFilter.js';
import { validateStudent } from './modules/validateStudent.js';


window.addEventListener("load", async () => {


    // Get Last Students added
    getLastStudents();
    // Validate Student Form
    validateStudent();
    // Save user
    saveUser();
    // Filter Options
    studentFilter();
    // Get All Users Table
    getAllUsers();
    // Page selector
    pageSelector();
    // Date module
    getDate();
    
})
