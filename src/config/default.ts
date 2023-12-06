export default {
    port: 3000,
    dbUri: "mongodb://localhost:27017/backend_test",
    saltWorkFactor: 10,
    accessTokenTtl: "60m",
    refreshTokenTtl: "1y",
    secret: "kerimazou",
    NODE_ENV: "Production"
  };