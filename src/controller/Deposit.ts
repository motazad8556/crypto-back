import {FindManyOptions, FindOneOptions, Repository, EntityManager} from "typeorm";
import DatabaseManager from "../manager/DatabaseManager";
import { Funds } from "../entity/Funds";
import { Deposit } from "../entity/Deposit";
import { User } from "../entity/User";
import TransactionRunner from "./TransactionRunner";
import { FUND_ROUTES, DEPOSIT_ROUTES } from "../_client/enums/routes";
import { UID_REPLACEMENT } from "../_client/enums/codes";
import ConnectionManager from "../manager/ConnectionManager";
import Utils from "../_client/utils";

export class DepositController {
	private static _instance:DepositController = new DepositController();

	private constructor(){

	}

	public static get Instance(): DepositController{
		return this._instance;
	}

	private _depositRepository: Repository<Deposit>;

	private get depositRepository(){
		this._depositRepository = (this._depositRepository) ? this._depositRepository : <any>DatabaseManager.databaseConnection.getRepository(Deposit);
		return this._depositRepository;
	}

    async all(options: FindManyOptions<Deposit>) {
		return await this.depositRepository.find(options);
    }

    async one(options: FindOneOptions<Deposit>) {
		return await this.depositRepository.findOne(options);
    }

    async save(deposit: Deposit) {
		await this.depositRepository.save(deposit);
		return deposit;
	}
	
	async update(deposit: Deposit){
		await this.depositRepository.save(deposit);
	}

    async remove(deposit: Deposit) {
		await this.depositRepository.remove(deposit);
	}
	
	/**
	 * @description Adds a new deposit for the user's account and update it's funds balance
	 * @param user User record with the funds relationship loaded
	 * @param ammountBTC Ammount of BTC to add to the user's funds
	 */
	async makeDeposit(user:User, ammountBTC: number, address: string):Promise<{deposit:Deposit, newFunds:Funds}>{
		try{
			user.funds.btc_ammount = Utils.normalizeBitcoinAmmount(user.funds.btc_ammount + ammountBTC);
			let deposit = new Deposit();
			deposit.btc_ammount = ammountBTC;
			deposit.user = user;
			deposit.btc_adddress = address;
			user.funds = await DatabaseManager.databaseConnection.getRepository(Funds).save(user.funds);
			deposit = await DatabaseManager.databaseConnection.getRepository(Deposit).save(deposit);
			ConnectionManager.emitBroadcast(FUND_ROUTES.LISTEN_UPDATED.replace(UID_REPLACEMENT, user.id.toString()), user.funds.toJson());
			ConnectionManager.emitBroadcast(DEPOSIT_ROUTES.LISTEN_NEW.replace(UID_REPLACEMENT, user.id.toString()), deposit.toJson());
			return {deposit, newFunds: user.funds};
		}catch(e){
			console.log(e);
			return null;
		}
	}

}

export default DepositController.Instance;