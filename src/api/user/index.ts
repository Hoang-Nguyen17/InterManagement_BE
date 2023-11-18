import * as express from 'express';
const router = express.Router();
import { userController } from './controllers/userController';
const schoolController = require('./controllers/schoolController');

router.post('/login', userController.login);

router.get('/academic-year', schoolController.getAcademicYear);
router.get('/semester', schoolController.getSemester);

router.get('/profile', userController.getProfile);


module.exports = router;