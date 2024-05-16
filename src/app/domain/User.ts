import bcrypt from "bcrypt";
import * as dotenv from "dotenv";
import logger from "../../infrastructure/logger/winston";
dotenv.config();

export enum UserErrorType {
  UserAlreadyExists = "User already exists!",
  LoginError = "Password or Email is incorrect",
}

export interface ICreateUserRequestDTO {
  name: string;
  email: string;
  password: string;
}

export interface ILoginUserRequestDTO {
  email: string;
  password: string;
}

export class User {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(
    id: string,
    name: string,
    email: string,
    password: string,
    createdAt: Date,
    updatedAt: Date
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static async hashPassword(password: string): Promise<string> {
    const saltWorkFactor = parseInt(process.env.saltWorkFactor || "10", 10);

    if (isNaN(saltWorkFactor)) {
      logger.error("Invalid salt work factor");
      throw new Error("Invalid salt work factor");
    }

    const salt = await bcrypt.genSalt(saltWorkFactor);
    return bcrypt.hash(password, salt);
  }

  async comparePassword(candidatePassword: string): Promise<boolean> {
    return bcrypt.compare(candidatePassword, this.password);
  }
}
