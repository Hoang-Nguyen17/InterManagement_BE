import * as express from 'express';
const router = express.Router();

import { studentLearnInternController } from '../admin/controllers/studentLearnInternSubjectController';

router.post('/signup-intern-subject/', studentLearnInternController.saveStudentLearnInternSubject);

module.exports = router;