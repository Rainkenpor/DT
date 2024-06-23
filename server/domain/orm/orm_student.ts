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

exports.GetById = async ( STUDENT_ID:number ) =>{
    try{
        return await connStudent.DT_STUDENT.findOne({
            include: [{
                model: connStudent.DT_STATUS,
                attributes: [ 'NAME']
            }],
            where: {
                STUDENT_ID,
                STATUS_ID: 1
            }
        });
    }catch(err:any){
        console.log(" err orm-user.GetById = ", err);
        return await {err:{code: 123, messsage: err.toString()}}
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

exports.DeleteById = async ( STUDENT_ID:number ) =>{
    try{
        const course = await connStudent.DT_STUDENT.update({
            STATUS_ID: 2
        },{
            where: {
                STUDENT_ID,
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

exports.UpdateById = async ( FIRST_NAME:string, LAST_NAME:string, EMAIL:string, PHONE:string, STUDENT_ID:number ) =>{
    try{
        const student = await connStudent.DT_STUDENT.update(
            {
              FIRST_NAME,
              LAST_NAME,
              EMAIL,
              PHONE
            },{ 
                where: {
                    STUDENT_ID,
                    STATUS_ID: 1
                }
            })
            if (student[0]===0){
              return await {err:{code: 123, messsage: "Estudiante no encontrado"}}
          }
        return true
    }catch(err){
        console.log(" err orm-user.Store = ", err);
        return await {err:{code: 123, messsage: err}}
    }
}

exports.UpdateStatusById = async ( STATUS_ID:number, STUDENT_ID:number ) =>{ 
  try{
      const course = await connStudent.DT_STUDENT.update(
          {
            STATUS_ID
          },{ 
              where: {
                STUDENT_ID
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