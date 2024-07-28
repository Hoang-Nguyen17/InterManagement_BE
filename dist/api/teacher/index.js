"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const auth_1 = require("../../common/helpers/auth");
const studentController_1 = require("./controllers/studentController");
const router = express.Router();
const authInstance = new auth_1.default();
router.get('/student-learn-intern', authInstance.auth, studentController_1.studentLearnInternController.studentLearnInterns);
router.put('/student-learn-intern/:lid', authInstance.auth, studentController_1.studentLearnInternController.updateScore);
router.put('/student-learn-intern', authInstance.auth, studentController_1.studentLearnInternController.updateAllStatusStudentLearnIntern);
router.get('/student-learn-intern-intern-job', authInstance.auth, studentController_1.studentLearnInternController.getStudentLearnInternByTeacherIdAndInternJobStatus);
router.get('/student/:id', authInstance.auth, studentController_1.studentLearnInternController.getStudentDetail);
module.exports = router;
//# sourceMappingURL=index.js.map