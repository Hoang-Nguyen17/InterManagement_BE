import * as express from 'express';
const router = express.Router();
import { userController } from './controllers/userController';
import Auth from '../../common/helpers/auth';
import {schoolController} from './controllers/schoolController';

const authInstance = new Auth();

router.post('/login', userController.login);

router.get('/academic-year', schoolController.getAcademicYear);
router.get('/semester', schoolController.getSemester);

router.get('/profile', authInstance.auth ,userController.getProfile);


module.exports = router;