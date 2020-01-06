import ConnectionManager from './manager/ConnectionManager';
import ExpressManager from './manager/ExpressManager';
import Config from './_config';
import DatabaseManager from './manager/DatabaseManager';
import LatestPriceManager from './manager/LatestPrice';
import ShutdownManager from './manager/Shutdown';
import AuthManager from './manager/Auth';
import { Auth } from './entity/Auth';
import { User } from './entity/User';
import { USED_COUNTRIES } from './_client/enums/Country';
import { Funds } from './entity/Funds';
import UserController from './controller/User';
import AuthController from './controller/Auth';

class Initializer {
	private static _instance: Initializer = new Initializer();
	private constructor(){}

	public static get Instance(){
		return this._instance;
	}

	async init(){
		await Config.init();
		await ExpressManager.init();
		await ConnectionManager.init(ExpressManager.expressHttpServer);
		await DatabaseManager.init();
		await LatestPriceManager.init();
		ShutdownManager.init();
		console.log(`Config.isProduction: ${Config.isProduction}`);
		if(!Config.isProduction){
			this.createTestUser();
		}
	}

	async createTestUser(){
		let auth = new Auth();
		auth.salt =  AuthManager.genSalt();
		auth.hash = AuthManager.hashPassword("admin", auth.salt);
		auth = await AuthController.create(auth);
		
		let user = new User();
		user.auth = auth;
		user.firstName = "admin";
		user.lastName = "admin";
		user.country = USED_COUNTRIES[0].code;
		user.email = "admin@admin.com";
		user.username = "admin";
		user.photo = null;

		user.funds = new Funds();
		user.funds.btc_ammount = process.env.DEF_FUNDS ? parseInt(process.env.DEF_FUNDS) : 0;


		user = await UserController.create(user);
		user = await UserController.one({
			where:{
				id: user.id
			},
			relations:['funds']
		});
		console.log("CREATED TEST USER...",user);
	}
}

export default Initializer.Instance;