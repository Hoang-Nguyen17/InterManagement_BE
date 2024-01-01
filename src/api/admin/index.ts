import * as express from 'express';
import Auth from '../../common/helpers/auth';
const router = express.Router();
const authInstance = new Auth();

import { userController } from './controllers/userController';
import { schoolController } from './controllers/schoolController';
import { internSubjectController } from './controllers/internSubjectController';
import { manageAppController } from './controllers/manageAppController';
import { studentLearnInternController } from './controllers/studentLearnInternSubjectController';
import { StudentRequestRegistIntern } from './controllers/studentRequestRegistInternController';


router.post('/school/:id/register', authInstance.verifyAdminSchool, userController.register);

// --------------------------------------- manage app ----------------------------------

// school
router.post('/school', manageAppController.saveSchool);
router.delete('/school', manageAppController.deleteSchool);
router.get('/manage-school', manageAppController.getSchools);


// business
router.post('/business', manageAppController.saveBusiness);
router.put('/business', manageAppController.updateBusiness);
router.delete('/business', manageAppController.deleteSchool);
router.get('/business', manageAppController.businesses);

// school linked business
router.get('/school-linked-business', manageAppController.schoolLinkedBusinesses);

// --------------------------------------- admin school ----------------------------------

// school
router.get('/school', authInstance.authAdmin, schoolController.getSchool);

// program
router.post('/school/:id/program', authInstance.verifyAdminSchool, schoolController.saveProgram);
router.put('/school/:id/program/:pid', authInstance.verifyAdminSchool, schoolController.updateProgram);
router.get('/school/:id/program', authInstance.verifyAuthSchool, schoolController.getPrograms);
router.get('/school/:id/program/:pid', authInstance.verifyAuthSchool, schoolController.getProgram);
router.delete('/school/:id/program/:pid', authInstance.verifyAdminSchool, schoolController.deleteProgram);

// department
router.post('/school/:id/department', authInstance.verifyAdminSchool, schoolController.saveDepartment);
router.put('/school/:id/department/:did', authInstance.verifyAdminSchool, schoolController.updateDepartment);
router.get('/school/:id/department', authInstance.verifyAuthSchool, schoolController.getDepartments);
router.get('/school/:id/department/:did', authInstance.verifyAuthSchool, schoolController.getDepartment);
router.delete('/school/:id/department/:did', authInstance.verifyAdminSchool, schoolController.deleteDepartment);

// major
router.post('/school/:id/major', authInstance.authAdmin, schoolController.saveMajor);
router.get('/school/:id/major', authInstance.auth, schoolController.getMajors);
router.delete('/school/:id/major', authInstance.authAdmin, schoolController.deleteMajors);

// class
router.post('/school/:id/department/:did/class', authInstance.verifyAdminSchool, schoolController.saveClass);
router.put('/school/:id/department/:did/class/:cid', authInstance.verifyAdminSchool, schoolController.updateClass);
router.get('/school/:id/class', authInstance.verifyAuthSchool, schoolController.getClasses);
router.delete('/school/:id/class/:cid', authInstance.verifyAdminSchool, schoolController.deleteClass);

// intern subject
router.post('/school/:id/department/:did/intern-subject', authInstance.verifyAdminSchool, internSubjectController.saveInternSubject);
router.get('/school/:id/intern-subject', authInstance.verifyAuthSchool, internSubjectController.getInternSubjects);
router.delete('/school/:id/intern-subject', authInstance.verifyAdminSchool, internSubjectController.deleteInternSubjects);

// student learn intern subject
router.get('/school/:id/learn-intern', authInstance.authAdmin, studentLearnInternController.getStudentLearnInternSubject);
router.put('/school/learn-intern/:id', authInstance.authAdmin, studentLearnInternController.updateLearnIntern);

// academic year
router.post('/school/:id/academic-year', authInstance.authAdmin, schoolController.saveAcademicYear);
router.get('/school/:id/academic-year', authInstance.auth, schoolController.getAcademicYear);
router.delete('/school/:id/academic-year/:aid', authInstance.authAdmin, schoolController.deleteAcademicYear);

// semester
router.post('/school/:id/semester', authInstance.authAdmin, schoolController.saveSemester);
router.get('/school/:id/semester', authInstance.auth, schoolController.getSemester);
router.delete('/school/:id/semester/:sid', authInstance.authAdmin, schoolController.deleteSemester);

// admin
router.get('/', authInstance.authAdmin, userController.getAdministrators);

// teacher
router.get('/school/teacher', authInstance.authAdmin, userController.getTeachers);
// student
router.get('/school/student', authInstance.authAdmin, userController.getStudents);
// major

// student request regist intern
router.get('/introducing-letter', authInstance.authAdmin, StudentRequestRegistIntern.requestRegisInterns)
router.put('/introducing-letter/:id', authInstance.authAdmin, StudentRequestRegistIntern.updateRequest);
module.exports = router;