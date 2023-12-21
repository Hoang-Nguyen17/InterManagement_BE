import * as express from 'express';
import Auth from '../../common/helpers/auth';
const router = express.Router();
const authInstance = new Auth();

import { studentLearnInternController } from '../admin/controllers/studentLearnInternSubjectController';
import { InternSubjectController } from './controllers/internSubjectController';

router.post('/signup-intern-subject/', studentLearnInternController.saveStudentLearnInternSubject);

// student Learn Intern
router.get('/intern-subject/:id/learn-intern/:uid', authInstance.auth, InternSubjectController.learnInternDetail)
router.post('/intern-subject/:id/learn-intern', authInstance.auth, InternSubjectController.saveLearnIntern);
module.exports = router;