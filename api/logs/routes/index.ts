'use strict';

const apiServicesLogs = require('../controller/index');

const routerslogs = (app:any) => {
    app.use('/api/v1',apiServicesLogs);
};

module.exports = routerslogs;