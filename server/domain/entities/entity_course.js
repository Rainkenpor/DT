'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DT_COURSE extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      DT_COURSE.belongsTo(models.DT_STATUS, {
        foreignKey: 'STATUS_ID',
        sourceKey: 'STATUS_ID',
      });
      DT_COURSE.hasMany(models.DT_COURSE_STUDENT, {
        foreignKey: 'COURSE_ID',
        sourceKey: 'COURSE_ID',
      });
    }
  }
  DT_COURSE.init({
    COURSE_ID:  {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    NAME: DataTypes.STRING,
    DESCRIPTION: DataTypes.STRING,
    MAX_STUDENTS: DataTypes.INTEGER,
    STATUS_ID: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    },
    CREATED_AT: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    UPDATED_AT: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    sequelize,
    modelName: 'DT_COURSE',
    freezeTableName: true,
  });
  return DT_COURSE;
};