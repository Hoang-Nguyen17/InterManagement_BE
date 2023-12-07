import * as express from 'express';
import Auth from '../../common/helpers/auth';
const router = express.Router();
const authInstance = new Auth();

import { userController } from './controllers/userController';
import { schoolController } from './controllers/schoolController';
import { internSubjectController } from './controllers/internSubjectController';


router.post('/school/:id/register', authInstance.verifyAdminSchool, userController.register);

router.get('/school', authInstance.authAdmin, schoolController.getSchool);

// program
router.post('/school/:id/program', authInstance.verifyAdminSchool, schoolController.saveProgram);
router.put('/school/:id/program/:pid', authInstance.verifyAdminSchool, schoolController.updateProgram);
router.get('/school/:id/program',authInstance.verifyAuthSchool, schoolController.getPrograms);
router.get('/school/:id/program/:pid', authInstance.verifyAuthSchool, schoolController.getProgram);
router.delete('/school/:id/program/:pid', authInstance.verifyAdminSchool, schoolController.deleteProgram);

// department
router.post('/school/:id/department', authInstance.verifyAdminSchool, schoolController.saveDepartment);
router.put('/school/:id/department/:did', authInstance.verifyAdminSchool, schoolController.updateDepartment);
router.get('/school/:id/department', authInstance.verifyAuthSchool, schoolController.getDepartments);
router.get('/school/:id/department/:did', authInstance.verifyAuthSchool, schoolController.getDepartment);
router.delete('/school/:id/department/:did', authInstance.verifyAdminSchool, schoolController.deleteDepartment);

// class
router.post('/school/:id/department/:did/class', authInstance.verifyAdminSchool, schoolController.saveClass);
router.put('/school/:id/department/:did/class/:cid', authInstance.verifyAdminSchool, schoolController.updateClass);
router.get('/school/:id/class', authInstance.verifyAuthSchool, schoolController.getClasses);
router.delete('/school/:id/class/:cid', authInstance.verifyAdminSchool, schoolController.deleteClass);

// intern subject
router.post('/school/:id/department/:did/intern-subject', authInstance.verifyAdminSchool, internSubjectController.saveInternSubject);
router.get('/school/:id/intern-subject', authInstance.verifyAuthSchool, internSubjectController.getInternSubjects);
router.delete('/school/:id/intern-subject', authInstance.verifyAdminSchool, internSubjectController.deleteInternSubjects);

// admin
router.get('/', authInstance.authAdmin, userController.getAdministrators);

// teacher
router.get('/school/teacher', authInstance.authAdmin, userController.getTeachers);
// student
router.get('/school/student', authInstance.authAdmin, userController.getStudents);
// major

module.exports = router;