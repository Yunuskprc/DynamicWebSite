const { DataTypes } = require('sequelize');
const sequelize = require('../data/config');

const Image = sequelize.define('Image', {
    path: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    originalname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  
  module.exports = Image;