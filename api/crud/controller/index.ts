"use strict";

const express = require("express"),
  router = express.Router(),
  serviceCourse = require("../domain/services/service_course.ts"),
  serviceStudent = require("../domain/services/service_student"),
  serviceStatus = require("../domain/services/service_status"),
  serviceCourseSt = require("../domain/services/service_course_student");

console.log("[[ COURSE ], [[ STUDENT ], [[ STATUS ], [[ COURSE_STUDENT ]]]]]");

router.get("/course/", serviceCourse.GetAll);
router.get("/course/:COURSE_ID", serviceCourse.GetById);
router.post("/course/", serviceCourse.Create);
router.delete("/course/:COURSE_ID", serviceCourse.DeleteById);
router.patch("/course/:COURSE_ID", serviceCourse.UpdateById);
router.patch("/course/:COURSE_ID/status", serviceCourse.UpdateStatusById);

router.get("/student/", serviceStudent.GetAll);
router.get("/student/:STUDENT_ID", serviceStudent.GetById);
router.post("/student/", serviceStudent.Create);
router.delete("/student/:STUDENT_ID", serviceStudent.DeleteById);
router.patch("/student/:STUDENT_ID", serviceStudent.UpdateById);
router.patch("/student/:STUDENT_ID/status", serviceStudent.UpdateStatusById);

router.get("/status/", serviceStatus.GetAll);
router.get("/status/:STATUS_ID", serviceStatus.GetById);
router.post("/status/", serviceStatus.Create);
router.delete("/status/:STATUS_ID", serviceStatus.DeleteById);
router.patch("/status/:STATUS_ID", serviceStatus.UpdateById);

router.get("/course_student/", serviceCourseSt.GetAll);
router.get("/course_student/:COURSE_ID", serviceCourseSt.GetById);
router.patch("/course_student/:COURSE_ID", serviceCourseSt.UpdateById);
router.patch(
  "/course_student/:COURSE_ID/:STUDENT_ID/status",
  serviceCourseSt.UpdateStatusById
);

module.exports = router;
