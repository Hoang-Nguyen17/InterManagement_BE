import * as express from 'express';
const Auth = require('../../common/helpers/auth');
const router = express.Router();

const schoolController = require('./controllers/schoolController');

// router.get('/school', Auth.auth ,schoolController.getSchools);

module.exports = router;