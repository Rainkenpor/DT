const magic = require('../../util/magic');
const enum_ = require('../../util/enum');
const ormCourse = require('../orm/orm_course');


exports.GetAll = async (req: any, res: any) =>{
    let status = 'Success', errorCode ='', message='', data='', statusCode=0, resp={};
    try{
        const queryStatus = req.query.status;
        const respOrm = await ormCourse.GetAll({status:queryStatus});
        if(respOrm.err){
            status = 'Failure', errorCode = respOrm.err.code, message = respOrm.err.messsage, statusCode = enum_.CODE_BAD_REQUEST;
        }else{
            message = 'Success Response', data = respOrm, statusCode = data.length > 0 ? enum_.CODE_OK : enum_.CODE_NO_CONTENT;
        }
        resp = await magic.ResponseService(status,errorCode,message,data);
        return res.status(statusCode).send(resp);
    } catch(err) {
        console.log("err = ", err);
        resp = await magic.ResponseService('Failure',enum_.CRASH_LOGIC,err,'');
        return res.status(enum_.CODE_INTERNAL_SERVER_ERROR).send(resp);
    }
}

exports.GetById = async (req: any, res: any) =>{
    let status = 'Success', errorCode ='', message='', data='', statusCode=0, resp={};
    try{
        const COURSE_ID = req.params.COURSE_ID;
        const respOrm = await ormCourse.GetById(COURSE_ID);
        if(respOrm && respOrm.err){
            status = 'Failure', errorCode = respOrm.err.code, message = respOrm.err.messsage, statusCode = enum_.CODE_BAD_REQUEST;
        }else{
            if (respOrm) {
                message = 'Success Response', data= respOrm, statusCode = enum_.CODE_OK;
            }else{
                status = 'Failure', errorCode = enum_.ID_NOT_FOUND, message = 'ID NOT FOUND', statusCode = enum_.CODE_NOT_FOUND;
            }
        }
        resp = await magic.ResponseService(status,errorCode,message,data);
        return res.status(statusCode).send(resp);
    } catch(err) {
        console.log("err = ", err);
        return res.status(enum_.CODE_INTERNAL_SERVER_ERROR).send(await magic.ResponseService('Failure',enum_.CRASH_LOGIC,err,''));
    }
}


exports.Create = async (req: any, res: any) =>{
    try{
        const NAME = req.body.NAME;
        const DESCRIPTION = req.body.DESCRIPTION;
        const MAX_STUDENTS = req.body.MAX_STUDENTS;
        if( NAME && DESCRIPTION && MAX_STUDENTS ){
          const respOrm = await ormCourse.Create( NAME, DESCRIPTION, MAX_STUDENTS );
          if(respOrm.err) return res.status(enum_.CODE_BAD_REQUEST).send(await magic.ResponseService('Failure',respOrm.err.code,respOrm.err.messsage,''));
          return res.status(enum_.CODE_CREATED).send(await magic.ResponseService('Success','','Curso actualizado','')); 
        }
        return res.status(enum_.CODE_BAD_REQUEST).send(await magic.ResponseService('Failure',enum_.ERROR_REQUIRED_FIELD,'Campos requeridos [NAME, DESCRIPTION, MAX_STUDENTS]',''));
    } catch(err) {
        console.log("err = ", err);
        return res.status(enum_.CODE_INTERNAL_SERVER_ERROR).send(await magic.ResponseService('Failure',enum_.CRASH_LOGIC,'err',''));
    }
}

exports.UpdateById = async (req: any, res: any) =>{
    try{
        const COURSE_ID = req.params.COURSE_ID;
        const NAME = req.body.NAME;
        const DESCRIPTION = req.body.DESCRIPTION;
        const MAX_STUDENTS = req.body.MAX_STUDENTS;
        if( COURSE_ID && NAME && DESCRIPTION && MAX_STUDENTS ){
          const respOrm = await ormCourse.UpdateById( NAME, DESCRIPTION, MAX_STUDENTS, COURSE_ID );
          if(respOrm.err) return res.status(enum_.CODE_BAD_REQUEST).send(await magic.ResponseService('Failure',respOrm.err.code,respOrm.err.messsage,''));
          return res.status(enum_.CODE_CREATED).send(await magic.ResponseService('Success','','Curso actualizado','')); 
        }
        return res.status(enum_.CODE_BAD_REQUEST).send(await magic.ResponseService('Failure',enum_.ERROR_REQUIRED_FIELD,'Campos requeridos [NAME, DESCRIPTION, MAX_STUDENTS]',''));
    } catch(err) {
        console.log("err = ", err);
        return res.status(enum_.CODE_INTERNAL_SERVER_ERROR).send(await magic.ResponseService('Failure',enum_.CRASH_LOGIC,err,''));
    }
}

exports.UpdateStatusById = async (req: any, res: any) =>{
  try{
      const COURSE_ID = req.params.COURSE_ID;
      const STATUS_ID = req.body.STATUS_ID;
      if( COURSE_ID && STATUS_ID  && STATUS_ID >0 && STATUS_ID < 3 ){
        const respOrm = await ormCourse.UpdateStatusById( STATUS_ID, COURSE_ID );
        if(respOrm.err) return res.status(enum_.CODE_BAD_REQUEST).send(await magic.ResponseService('Failure',respOrm.err.code,respOrm.err.messsage,''));
        return res.status(enum_.CODE_CREATED).send(await magic.ResponseService('Success','','Curso actualizado','')); 
      }
      return res.status(enum_.CODE_BAD_REQUEST).send(await magic.ResponseService('Failure',enum_.ERROR_REQUIRED_FIELD,'Campos requeridos [NAME, DESCRIPTION, MAX_STUDENTS]',''));
  } catch(err) {
      console.log("err = ", err);
      return res.status(enum_.CODE_INTERNAL_SERVER_ERROR).send(await magic.ResponseService('Failure',enum_.CRASH_LOGIC,err,''));
  }
}

exports.DeleteById = async (req: any, res: any) =>{
    let status = 'Success', errorCode ='', message='', data='', statusCode=0, resp={};
    try{
        const COURSE_ID = req.params.COURSE_ID;
            const respOrm = await ormCourse.DeleteById(COURSE_ID);
            if(respOrm.err){
                status = 'Failure', errorCode = respOrm.err.code, message = respOrm.err.messsage, statusCode = enum_.CODE_BAD_REQUEST;
            }else{
                message = 'Curso deshabilitado', statusCode = enum_.CODE_OK;
            }
        resp = await magic.ResponseService(status,errorCode,message,data)
        return res.status(statusCode).send(resp);
    } catch(err) {
        console.log("err = ", err);
        return res.status(enum_.CODE_INTERNAL_SERVER_ERROR).send(await magic.ResponseService('Failure',enum_.CRASH_LOGIC,err,''));
    }
}
