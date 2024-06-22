'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert('DT_STATUS', [{
       STATUS_ID: 1,
       NAME: 'Activo',
       CREATED_AT: new Date(),
       UPDATED_AT: new Date()
     },
     {
       STATUS_ID: 2,
       NAME: 'Inactivo',
       CREATED_AT: new Date(),
       UPDATED_AT: new Date()
     },{
       STATUS_ID: 3,
       NAME: 'Pendiente',
       CREATED_AT: new Date(),
       UPDATED_AT: new Date()
     },{
       STATUS_ID: 4,
       NAME: 'Aprobado',
       CREATED_AT: new Date(),
       UPDATED_AT: new Date()
     },{
       STATUS_ID: 5,
       NAME: 'Rechazado',
       CREATED_AT: new Date(),
       UPDATED_AT: new Date()
     }], {});
    
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
