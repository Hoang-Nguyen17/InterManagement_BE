import * as express from 'express';
import Auth from '../../common/helpers/auth';
const router = express.Router();
const authInstance = new Auth();

import { businessController } from "./controllers/businessController";
import { jobController } from "./controllers/jobController";

// jobs
router.post('/job', authInstance.auth, jobController.saveJob);
router.get('/job', authInstance.auth, jobController.getJobs);
router.delete('/job', authInstance.auth, jobController.deleteJobs);


module.exports = router;