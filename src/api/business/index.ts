import * as express from 'express';
import Auth from '../../common/helpers/auth';
const router = express.Router();
const authInstance = new Auth();

import { jobController } from "./controllers/jobController";
import { ApplyController } from './controllers/applyController';
import { regularTodoController } from './controllers/regularTodoController';

// jobs
router.post('/job', authInstance.auth, jobController.saveJob);
router.post('/job-list', authInstance.auth, jobController.getJobs);
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


module.exports = router;