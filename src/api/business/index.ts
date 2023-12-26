import * as express from 'express';
import Auth from '../../common/helpers/auth';
const router = express.Router();
const authInstance = new Auth();

import { businessController } from "./controllers/businessController";
import { jobController } from "./controllers/jobController";

// jobs
router.post('/job', authInstance.auth, jobController.saveJob);
router.get('/job', authInstance.auth, jobController.getJobs);
router.get('/job/:id', authInstance.auth, jobController.getJobById);
router.delete('/job', authInstance.auth, jobController.deleteJobs);

// position
router.get('/position', authInstance.auth, jobController.getPosition);
router.post('/position', authInstance.auth, jobController.savePosition);

// skill
router.get('/skill', authInstance.auth, jobController.getSkills);
router.post('/skill', authInstance.auth, jobController.saveSkill);



module.exports = router;