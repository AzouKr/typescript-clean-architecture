const crypto = require('crypto');

export async function generateApiKey() {
    const apiKeyLength = 32; // You can adjust the length of the API key as needed
    const apiKey:String = crypto.randomBytes(apiKeyLength).toString('hex');
    return apiKey;
  }
