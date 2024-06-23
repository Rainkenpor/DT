const connCourseStudent = require("../repositories/repository_oracle");

exports.GetAll = async ({ status }: any) => {
  try {
    const where = {
      STATUS_ID: 1,
    };
    if (status) where.STATUS_ID = status;
    const courses = await connCourseStudent.DT_COURSE_STUDENT.findAll({
      attributes: [
        "COURSE_ID",
        "NAME",
        "DESCRIPTION",
        "MAX_STUDENTS",
        "STATUS_ID",
      ],
      include: [
        {
          model: connCourseStudent.DT_STATUS,
          attributes: ["NAME"],
        },
      ],
      where,
    });
    return courses;
  } catch (err) {
    console.log(" err orm-user.GetAll = ", err);
    return await { err: { code: 123, messsage: err } };
  }
};

exports.GetById = async (COURSE_ID: number) => {
  console.log("GetById = ", COURSE_ID);
  try {
    return await connCourseStudent.DT_COURSE_STUDENT.findAll({
      include: [
        {
          model: connCourseStudent.DT_STUDENT,
          required: true,
          attributes: [
            "STUDENT_ID",
            "FIRST_NAME",
            "LAST_NAME",
            "EMAIL",
            "PHONE",
          ],
          where: {
            STATUS_ID: 1,
          },
        },
        {
          model: connCourseStudent.DT_STATUS,
          attributes: ["NAME"],
        },
      ],
      where: {
        COURSE_ID,
      },
    });
  } catch (err: any) {
    console.log(" err orm-user.GetById = ", err);
    return await { err: { code: 123, messsage: err.toString() } };
  }
};

exports.UpdateById = async (STUDENTS: Array<number>, COURSE_ID: number) => {
  try {
    const transaction = await connCourseStudent.sequelize.transaction();
    await connCourseStudent.DT_COURSE_STUDENT.destroy(
      {
        where: {
          COURSE_ID,
        },
      },
      {
        transaction,
      }
    );
    const recorrer = async (i: number) => {
      if (i < STUDENTS.length) {
        await connCourseStudent.DT_COURSE_STUDENT.create(
          {
            COURSE_ID,
            STUDENT_ID: STUDENTS[i],
          },
          {
            transaction,
          }
        );
        await recorrer(i + 1);
      }
    };

    await recorrer(0);
    console.log("Insertando");
    await transaction.commit();
    return true;
  } catch (err) {
    console.log(" err orm-user.Store = ", err);
    return await { err: { code: 123, messsage: err } };
  }
};

exports.UpdateStatusById = async (
  STATUS_ID: number,
  COURSE_ID: number,
  STUDENT_ID: number
) => {
  console.log("UpdateStatusById = ", COURSE_ID, STUDENT_ID, STATUS_ID);
  try {
    const course = await connCourseStudent.DT_COURSE_STUDENT.update(
      {
        STATUS_ID,
      },
      {
        where: {
          COURSE_ID,
          STUDENT_ID,
        },
      }
    );
    if (course[0] === 0) {
      return await { err: { code: 123, messsage: "Asignación no encontrada" } };
    }
    return true;
  } catch (err) {
    console.log(" err orm-user.Store = ", err);
    return await { err: { code: 123, messsage: err } };
  }
};
