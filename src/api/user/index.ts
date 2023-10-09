import * as express from 'express';
const router = express.Router();
const userController = require('./controllers/userController')

router.post('/login', userController.login);


module.exports = router;