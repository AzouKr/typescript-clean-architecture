import UserModel from "../models/user.model";
import { UserRepository } from "./user.repository";
import { User, ICreateUserRequestDTO } from "../domain/User";

class MongooseUserRepository implements UserRepository {
  async add(userDTO: ICreateUserRequestDTO): Promise<void> {
    const user = new UserModel({
      name: userDTO.name,
      email: userDTO.email,
      password: userDTO.password,
    });

    await user.save();
  }

  async findById(id: string): Promise<User | null> {
    const userDoc = await UserModel.findById(id).exec();
    if (!userDoc) return null;

    return new User(
      userDoc.id,
      userDoc.name,
      userDoc.email,
      userDoc.password,
      userDoc.createdAt,
      userDoc.updatedAt
    );
  }

  async findByEmail(email: string): Promise<User | null> {
    const userDoc = await UserModel.findOne({ email }).exec();
    if (!userDoc) return null;

    return new User(
      userDoc.id,
      userDoc.name,
      userDoc.email,
      userDoc.password,
      userDoc.createdAt,
      userDoc.updatedAt
    );
  }

  async findAll(): Promise<User[]> {
    const userDocs = await UserModel.find().exec();
    return userDocs.map(
      (userDoc) =>
        new User(
          userDoc.id,
          userDoc.name,
          userDoc.email,
          userDoc.password,
          userDoc.createdAt,
          userDoc.updatedAt
        )
    );
  }

  async update(userDTO: ICreateUserRequestDTO): Promise<void> {
    const userDoc = await UserModel.findOne({ email: userDTO.email }).exec();
    if (userDoc) {
      userDoc.name = userDTO.name;
      if (userDTO.password) {
        userDoc.password = await User.hashPassword(userDTO.password);
      }
      await userDoc.save();
    }
  }

  async delete(id: string): Promise<void> {
    await UserModel.findByIdAndDelete(id).exec();
  }
}

export default MongooseUserRepository;
