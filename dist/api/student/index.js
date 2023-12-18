"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const router = express.Router();
const studentLearnInternSubjectController_1 = require("../admin/controllers/studentLearnInternSubjectController");
router.post('/signup-intern-subject/', studentLearnInternSubjectController_1.studentLearnInternController.saveStudentLearnInternSubject);
module.exports = router;
//# sourceMappingURL=index.js.map