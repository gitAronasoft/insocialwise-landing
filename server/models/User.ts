import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db";

export class User extends Model {}

User.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    uuid: { type: DataTypes.STRING, allowNull: false },
    firstName: { type: DataTypes.STRING, allowNull: false },
    lastName: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    role: {
      type: DataTypes.ENUM("Superadmin", "Admin", "User"),
      defaultValue: "User",
    },
    status: {
      type: DataTypes.ENUM("0", "1", "2"),
      defaultValue: "0",
    },
  },
  { sequelize, tableName: "users", timestamps: true }
);
