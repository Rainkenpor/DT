const exLog = require('express');
const dotenvLog = require("dotenv");
const bodyParserLog = require("body-parser");
const serverLog = exLog();
const helmetLog = require("helmet");
const corsLog = require("cors");

// configures dotenv to work in your application
dotenvLog.config();
const PORTLOG = process.env.LOGS_PORT;

serverLog.use(helmetLog());
serverLog.use(corsLog());

// parse application/x-www-form-urlencoded
serverLog.use(bodyParserLog.urlencoded({ extended: false, limit: "50mb" }));

// parse application/json
serverLog.use(bodyParserLog.json({ limit: "50mb" }));

require("./routes/index")(serverLog);


serverLog.listen(PORTLOG, () => {
    console.log("Server running at PORT: ", PORTLOG);
  })
  .on("error", (error: any) => {
    // gracefully handle error
    throw new Error(error.message);
  });
