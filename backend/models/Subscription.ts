// server/models/Subscription.ts
import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../db";

interface SubscriptionAttributes {
  id: number;
  user_id: string;
  stripe_customer_id: string;
  stripe_subscription_id: string;
  price_id: string;
  status: string;
  trial_end?: Date | null;
  createdAt?: Date;
  updatedAt?: Date;
}

// Optional fields for creation
type SubscriptionCreationAttributes = Optional<
  SubscriptionAttributes,
  "id" | "trial_end" | "createdAt" | "updatedAt"
>;

export class Subscription
  extends Model<SubscriptionAttributes, SubscriptionCreationAttributes>
  implements SubscriptionAttributes
{
  public id!: number;
  public user_id!: string;
  public stripe_customer_id!: string;
  public stripe_subscription_id!: string;
  public price_id!: string;
  public status!: string;
  public trial_end!: Date | null;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Subscription.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    stripe_customer_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    stripe_subscription_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    trial_end: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "subscriptions",
    timestamps: true, // will use createdAt, updatedAt automatically
  }
);
