const conn = require("../repositories/repository_oracle");

exports.GetAll = async ({ status }: any) => {
  try {
    const where = {
      STATUS_ID: 1,
    };
    if (status) where.STATUS_ID = status;
    const courses = await conn.DT_COURSE.findAll({
      attributes: [
        "COURSE_ID",
        "NAME",
        "DESCRIPTION",
        "MAX_STUDENTS",
        "STATUS_ID",
      ],
      include: [
        {
          model: conn.DT_STATUS,
          attributes: ["NAME"],
        },
      ],
      where,
    });
    const countStudents = await conn.DT_COURSE_STUDENT.findAll({
      where: {
        COURSE_ID: {
          [conn.Sequelize.Op.in]: courses.map(
            (course: any) => course.COURSE_ID
          ),
        },
      },
    });

    const list: any[] = [];
    courses.forEach((course: any) => {
      list.push({
        COURSE_ID: course.COURSE_ID,
        NAME: course.NAME,
        DESCRIPTION: course.DESCRIPTION,
        MAX_STUDENTS: course.MAX_STUDENTS,
        STATUS_ID: course.STATUS_ID,
        DT_STATUS: course.DT_STATUS,
        NUMBER_OF_STUDENTS: countStudents.filter(
          (c: any) => c.COURSE_ID === course.COURSE_ID
        ).length,
      });
    });
    // console.log("countStudents = ", courses);
    return list;
  } catch (err) {
    console.log(" err orm-user.GetAll = ", err);
    return await { err: { code: 123, messsage: err } };
  }
};

exports.GetById = async (COURSE_ID: number) => {
  try {
    const course = await conn.DT_COURSE.findOne({
      include: [
        {
          model: conn.DT_STATUS,
          attributes: ["NAME"],
        },
      ],
      where: {
        COURSE_ID,
        STATUS_ID: 1,
      },
    });

    const countStudents = await conn.DT_COURSE_STUDENT.count({
      where: {
        COURSE_ID: {
          [conn.Sequelize.Op.in]: [course.COURSE_ID],
        },
      },
    });

    const list = {
      COURSE_ID: course.COURSE_ID,
      NAME: course.NAME,
      DESCRIPTION: course.DESCRIPTION,
      MAX_STUDENTS: course.MAX_STUDENTS,
      STATUS_ID: course.STATUS_ID,
      DT_STATUS: course.DT_STATUS,
      NUMBER_OF_STUDENTS: countStudents,
    };

    return list;
  } catch (err) {
    console.log(" err orm-user.GetById = ", err);
    return await { err: { code: 123, messsage: err } };
  }
};

exports.Create = async (
  NAME: string,
  DESCRIPTION: string,
  MAX_STUDENTS: number
) => {
  try {
    await conn.DT_COURSE.create({
      NAME,
      DESCRIPTION,
      MAX_STUDENTS,
    });
    return true;
  } catch (err) {
    console.log(" err orm-user.Store = ", err);
    return await { err: { code: 123, messsage: err } };
  }
};

exports.DeleteById = async (COURSE_ID: number) => {
  try {
    const course = await conn.DT_COURSE.update(
      {
        STATUS_ID: 2,
      },
      {
        where: {
          COURSE_ID,
          STATUS_ID: 1,
        },
      }
    );
    if (course[0] === 0) {
      return await { err: { code: 123, messsage: "Course not found" } };
    }
    return true;
  } catch (err) {
    console.log(" err orm-user.Store = ", err);
    return await { err: { code: 123, messsage: err } };
  }
};

exports.UpdateById = async (
  NAME: string,
  DESCRIPTION: string,
  MAX_STUDENTS: number,
  COURSE_ID: number
) => {
  try {
    const course = await conn.DT_COURSE.update(
      {
        NAME,
        DESCRIPTION,
        MAX_STUDENTS,
      },
      {
        where: {
          COURSE_ID,
          STATUS_ID: 1,
        },
      }
    );
    if (course[0] === 0) {
      return await { err: { code: 123, messsage: "Course not found" } };
    }
    return true;
  } catch (err) {
    console.log(" err orm-user.Store = ", err);
    return await { err: { code: 123, messsage: err } };
  }
};

exports.UpdateStatusById = async (STATUS_ID: number, COURSE_ID: number) => {
  try {
    const course = await conn.DT_COURSE.update(
      {
        STATUS_ID,
      },
      {
        where: {
          COURSE_ID,
        },
      }
    );
    if (course[0] === 0) {
      return await { err: { code: 123, messsage: "Course not found" } };
    }
    return true;
  } catch (err) {
    console.log(" err orm-user.Store = ", err);
    return await { err: { code: 123, messsage: err } };
  }
};
