const jwt = require('jsonwebtoken');
import { verifyJwt } from "../jwt/jwt.utils";
import config from "config";
import { createRedisClient } from "../utils/createRedisClient";

async function verifyToken(req: any,res: any,next: any){
    const redisClient =  await createRedisClient();
    const token = await redisClient.get('accessToken');
    await redisClient.disconnect();
    if(!token) return res.status(401).send('Access Denied');
    try{
        const user = verifyJwt(token, config.get<string>("secret"));
        res.locals.user = user.decoded;
        next();
    }catch(err){
        res.status(400).send('Invalid Token');
    }
}

export default verifyToken;
