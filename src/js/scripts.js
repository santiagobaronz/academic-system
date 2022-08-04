// Imports
import {getDate} from './modules/date.js';
import { getAllUsers } from './modules/getAllUsers.js';
import { pageSelector } from './modules/pagesSelector.js';
import { studentFilter } from './modules/studentFilter.js';


window.addEventListener("load", async () => {

    // Filter Options
    studentFilter();
    // Get All Users Table
    getAllUsers();
    // Page selector
    pageSelector();
    // Date module
    getDate();
    
})
