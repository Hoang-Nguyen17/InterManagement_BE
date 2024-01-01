import * as express from 'express';
import Auth from '../../common/helpers/auth';
import { conversationBusinessController } from './controllers/chatBusinessController';
import { conversationStudentController } from './controllers/chatStudentController';
const router = express.Router();
const authInstance = new Auth();

// business
router.get('/business/conversations', authInstance.auth, conversationBusinessController.conversations);
router.get('/business/conversations/:id', authInstance.auth, conversationBusinessController.getConversationDetail);

// student
router.get('/student/conversations', authInstance.auth, conversationStudentController.conversations);
router.get('/student/conversations/:id', authInstance.auth, conversationStudentController.getConversationDetail);

module.exports = router;