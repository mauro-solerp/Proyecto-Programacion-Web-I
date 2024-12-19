const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

// Definición del modelo Reservation
const Reservation = sequelize.define('Reservation', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    startHour: {
        type: DataTypes.TIME,
        allowNull: false
    },
    endHour: {
        type: DataTypes.TIME,
        allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
}, {
    timestamps: false
});

Reservation.belongsTo(User, { foreignKey: 'userId' });

module.exports = Reservation;
