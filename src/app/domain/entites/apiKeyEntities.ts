import mongoose from "mongoose";
import { UserDocument } from "./userEntites";

export interface ApiKeyDocument extends mongoose.Document {
  user: UserDocument["_id"];
  apikey: String;
  limit: Number;
  current: Number;
  expire: Date;
  createdAt: Date;
  updatedAt: Date;
}

const apiKeySchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    apikey: { type: String },
    limit: { type: Number },
    current: { type: Number },
    expire: { type: Date },
  },
  {
    timestamps: true,
  }
);

const ApiKeyModel = mongoose.model<ApiKeyDocument>("ApiKey", apiKeySchema);

export default ApiKeyModel;
