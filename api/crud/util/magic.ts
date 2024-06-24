const enums = require('./enum');
const axios = require('axios');


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


exports.ResponseService = async(req:any, status:number, code:number, message:string, data:any)=>{
  axios.post('http://localhost:3101/api/v1/logs', {method: req.method, path: req.url, message: message, meta: req.body})
  .then((res:any) => {
      console.log(res.data);
  })
  .catch((err:any) => {
      console.log(err.toString());
  });
    return await {status: status, Resp:{Error: code, message: message, data: data}}

}