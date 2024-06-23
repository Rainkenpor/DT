const connStudent = require('../repositories/repository_oracle');


exports.GetAll = async ({status}:any) =>{
    try{
      const where = {
         STATUS_ID: 1
      };
      if(status) where.STATUS_ID = status;
      const courses= await connStudent.DT_STUDENT.findAll({
        attributes: ['STUDENT_ID', 'FIRST_NAME', 'LAST_NAME', 'EMAIL', 'PHONE', 'STATUS_ID'],
        include: [{
            model: connStudent.DT_STATUS,
            attributes: [ 'NAME']
        }],
        where
      });
      return courses;
    }catch(err){
      console.log(" err orm-user.GetAll = ", err);
      return await {err:{code: 123, messsage: err}}
    }
}

exports.GetById = async ( COURSE_ID:number ) =>{
    try{
        return await connStudent.DT_STUDENT.findOne({
            include: [{
                model: connStudent.DT_STATUS,
                attributes: [ 'NAME']
            }],
            where: {
                COURSE_ID,
                STATUS_ID: 1
            }
        });
    }catch(err){
        console.log(" err orm-user.GetById = ", err);
        return await {err:{code: 123, messsage: err}}
    }
}

exports.Create = async (FIRST_NAME:string, LAST_NAME:string, EMAIL:string, PHONE:string) =>{
    try{
        await connStudent.DT_STUDENT.create({
            FIRST_NAME,
            LAST_NAME,
            EMAIL,
            PHONE
        });
        return true
    }catch(err){
        console.log(" err orm-user.Store = ", err);
        return await {err:{code: 123, messsage: err}}
    }
}

exports.DeleteById = async ( COURSE_ID:number ) =>{
    try{
        const course = await connStudent.DT_STUDENT.update({
            STATUS_ID: 2
        },{
            where: {
                COURSE_ID,
                STATUS_ID: 1
            }
        });
        if (course[0]===0){
            return await {err:{code: 123, messsage: "Course not found"}}
        }
        return true
    }catch(err){
        console.log(" err orm-user.Store = ", err);
        return await {err:{code: 123, messsage: err}}
    }
}

exports.UpdateById = async ( NAME:string, DESCRIPTION:string, MAX_STUDENTS:number, COURSE_ID:number ) =>{ 
    try{
        const course = await connStudent.DT_STUDENT.update(
            {
              NAME,
                DESCRIPTION,
                MAX_STUDENTS
            },{ 
                where: {
                    COURSE_ID,
                    STATUS_ID: 1
                }
            })
            if (course[0]===0){
              return await {err:{code: 123, messsage: "Course not found"}}
          }
        return true
    }catch(err){
        console.log(" err orm-user.Store = ", err);
        return await {err:{code: 123, messsage: err}}
    }
}

exports.UpdateStatusById = async ( STATUS_ID:number, COURSE_ID:number ) =>{ 
  try{
      const course = await connStudent.DT_STUDENT.update(
          {
            STATUS_ID
          },{ 
              where: {
                COURSE_ID
              }
          })
          if (course[0]===0){
            return await {err:{code: 123, messsage: "Course not found"}}
        }
      return true
  }catch(err){
      console.log(" err orm-user.Store = ", err);
      return await {err:{code: 123, messsage: err}}
  }
}