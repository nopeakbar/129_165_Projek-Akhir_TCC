// src/models/Exchange.js
import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Exchange = sequelize.define("Exchange", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  requesterId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: "requesterId"
  },
  ownerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: "ownerId"
  },
  offeredBookId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: "offeredBookId"
  },
  requestedBookId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: "requestedBookId"
  },
  messages: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  location: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  meetingDatetime: {
    type: DataTypes.DATE,
    allowNull: true,
    field: "meetingDatetime"
  },
  status: {
    type: DataTypes.ENUM('pending', 'accepted', 'declined', 'cancelled', 'completed'),
    allowNull: false,
    defaultValue: 'pending'
  }
}, {
  tableName: "exchanges",
  timestamps: true
});

export default Exchange;