const magicStudent = require('../../util/magic');
const enumStudent = require('../../util/enum');
const ormStudent = require('../orm/orm_student');

exports.GetAll = async (req: any, res: any) =>{
    let status = 'Success', errorCode ='', message='', data='', statusCode=0, resp={};
    try{
        const queryStatus = req.query.status;
        const respOrm = await ormStudent.GetAll({status:queryStatus});
        if(respOrm.err){
            status = 'Failure', errorCode = respOrm.err.code, message = respOrm.err.messsage, statusCode = enumStudent.CODE_BAD_REQUEST;
        }else{
            message = 'Success Response', data = respOrm, statusCode = data.length > 0 ? enumStudent.CODE_OK : enumStudent.CODE_NO_CONTENT;
        }
        resp = await magicStudent.ResponseService(status,errorCode,message,data);
        return res.status(statusCode).send(resp);
    } catch(err) {
        console.log("err = ", err);
        resp = await magicStudent.ResponseService('Failure',enumStudent.CRASH_LOGIC,err,'');
        return res.status(enumStudent.CODE_INTERNAL_SERVER_ERROR).send(resp);
    }
}

exports.GetById = async (req: any, res: any) =>{
    let status = 'Success', errorCode ='', message='', data='', statusCode=0, resp={};
    try{
        const STUDENT_ID = req.params.STUDENT_ID;
        const respOrm = await ormStudent.GetById(STUDENT_ID);
        if(respOrm && respOrm.err){
            status = 'Failure', errorCode = respOrm.err.code, message = respOrm.err.messsage, statusCode = enumStudent.CODE_BAD_REQUEST;
        }else{
            if (respOrm) {
                message = 'Success Response', data= respOrm, statusCode = enumStudent.CODE_OK;
            }else{
                status = 'Failure', errorCode = enumStudent.ID_NOT_FOUND, message = 'ID NOT FOUND', statusCode = enumStudent.CODE_NOT_FOUND;
            }
        }
        resp = await magicStudent.ResponseService(status,errorCode,message,data);
        return res.status(statusCode).send(resp);
    } catch(err) {
        console.log("err = ", err);
        return res.status(enumStudent.CODE_INTERNAL_SERVER_ERROR).send(await magicStudent.ResponseService('Failure',enumStudent.CRASH_LOGIC,err,''));
    }
}


exports.Create = async (req: any, res: any) =>{
    try{
        const FIRST_NAME = req.body.FIRST_NAME;
        const LAST_NAME = req.body.LAST_NAME;
        const EMAIL = req.body.EMAIL;
        const PHONE = req.body.PHONE;
        if( FIRST_NAME && LAST_NAME && EMAIL && PHONE ){
          const respOrm = await ormStudent.Create( FIRST_NAME, LAST_NAME, EMAIL, PHONE );
          if(respOrm.err) return res.status(enumStudent.CODE_BAD_REQUEST).send(await magicStudent.ResponseService('Failure',respOrm.err.code,respOrm.err.messsage,''));
          return res.status(enumStudent.CODE_CREATED).send(await magicStudent.ResponseService('Success','','Estudiante creado exitosamente',''));
        }
        return res.status(enumStudent.CODE_BAD_REQUEST).send(await magicStudent.ResponseService('Failure',enumStudent.ERROR_REQUIRED_FIELD,'Campos requeridos [NAME, DESCRIPTION, MAX_STUDENTS]',''));
    } catch(err) {
        console.log("err = ", err);
        return res.status(enumStudent.CODE_INTERNAL_SERVER_ERROR).send(await magicStudent.ResponseService('Failure',enumStudent.CRASH_LOGIC,'err',''));
    }
}

exports.UpdateById = async (req: any, res: any) =>{
    try{
        const STUDENT_ID = req.params.STUDENT_ID;
        const FIRST_NAME = req.body.FIRST_NAME;
        const LAST_NAME = req.body.LAST_NAME;
        const EMAIL = req.body.EMAIL;
        const PHONE = req.body.PHONE;
        if( STUDENT_ID && FIRST_NAME && LAST_NAME && EMAIL && PHONE ){
          const respOrm = await ormStudent.UpdateById( FIRST_NAME, LAST_NAME, EMAIL, PHONE, STUDENT_ID );
          if(respOrm.err) return res.status(enumStudent.CODE_BAD_REQUEST).send(await magicStudent.ResponseService('Failure',respOrm.err.code,respOrm.err.messsage,''));
          return res.status(enumStudent.CODE_CREATED).send(await magicStudent.ResponseService('Success','','Estudiante actualizado','')); 
        }
        return res.status(enumStudent.CODE_BAD_REQUEST).send(await magicStudent.ResponseService('Failure',enumStudent.ERROR_REQUIRED_FIELD,'Campos requeridos [FIRST_NAME, LAST_NAME, EMAIL, PHONE]',''));
    } catch(err) {
        console.log("err = ", err);
        return res.status(enumStudent.CODE_INTERNAL_SERVER_ERROR).send(await magicStudent.ResponseService('Failure',enumStudent.CRASH_LOGIC,err,''));
    }
}

exports.UpdateStatusById = async (req: any, res: any) =>{
  try{
      const STUDENT_ID = req.params.STUDENT_ID;
      const STATUS_ID = req.body.STATUS_ID;
      if( STUDENT_ID && STATUS_ID  && STATUS_ID >0 && STATUS_ID < 3 ){
        const respOrm = await ormStudent.UpdateStatusById( STATUS_ID, STUDENT_ID );
        if(respOrm.err) return res.status(enumStudent.CODE_BAD_REQUEST).send(await magicStudent.ResponseService('Failure',respOrm.err.code,respOrm.err.messsage,''));
        return res.status(enumStudent.CODE_CREATED).send(await magicStudent.ResponseService('Success','','Estudiante actualizado','')); 
      }
      return res.status(enumStudent.CODE_BAD_REQUEST).send(await magicStudent.ResponseService('Failure',enumStudent.ERROR_REQUIRED_FIELD,'Campos requeridos [STUDENT_ID, STATUS_ID]',''));
  } catch(err) {
      console.log("err = ", err);
      return res.status(enumStudent.CODE_INTERNAL_SERVER_ERROR).send(await magicStudent.ResponseService('Failure',enumStudent.CRASH_LOGIC,err,''));
  }
}

exports.DeleteById = async (req: any, res: any) =>{
    let status = 'Success', errorCode ='', message='', data='', statusCode=0, resp={};
    try{
        const STUDENT_ID = req.params.STUDENT_ID;
            const respOrm = await ormStudent.DeleteById(STUDENT_ID);
            if(respOrm.err){
                status = 'Failure', errorCode = respOrm.err.code, message = respOrm.err.messsage, statusCode = enumStudent.CODE_BAD_REQUEST;
            }else{
                message = 'Estudiante deshabilitado', statusCode = enumStudent.CODE_OK;
            }
        resp = await magicStudent.ResponseService(status,errorCode,message,data)
        return res.status(statusCode).send(resp);
    } catch(err) {
        console.log("err = ", err);
        return res.status(enumStudent.CODE_INTERNAL_SERVER_ERROR).send(await magicStudent.ResponseService('Failure',enumStudent.CRASH_LOGIC,err,''));
    }
}
