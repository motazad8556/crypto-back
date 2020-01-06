import * as express from "express";
import * as bodyParser from "body-parser";
import {Request, Response} from "express";
import { Server } from "http";

class ExpressManager {
	private static _instance: ExpressManager = new ExpressManager();
	private _app:express.Application;
	private _server:Server;

	private constructor(){}

	public static get Instance():ExpressManager{
		return this._instance;
	}

	public get expressApp(){
		return this._app;
	}

	public get expressHttpServer(){
		return this._server;
	}

	public async init(){
		this._app = express();
		this._app.use(bodyParser.json());
		this._handleRoutes(this._app);
		this._server = this._app.listen(process.env.PORT || 3000);
	}

	private async _handleRoutes(_app:express.Application){
		this._app.use('/test.json', function handleTestingCallback (req: Request, res:Response, next){
			res.status(200);
			res.json({
				status:'RUNNING'
			});
		});
	}
}

export default ExpressManager.Instance;