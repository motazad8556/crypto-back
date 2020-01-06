import {createConnection, Connection, ConnectionOptions} from "typeorm";
import Configuration from "../_config";


export class DatabaseManager {
	private static _instance:DatabaseManager = new DatabaseManager();

	public databaseConnection: Connection;

	private constructor(){}

	public static get Instance(){
		return this._instance;
	}

	async init(){
		//Initialize the database manager.
		this.databaseConnection = await createConnection(Configuration.databaseConfig);
	}
}

export default DatabaseManager.Instance;