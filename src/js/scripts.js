// Imports
import { courseFilter } from './modules/courseFilter.js';
import {getDate} from './modules/date.js';
import { getAllCourses } from './modules/getAllCourses.js';
import { getAllUsers } from './modules/getAllUsers.js';
import { getLastStudents } from './modules/getLastStudents.js';
import { mainMetrics } from './modules/metrics.js';
import { pageSelector } from './modules/pagesSelector.js';
import { saveCourse } from './modules/saveCourse.js';
import { saveUser } from './modules/saveUser.js';
import { studentFilter } from './modules/studentFilter.js';
import { uploadData } from './modules/uploadData.js';
import { validateCourse } from './modules/validateCourse.js';
import { validateStudent } from './modules/validateStudent.js';



window.addEventListener("load", async () => {

    mainMetrics();
    // Upload data
    uploadData();
    // Filter options
    courseFilter();
    // Get all Courses
    getAllCourses();
    // Valide Course
    validateCourse();
    // Save course
    saveCourse();
    // Get Last Students added
    getLastStudents();
    // Validate Student Form
    validateStudent();
    // Save user
    saveUser();
    // Filter Options
    studentFilter();
    // Get All Users
    getAllUsers();
    // Page selector
    pageSelector();
    // Date module
    getDate();


    
})
