import * as dotenv from 'dotenv';
import { ConnectionOptions } from 'typeorm';
import { Auth } from './entity/Auth';
import { Price } from './entity/Price';
import { User } from './entity/User';
import { Worker } from './entity/Worker';
import { OpenPosition } from './entity/OpenPosition';
import { Funds } from './entity/Funds';
import { OpenOrder } from './entity/OpenOrder';
import { PositionHistory } from './entity/PositionHistory';
import { Deposit } from './entity/Deposit';

interface DefaultConfiguration {
	EXPRESS_PORT: number,
	SOCKET_PORT: number,
	PRICE_UPDATE_TIME: number,	//Price update in millis
	WORKER_ID: string
}

export class Configuration {
	private static _instance: Configuration = new Configuration();
	private _defConfiguration: DefaultConfiguration;

	private constructor(){}

	public static get Instance(){
		return this._instance;
	}

	public get ExpressPort(): number {
		return process.env.EXPRESS_PORT ? 
		parseInt(process.env.EXPRESS_PORT) : 
		this._defConfiguration.EXPRESS_PORT;
	}

	public get SocketPort(): number {
		return process.env.SOCKET_PORT ? 
		parseInt(process.env.SOCKET_PORT) : 
		this._defConfiguration.SOCKET_PORT;
	}

	public get workerId(): string {
		return process.env.WORKER_ID ? process.env.WORKER_ID : (()=>{
			global['workerID'] = global['workerID'] ? global['workerID'] : Math.floor(Math.random()*1e10).toString(16);
			return global['workerID'];
		})()
	}

	public get PriceUpdateTime(): number {
		return process.env.PRICE_UPDATE_TIME ? 
		parseInt(process.env.PRICE_UPDATE_TIME) : 
		this._defConfiguration.PRICE_UPDATE_TIME;
	}

	async init(){
		//!!process.env.PROD ? dotenv.config() : null;
		!!process.env.PROD ? null : dotenv.config();
		this._defConfiguration = {
			EXPRESS_PORT: parseInt(process.env.EXPRESS_PORT) || 3000,
			SOCKET_PORT: parseInt(process.env.SOCKET_PORT),
			PRICE_UPDATE_TIME: parseInt(process.env.PRICE_UPDATE_TIME),
			WORKER_ID: process.env.WORKER_ID
		};
	}

	public get isProduction(){
		return process.env.PROD && process.env.PROD.toLowerCase() === "true";
	}

	public get databaseConfig():ConnectionOptions{
		let entities = [
			Auth, Price, User, Worker, OpenPosition, Funds, OpenOrder, PositionHistory, Deposit
		];
		let config = this.isProduction ? {
			"name": "production",
			"type": (<any>process.env.DATABASE_TYPE),
			"host": (<any>process.env.DATABASE_HOST),
			"port": parseInt((<any>process.env.DATABASE_PORT)),
			"username": (<any>process.env.DATABASE_USERNAME),
			"password": (<any>process.env.DATABASE_PASSWORD),
			"database": (<any>process.env.DATABASE_NAME),
			"synchronize": true,
			"dropSchema": true,
			"entities": entities,
			"logging": true,
			"migrations": [
				"src/migration/**/*.js"
			],
			"subscribers": [
				"src/subscriber/**/*.js"
			],
			"cli": {
				"entitiesDir": "src/entity",
				"migrationsDir": "src/migration",
				"subscribersDir": "src/subscriber"
			}
		} : 
		 {
			"name":"test",
			"type": "sqlite",
			"database": "database.sqlite",
			"dropSchema":	true,
			"synchronize": 	true,
			"logging": 		false,			//LOGGING ACTIVATED OR NOT
			"entities": entities,
			"migrations": [
				"src/migration/**/*.ts"
			],
			"subscribers": [
				"src/subscriber/**/*.ts"
			],
			"cli": {
				"entitiesDir": "src/entity",
				"migrationsDir": "src/migration",
				"subscribersDir": "src/subscriber"
			}
		};
		console.log(`Config loaded: `,config.name);
		return <any>config;
	}
}

export default Configuration.Instance;