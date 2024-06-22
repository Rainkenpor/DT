'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DT_STATUS extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      DT_STATUS.hasMany(models.DT_COURSE,{
        foreignKey: 'STATUS_ID',
        sourceKey: 'STATUS_ID'
      });
      DT_STATUS.hasMany(models.DT_STUDENT,{
        foreignKey: 'STATUS_ID',
        sourceKey: 'STATUS_ID'
      }); 
      DT_STATUS.hasMany(models.DT_COURSE_STUDENT,{
        foreignKey: 'STATUS_ID',
        sourceKey: 'STATUS_ID'
      });
    }
  }
  DT_STATUS.init({
    STATUS_ID: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    NAME: DataTypes.STRING,
    CREATED_AT: DataTypes.DATE,
    UPDATED_AT: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'DT_STATUS',
    freezeTableName: true,
  });
  return DT_STATUS;
};