import * as express from 'express';
const router = express.Router();
const userController = require('./controllers/userController');
const schoolController = require('./controllers/schoolController');

router.post('/login', userController.login);

router.get('/academic-year', schoolController.getAcademicYear);
router.get('/semester', schoolController.getSemester);


module.exports = router;