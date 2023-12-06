
import { UserInput, UserDocument } from "../../domain/entites/userEntites";
import { UserRepository } from '../../domain/repositories/userRepository';
export class UserService {
    constructor(private userRepository: UserRepository) { }

    async signUpUser(input: UserInput): Promise<UserDocument> {
        const existingUser = await this.userRepository.findByEmail(input.email);
        if (existingUser) {
            throw new Error('User with this email already exists');
        }

        const newuser = await this.userRepository.create(input);
        return newuser;
    }
}