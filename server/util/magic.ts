const enums = require('./enum');

exports.ResponseService = async(status:number, errorCode:number, message:string, data:any)=>{
    return await {status: status, Resp:{errorCode: errorCode, message: message, data: data}}

}

exports.LogSuccess = (msg:string) => {
    console.log(enums.GREEN_LOG, msg);
}
exports.LogInfo = (msg:string) => {
    console.log(enums.CYAN_LOG, msg);
}
exports.LogWarning = (msg:string) => {
    console.log(enums.YELLOW_LOG, msg);
}
exports.LogDanger = (msg:string) => {
    console.log(enums.RED_LOG, msg);
}


exports.ResponseService = async(status:number, code:number, message:string, data:any)=>{
    return await {status: status, Resp:{Error: code, message: message, data: data}}

}