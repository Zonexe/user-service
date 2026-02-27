import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";

export interface UserAttributes {
  id: number;
  firstName: string;
  lastName: string;
  middleName?: string;
  birthDate: Date;
  email: string;
  password: string;
  role: "admin" | "user";
  isActive: boolean;
}

export interface UserCreationAttributes extends Optional<
  UserAttributes,
  "id" | "role" | "isActive" | "middleName"
> {}

export interface UserCreationAttributes extends Optional<
  UserAttributes,
  "id" | "role" | "isActive"
> {} 

class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public id!: number;
  public firstName!: string;
  public lastName!: string;
  public middleName!: string;
  public birthDate!: Date;
  public email!: string;
  public password!: string;
  public role!: "admin" | "user";
  public isActive!: boolean;

  public get fullName(): string {
    return `${this.lastName} ${this.firstName} ${this.middleName || ""}`.trim();
  }

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    middleName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    birthDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { isEmail: true },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("admin", "user"),
      allowNull: false,
      defaultValue: "user",
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    sequelize,
    tableName: "users",
    timestamps: true,
  },
);

export default User;
