import * as express from 'express';
import Auth from '../../common/helpers/auth';
const router = express.Router();
const authInstance = new Auth();

import { userController } from './controllers/userController';
import { schoolController } from './controllers/schoolController';
import { internSubjectController } from './controllers/internSubjectController';


router.post('/register', authInstance.authAdmin, userController.register);

router.get('/school', schoolController.getSchool);

// program
router.post('/school/:id/program', authInstance.authAdmin, schoolController.saveProgram);
router.put('/school/:id/program/:pid', authInstance.authAdmin, schoolController.updateProgram);
router.get('/school/:id/program', schoolController.getPrograms);
router.get('/school/:id/program/:pid', schoolController.getProgram);
router.delete('/school/:id/program/:pid', authInstance.authAdmin, schoolController.deleteProgram);

// department
router.post('/school/:id/department', authInstance.authAdmin, schoolController.saveDepartment);
router.put('/school/:id/department/:did', authInstance.authAdmin, schoolController.updateDepartment);
router.get('/school/:id/department', schoolController.getDepartments);
router.get('/school/:id/department/:did', schoolController.getDepartment);
router.delete('/school/:id/department/:did', authInstance.authAdmin, schoolController.deleteDepartment);

// class
router.post('/school/:id/department/:did/class', authInstance.authAdmin, schoolController.saveClass);
router.put('/school/:id/department/:did/class/:cid', authInstance.authAdmin, schoolController.updateClass);
router.get('/school/:id/class', schoolController.getClasses);
router.get('/school/:id/department/:did/class/:cid', schoolController.getClass);
router.delete('/school/:id/department/:did/class/:cid', authInstance.authAdmin, schoolController.deleteClass);

// intern subject
router.post('/school/intern-subject', authInstance.authAdmin, internSubjectController.saveInternSubject);
router.get('/school/intern-subject', authInstance.authAdmin, internSubjectController.getInternSubject);
router.get('/school/intern-subject/:id', authInstance.authAdmin, internSubjectController.getInternSubject);
router.delete('/school/intern-subject', authInstance.authAdmin, internSubjectController.deleteInternSubjects);

module.exports = router;