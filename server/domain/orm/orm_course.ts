const conn = require('../repositories/repository_oracle');


exports.GetAll = async () =>{
    try{
      const courses= await conn.DT_COURSE.findAll({
        attributes: ['COURSE_ID', 'NAME', 'DESCRIPTION', 'MAX_STUDENTS', 'STATUS_ID'],
        include: [{
            model: conn.DT_STATUS,
            attributes: [ 'NAME']
        }],
        where: {
            STATUS_ID: 1
        }
      });
      return courses;
    }catch(err){
      console.log(" err orm-user.GetAll = ", err);
      return await {err:{code: 123, messsage: err}}
    }
}

exports.GetById = async ( Id:number ) =>{
    try{
        return await conn.DT_COURSE.findOne({
            include: [{
                model: conn.DT_STATUS,
                attributes: [ 'NAME']
            }],
            where: {
                COURSE_ID: Id,
                STATUS_ID: 1
            }
        });
    }catch(err){
        console.log(" err orm-user.GetById = ", err);
        return await {err:{code: 123, messsage: err}}
    }
}

exports.Create = async (Name:string, Description:string, MaxStudents:number) =>{
    try{
        await conn.DT_COURSE.create({
            NAME: Name,
            DESCRIPTION: Description,
            MAX_STUDENTS: MaxStudents
        });
        return true
    }catch(err){
        console.log(" err orm-user.Store = ", err);
        return await {err:{code: 123, messsage: err}}
    }
}

exports.DeleteById = async ( Id:number ) =>{
    try{
        const course = await conn.DT_COURSE.update({
            STATUS_ID: 2
        },{
            where: {
                COURSE_ID: Id,
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

exports.UpdateById = async ( Name:string, Description:string, MaxStudents:number, Id:number ) =>{
    try{
        const course = await conn.DT_COURSE.update(
            {
              NAME: Name,
                DESCRIPTION: Description,
                MAX_STUDENTS: MaxStudents
            },{ 
                where: {
                    COURSE_ID: Id,
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