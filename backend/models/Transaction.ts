import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db";
import { Subscription } from "./Subscription";

class Transaction extends Model {
  public id!: number;
  public subscription_id!: number;
  public stripe_invoice_id!: string | null;
  public stripe_payment_intent_id!: string | null;
  public amount!: number;
  public currency!: string;
  public status!: string;
}

Transaction.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    subscription_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    stripe_invoice_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    stripe_payment_intent_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    currency: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "transactions",
    modelName: "Transaction",
    timestamps: false,
  }
);

// Relations
Transaction.belongsTo(Subscription, { foreignKey: "subscription_id" });
Subscription.hasMany(Transaction, { foreignKey: "subscription_id" });

export default Transaction;
