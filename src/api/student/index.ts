import * as express from 'express';
import Auth from '../../common/helpers/auth';
const router = express.Router();
const authInstance = new Auth();

import { InternSubjectController } from './controllers/internSubjectController';

// student Learn Intern
router.get('/intern-subject/:id/learn-intern/:lid', authInstance.auth, InternSubjectController.learnInternDetail)
router.post('/intern-subject/:id/learn-intern', authInstance.auth, InternSubjectController.saveLearnIntern);
router.delete('/intern-subject/:id/learn-intern/:lid', authInstance.auth, InternSubjectController.deleteLearnIntern);

module.exports = router;