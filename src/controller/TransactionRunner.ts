import { EntityManager } from "typeorm";
import DatabaseManager from "../manager/DatabaseManager";

class TransactionRunner {
	private static _instance:TransactionRunner = new TransactionRunner();

	public static get Instance(){
		return this._instance;
	}

	runTransaction(callback:(entityManager: EntityManager) => Promise<unknown>){
		return DatabaseManager.databaseConnection.transaction(callback);
	}

}

export default TransactionRunner.Instance;