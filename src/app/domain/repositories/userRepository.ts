import { FilterQuery } from "mongoose";
import { omit } from "lodash";
import UserModel, { UserDocument, UserInput } from "../entites/userEntites";

export class UserRepository {
    
    async create(input: UserInput): Promise<UserDocument> {
        
        try {
            const user = await UserModel.create(input);
        
            return omit(user.toJSON(), "password");
          } catch (e: any) {
            throw new Error(e);
          }
        
    }

    async validatePassword({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) {
      const user = await UserModel.findOne({ email });
    
      if (!user) {
        return false;
      }
    
      const isValid = await user.comparePassword(password);
    
      if (!isValid) return false;
    
      return omit(user.toJSON(), "password");
    }

    async findUser(query: FilterQuery<UserDocument>) {
      return UserModel.findOne(query).lean();
    }

    async findByEmail(email: string): Promise<UserDocument> {
        return UserModel.find({email: email}).lean();
    }

}