import * as express from "express";
import { Request, Response, Application } from "express";
import * as bodyParser from "body-parser";
import { Routes } from "./routes/routes";
import * as mongoose from "mongoose";
class App {

    public app: Application;
    public routes: Routes = new Routes();
    public mongoUrl: string = 'mongodb://192.168.99.100/deliktum'; 

    constructor() {
        this.app = express();
        this.config();
        this.mongoSetup();
        this.routes.routes(this.app);        
    }

    private config(): void {
        // support application/json type post data
        this.app.use(bodyParser.json());
        //support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: false }));

        this.app.use((req: Request, res: Response, next: any) => {
            res.setHeader("Access-Control-Allow-Origin", "http://localhost:4200");
            res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
            res.setHeader("Access-Control-Allow-Headers", "X-CSRF-Token,X-Requested-With,content-type,authorization");
            next();
        });
    }

    private mongoSetup(): void{
        mongoose.Promise = global.Promise;
        mongoose.connect(this.mongoUrl, { useNewUrlParser: true });
    }

}

export default new App().app;