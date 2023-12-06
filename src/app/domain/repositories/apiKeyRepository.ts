import { get } from "lodash";
import ApiKeyModel from "../entites/apiKeyEntities";
import { generateApiKey } from '../../../infrastructure/api/generateApiKey'
import { UserDocument } from "../entites/userEntites";

export class apiKeyRepository{

    async createApiKey(userId: UserDocument["_id"]) {
        try {
          // Generating an API KEY
          const generated_apiKey = await generateApiKey(); // await here to get the actual key value
      
          const currentDate = new Date();
          const futureDate = new Date(currentDate);
          futureDate.setDate(currentDate.getDate() + 30);
      
          // Create the API KEY model
          const apikey = {
            user: userId,
            apikey: generated_apiKey,
            limit: 50,
            current: 0,
            expire: futureDate
          }
      
          // Save the created model
          const created_apikey = await ApiKeyModel.create(apikey);
      
          return created_apikey.toJSON();
        } catch (e: any) {
          throw new Error(e);
        }
      }
      
}