'use strict';

const apiServices = require('../controller/index');

const routers = (app:any) => {
    app.use('/api/v1',apiServices);
};

module.exports = routers;