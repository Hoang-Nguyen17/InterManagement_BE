import * as express from 'express';
import Auth from '../../common/helpers/auth';
const router = express.Router();
const authInstance = new Auth();

const userController = require('./controllers/userController');
const schoolController = require('./controllers/schoolController');

router.post('/register' , authInstance.authAdmin, userController.register);

router.get('/school', schoolController.getSchool);

router.post('/school/program', authInstance.authAdmin, schoolController.saveProgram);
router.put('/school/program', authInstance.authAdmin, schoolController.updateProgram);
router.get('/school/program', authInstance.authAdmin, schoolController.getPrograms);

module.exports = router;