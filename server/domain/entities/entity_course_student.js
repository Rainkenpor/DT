'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DT_COURSE_STUDENT extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      DT_COURSE_STUDENT.belongsTo(models.DT_STUDENT, {
        foreignKey: 'STUDENT_ID',
        sourceKey: 'STUDENT_ID',
      });
      DT_COURSE_STUDENT.belongsTo(models.DT_COURSE, {
        foreignKey: 'COURSE_ID',
        sourceKey: 'COURSE_ID',
      });
    }
  }
  DT_COURSE_STUDENT.init({
    COURSE_ID:  {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    STUDENT_ID: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    STATUS_ID: DataTypes.INTEGER,
    CREATED_AT: DataTypes.DATE,
    UPDATED_AT: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'DT_COURSE_STUDENT',
    freezeTableName: true,
  });
  return DT_COURSE_STUDENT;
};