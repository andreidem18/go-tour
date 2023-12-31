'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      booking.belongsTo(models.user, {
        foreignKey: { allowNull: false }
      })
      booking.belongsTo(models.tour, {
        foreignKey: { allowNull: false }
      })
    }
  }
  booking.init({
    date: DataTypes.DATEONLY,
    peopleNumber: DataTypes.NUMBER,
  }, {
    sequelize,
    modelName: 'booking',
  });
  return booking;
};