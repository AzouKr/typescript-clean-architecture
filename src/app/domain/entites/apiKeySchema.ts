import { object, string, TypeOf } from "zod";

export const apiKeySchema = object({
  body: object({
    apikey: string({
      required_error: "APIKEY is required",
    }),
    email_body: string({
      required_error: "Email Body is required",
    })
  }),
});


export type apiKeySchemaInput = TypeOf<typeof apiKeySchema>;