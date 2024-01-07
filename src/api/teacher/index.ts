import * as express from 'express';
import Auth from '../../common/helpers/auth';
import { studentLearnInternController } from './controllers/studentController';
const router = express.Router();
const authInstance = new Auth();

router.get('/student-learn-intern', authInstance.auth, studentLearnInternController.studentLearnInterns);
router.put('/student-learn-intern/:lid', authInstance.auth, studentLearnInternController.updateScore);
router.put('/student-learn-intern', authInstance.auth, studentLearnInternController.updateAllStatusStudentLearnIntern);

router.get('/student/:id', authInstance.auth, studentLearnInternController.getStudentDetail)

module.exports = router;
