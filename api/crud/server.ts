const ex = require('express');
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const server = ex();
const helmet = require("helmet");
const cors = require("cors");

// configures dotenv to work in your application
dotenv.config();
const PORT = process.env.CRUD_PORT;

server.use(helmet());
server.use(cors());

// parse application/x-www-form-urlencoded
server.use(bodyParser.urlencoded({ extended: false, limit: "50mb" }));

// parse application/json
server.use(bodyParser.json({ limit: "50mb" }));

require("./routes/index")(server);


server.listen(PORT, () => {
    console.log("Server running at PORT: ", PORT);
  })
  .on("error", (error: any) => {
    // gracefully handle error
    throw new Error(error.message);
  });
