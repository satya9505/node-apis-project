import * as express from 'express';
import * as bodyParser from 'body-parser';
import { Routes } from './routes/crmRoutes';
import * as mongoose from 'mongoose';

class App {
    public app: express.Application = express();
    public routePrv: Routes = new Routes();
    public mongoUrl: string = 'mongodb://127.0.0.1:27017/CRMdb';

    constructor() {
        this.config();
        this.mongoSetup();
        this.routePrv.routes(this.app);     
    }

    private config(): void {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        // serving static files 
        this.app.use(express.static('public'));
    }

    private mongoSetup(): void {
        mongoose.connect(this.mongoUrl)
            .then(() => {
                console.log('Connected to MongoDB');
            })
            .catch((error) => {
                console.error('Error connecting to MongoDB:', error);
            });

        const db = mongoose.connection;

        db.on('connected', () => {
            console.log('Mongoose connected to ' + this.mongoUrl);
        });

        db.on('error', (err) => {
            console.error('Mongoose connection error: ' + err);
        });

        db.on('disconnected', () => {
            console.log('Mongoose disconnected');
        });

        process.on('SIGINT', () => {
            db.close().then(() => {
                console.log('Mongoose disconnected through app termination');
                process.exit(0);
            }).catch((error) => {
                console.error('Error during Mongoose disconnection:', error);
                process.exit(1);
            });
        });
    }
}

export default new App().app;
