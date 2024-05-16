import { UserRepository } from "../repositories/user.repository";
import {
  User,
  ICreateUserRequestDTO,
  UserErrorType,
  ILoginUserRequestDTO,
} from "../domain/User";

function generateId(): string {
  const timestamp = Date.now().toString(36);
  const randomNum = Math.random().toString(36).substring(2, 10);
  return timestamp + randomNum;
}

class UserService {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async registerUser(userDTO: ICreateUserRequestDTO): Promise<User> {
    const existingUser = await this.userRepository.findByEmail(userDTO.email);
    if (existingUser) {
      throw new Error(UserErrorType.UserAlreadyExists);
    }
    await this.userRepository.add(userDTO);
    return new User(
      generateId(),
      userDTO.name,
      userDTO.email,
      await User.hashPassword(userDTO.password),
      new Date(),
      new Date()
    );
  }

  async loginUser(loginDTO: ILoginUserRequestDTO): Promise<string> {
    const existingUser = await this.userRepository.findByEmail(loginDTO.email);
    if (!existingUser) {
      throw new Error(UserErrorType.LoginError);
    }
    const passwordValid = await existingUser.comparePassword(loginDTO.password);
    if (!passwordValid) {
      throw new Error(UserErrorType.LoginError);
    }
    return loginDTO.email;
  }

  async getUserById(id: string): Promise<User | null> {
    return this.userRepository.findById(id);
  }

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  async updateUser(userDTO: ICreateUserRequestDTO): Promise<void> {
    await this.userRepository.update(userDTO);
  }

  async deleteUser(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }
}

export default UserService;
