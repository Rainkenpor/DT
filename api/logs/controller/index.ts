"use strict";

const expressLog = require("express"),
  routerLog = expressLog.Router(),
  serviceLogs = require("../domain/services/service_logs.ts")

console.log("[[ LOGS ]]");

routerLog.get("/logs/", serviceLogs.GetAll);
routerLog.post("/logs/", serviceLogs.Create);


module.exports = routerLog;
