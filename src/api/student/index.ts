import * as express from "express";
import Auth from "../../common/helpers/auth";
const router = express.Router();
const authInstance = new Auth();

import { InternSubjectController } from "./controllers/internSubjectController";
import { ApplyController } from "./controllers/applyController";
import { JobController } from "./controllers/jobController";
import { StudentRequestRegistIntern } from "./controllers/requestRegisInternController";
import { regularTodoController } from "./controllers/regularTodoController";
import { reportController } from "./controllers/reportController";

// student request introducing letter
router.get(
  "/introducing-letter",
  authInstance.auth,
  StudentRequestRegistIntern.requestRegisInterns
);
router.post(
  "/introducing-letter",
  authInstance.auth,
  StudentRequestRegistIntern.saveRequest
);
router.delete(
  "/introducing-letter/:id",
  authInstance.auth,
  StudentRequestRegistIntern.deleteRequest
);

// student Learn Intern
router.get(
  "/intern-subject/learn-intern",
  authInstance.auth,
  InternSubjectController.learnInternDetail
);
router.post(
  "/intern-subject/:id/learn-intern",
  authInstance.auth,
  InternSubjectController.saveLearnIntern
);
router.delete(
  "/intern-subject/:id/learn-intern/:lid",
  authInstance.auth,
  InternSubjectController.deleteLearnIntern
);

// apply
router.get("/apply", authInstance.auth, ApplyController.applies);
router.post("/apply", authInstance.auth, ApplyController.saveApply);
router.delete("/apply/:id", authInstance.auth, ApplyController.deleteApply);

// job
router.put("/job/:id/rate_point", authInstance.auth, JobController.rateJob);
router.put("/job/:id/add_view", authInstance.auth, JobController.addView);
router.get("/job/trending", authInstance.auth, JobController.getJobTrending);
router.get("/job/recommend", authInstance.auth, JobController.getJobRecommend);

// regular todo
router.get(
  "/regular-todo",
  authInstance.auth,
  regularTodoController.getRegularTododetail
);
router.put(
  "/regular-todo/detail-todo/:id",
  authInstance.auth,
  regularTodoController.updateDetailTodo
);

//report
router.get("/report", authInstance.auth, reportController.report);
router.post("/report", authInstance.auth, reportController.saveReport);

// intern job
router.get("/intern-job", authInstance.auth, reportController.report);
router.put("/intern-job", authInstance.auth, reportController.saveReport);

module.exports = router;
