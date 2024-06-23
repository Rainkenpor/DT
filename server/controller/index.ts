'use strict';

const   express         = require('express'),
        router          = express.Router(),
        serviceCourse   = require('../domain/services/service_course.ts'),
        serviceStudent  = require('../domain/services/service_student'),
        serviceStatus   = require('../domain/services/service_status'),
        serviceCourseSt = require('../domain/services/service_course_student');

console.log('[[ COURSE ], [[ STUDENT ], [[ STATUS ], [[ COURSE_STUDENT ]]]]]');

router.get('/course/', serviceCourse.GetAll);
router.get('/course/:COURSE_ID', serviceCourse.GetById);
router.post('/course/', serviceCourse.Create);
router.delete('/course/:COURSE_ID', serviceCourse.DeleteById);
router.patch('/course/:COURSE_ID', serviceCourse.UpdateById);
router.patch('/course/:COURSE_ID/status', serviceCourse.UpdateStatusById);


router.get('/student/', serviceStudent.GetAll);
router.get('/student/:id', serviceStudent.GetById);
router.post('/student/', serviceStudent.Create);
router.delete('/student/:id', serviceStudent.DeleteById);
router.patch('/student/:id', serviceStudent.UpdateById);
router.patch('/student/:id/status', serviceStudent.UpdateStatusById);


router.get('/status/', serviceStatus.GetAll);
router.get('/status/:id', serviceStatus.GetById);
router.post('/status/', serviceStatus.Create);
router.delete('/status/:id', serviceStatus.DeleteById);
router.patch('/status/:id', serviceStatus.UpdateById);

router.get('/course_student/', serviceCourseSt.GetAll);
router.get('/course_student/:id', serviceCourseSt.GetById);
router.post('/course_student/', serviceCourseSt.Create);
router.delete('/course_student/:id', serviceCourseSt.DeleteById);
router.patch('/course_student/:id', serviceCourseSt.UpdateById);  

module.exports = router;