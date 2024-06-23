const ormCourseStudent = require("../orm/orm_course_student");
const enumCourseStudent = require("../../util/enum");
const magicCourseStudent = require("../../util/magic");

exports.GetAll = async (req: any, res: any) => {
  let status = "Success",
    errorCode = "",
    message = "",
    data = "",
    statusCode = 0,
    resp = {};
  try {
    const respOrm = await ormCourseStudent.GetAll();
    if (respOrm.err) {
      (status = "Failure"),
        (errorCode = respOrm.err.code),
        (message = respOrm.err.messsage),
        (statusCode = enumCourseStudent.CODE_BAD_REQUEST);
    } else {
      (message = "Success Response"),
        (data = respOrm),
        (statusCode =
          data.length > 0
            ? enumCourseStudent.CODE_OK
            : enumCourseStudent.CODE_NO_CONTENT);
    }
    resp = await magicCourseStudent.ResponseService(req,
      status,
      errorCode,
      message,
      data
    );
    return res.status(statusCode).send(resp);
  } catch (err) {
    console.log("err = ", err);
    resp = await magicCourseStudent.ResponseService(req,
      "Failure",
      enumCourseStudent.CRASH_LOGIC,
      err,
      ""
    );
    return res.status(enumCourseStudent.CODE_INTERNAL_SERVER_ERROR).send(resp);
  }
};

exports.GetById = async (req: any, res: any) => {
  let status = "Success",
    errorCode = "",
    message = "",
    data = "",
    statusCode = 0,
    resp = {};
  try {
    const id = req.params.COURSE_ID;
    console.log("id = ", id);
    const respOrm = await ormCourseStudent.GetById(id);
    if (respOrm && respOrm.err) {
      (status = "Failure"),
        (errorCode = respOrm.err.code),
        (message = respOrm.err.messsage),
        (statusCode = enumCourseStudent.CODE_BAD_REQUEST);
    } else {
      if (respOrm) {
        (message = "Success Response"),
          (data = respOrm),
          (statusCode = enumCourseStudent.CODE_OK);
      } else {
        (status = "Failure"),
          (errorCode = enumCourseStudent.ID_NOT_FOUND),
          (message = "ID NOT FOUND"),
          (statusCode = enumCourseStudent.CODE_NOT_FOUND);
      }
    }
    resp = await magicCourseStudent.ResponseService(req,
      status,
      errorCode,
      message,
      data
    );
    return res.status(statusCode).send(resp);
  } catch (err) {
    console.log("err = ", err);
    return res
      .status(enumCourseStudent.CODE_INTERNAL_SERVER_ERROR)
      .send(
        await magicCourseStudent.ResponseService(req,
          "Failure",
          enumCourseStudent.CRASH_LOGIC,
          err,
          ""
        )
      );
  }
};

exports.UpdateById = async (req: any, res: any) => {
  try {
    const COURSE_ID = req.params.COURSE_ID;
    const STUDENTS = req.body.STUDENTS;
    if (COURSE_ID && typeof STUDENTS === "object") {
      const respOrm = await ormCourseStudent.UpdateById(STUDENTS, COURSE_ID);
      if (respOrm.err)
        return res
          .status(enumCourseStudent.CODE_BAD_REQUEST)
          .send(
            await magicCourseStudent.ResponseService(req,
              "Failure",
              respOrm.err.code,
              respOrm.err.messsage,
              ""
            )
          );
      return res
        .status(enumCourseStudent.CODE_CREATED)
        .send(
          await magicCourseStudent.ResponseService(req,
            "Success",
            "",
            "Asignación actualizada",
            ""
          )
        );
    }
    return res
      .status(enumCourseStudent.CODE_BAD_REQUEST)
      .send(
        await magicCourseStudent.ResponseService(req,
          "Failure",
          enumCourseStudent.ERROR_REQUIRED_FIELD,
          "Campos requeridos [COURSE_ID, STUDENTS]",
          ""
        )
      );
  } catch (err) {
    console.log("err = ", err);
    return res
      .status(enumCourseStudent.CODE_INTERNAL_SERVER_ERROR)
      .send(
        await magicCourseStudent.ResponseService(req,
          "Failure",
          enumCourseStudent.CRASH_LOGIC,
          err,
          ""
        )
      );
  }
};

exports.UpdateStatusById = async (req: any, res: any) => {
  try {
    const COURSE_ID = req.params.COURSE_ID;
    const STUDENT_ID = req.params.STUDENT_ID;
    const STATUS_ID = req.body.STATUS_ID;
    if (
      COURSE_ID && STUDENT_ID && STATUS_ID && STATUS_ID >= 3  && STATUS_ID && STATUS_ID <=5
    ) {
      const respOrm = await ormCourseStudent.UpdateStatusById(
        STATUS_ID,
        COURSE_ID,
        STUDENT_ID
      );
      if (respOrm.err)
        return res
          .status(enumCourseStudent.CODE_BAD_REQUEST)
          .send(
            await magicCourseStudent.ResponseService(req,
              "Failure",
              respOrm.err.code,
              respOrm.err.messsage,
              ""
            )
          );
      return res
        .status(enumCourseStudent.CODE_CREATED)
        .send(
          await magicCourseStudent.ResponseService(req,
            "Success",
            "",
            "Asignación actualizada",
            ""
          )
        );
    }
    return res
      .status(enumCourseStudent.CODE_BAD_REQUEST)
      .send(
        await magicCourseStudent.ResponseService(req,
          "Failure",
          enumCourseStudent.ERROR_REQUIRED_FIELD,
          "Campos requeridos [COURSE_ID, STUDENT_ID, STATUS_ID]",
          ""
        )
      );
  } catch (err) {
    console.log("err = ", err);
    return res
      .status(enumCourseStudent.CODE_INTERNAL_SERVER_ERROR)
      .send(
        await magicCourseStudent.ResponseService(req,
          "Failure",
          enumCourseStudent.CRASH_LOGIC,
          err,
          ""
        )
      );
  }
};
