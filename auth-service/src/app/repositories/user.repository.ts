import { ICreateUserRequestDTO, User } from "../domain/User";

export interface UserRepository {
  add(user: ICreateUserRequestDTO): Promise<void>;
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  findAll(): Promise<User[]>;
  update(user: ICreateUserRequestDTO): Promise<void>;
  delete(id: string): Promise<void>;
}
