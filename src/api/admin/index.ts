import * as express from 'express';
import Auth from '../../common/helpers/auth';
const router = express.Router();
const authInstance = new Auth();

const userController = require('./controllers/userController');

router.post('/register' , authInstance.authAdmin, userController.register);

module.exports = router;