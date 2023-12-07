"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const router = express.Router();
const userController_1 = require("./controllers/userController");
const auth_1 = require("../../common/helpers/auth");
const schoolController_1 = require("./controllers/schoolController");
const authInstance = new auth_1.default();
router.post('/login', userController_1.userController.login);
router.get('/academic-year', schoolController_1.schoolController.getAcademicYear);
router.get('/semester', schoolController_1.schoolController.getSemester);
router.get('/profile', authInstance.auth, userController_1.userController.getProfile);
module.exports = router;
//# sourceMappingURL=index.js.map