'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DT_STUDENT extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      DT_STUDENT.belongsTo(models.DT_STATUS,{
        foreignKey: 'STATUS_ID',
        sourceKey: 'STATUS_ID'
      });
      DT_STUDENT.hasMany(models.DT_COURSE_STUDENT,{
        foreignKey: 'STUDENT_ID',
        sourceKey: 'STUDENT_ID'
      });
      // define association here
    }
  }
  DT_STUDENT.init({
    STUDENT_ID:{
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    FIRST_NAME: DataTypes.STRING,
    LAST_NAME: DataTypes.STRING,
    EMAIL: DataTypes.STRING,
    PHONE: DataTypes.STRING,
    STATUS_ID: DataTypes.INTEGER,
    CREATED_AT: DataTypes.DATE,
    UPDATED_AT: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'DT_STUDENT',
    freezeTableName: true,
  });
  return DT_STUDENT;
};