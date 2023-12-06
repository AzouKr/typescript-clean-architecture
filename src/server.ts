import express from "express";
import bodyParser from "body-parser";
import authRouter from './app/interface/routes/authRouts'
import {connect} from "./infrastructure/database/index";
import dotenv from "dotenv";
import config from "config";
import logger from "./infrastructure/log/index.logger";


class App {
    private readonly app: express.Application;

    constructor() {
        this.app = express();
        this.config();
        this.registerRoutes();
    }
    private config() {
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(bodyParser.json());
        dotenv.config();

    }


    // Initialize all the routes of the application
    private registerRoutes(): void {
        const router = express.Router();       
        this.app.use('/api', authRouter)

    }

    // Server will listen to this port
    private async startServer() {
        try {
            await connect();
            this.app.listen(process.env.PORT, () => {
                const port = config.get<number>("port");
                logger.info(`App is running at http://localhost:${3000}`);
            });
        } catch (error) {
            logger.error('Server could not be started', error);
            process.exit(1);
        }

    }
}



export default App;
