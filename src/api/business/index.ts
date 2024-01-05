import * as express from 'express';
import Auth from '../../common/helpers/auth';
const router = express.Router();
const authInstance = new Auth();

import { jobController } from "./controllers/jobController";
import { ApplyController } from './controllers/applyController';
import { regularTodoController } from './controllers/regularTodoController';
import { linkedController } from './controllers/linkedController';
import { internJobController } from './controllers/internJobController';

// jobs
router.post('/job', authInstance.auth, jobController.saveJob);
router.get('/job-list', authInstance.auth, jobController.getJobs);
router.get('/job/:id', authInstance.auth, jobController.getJobById);
router.delete('/job', authInstance.auth, jobController.deleteJobs);

// position
router.get('/position', authInstance.auth, jobController.getPosition);
router.post('/position', authInstance.auth, jobController.savePosition);

// skill
router.get('/skill', authInstance.auth, jobController.getSkills);
router.post('/skill', authInstance.auth, jobController.saveSkill);

// apply
router.get('/apply', authInstance.auth, ApplyController.applies);
router.post('/apply/:id', authInstance.auth, ApplyController.updateApply);

// regular todo
router.get('/regular-todo', authInstance.auth, regularTodoController.getRegularTodos);
router.get('/regular-todo/:id', authInstance.auth, regularTodoController.getRegularTododetail);
router.post('/regular-todo/:id/todo', authInstance.auth, regularTodoController.saveRegularTodo);

// update linked school
router.get('/linked-school', authInstance.auth, linkedController.schoolLinked);
router.put('/linked-school/:id', authInstance.auth, linkedController.updateLinked);

// intern job
router.get('/intern-job', authInstance.auth, internJobController.internJobs);
router.put('/intern-job/:id', authInstance.auth, internJobController.updateInternJob);

module.exports = router;