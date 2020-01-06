import {FindManyOptions, FindOneOptions, Repository} from "typeorm";
import DatabaseManager from "../manager/DatabaseManager";
import { Funds } from "../entity/Funds";

export class FundsController {
	private static _instance:FundsController = new FundsController();

	private constructor(){

	}

	public static get Instance(): FundsController{
		return this._instance;
	}

	private _fundsRepository: Repository<Funds>;

	private get fundsRepository(){
		this._fundsRepository = (this._fundsRepository) ? this._fundsRepository : <any>DatabaseManager.databaseConnection.getRepository(Funds);
		return this._fundsRepository;
	}

    async all(options: FindManyOptions<Funds>) {
		return await this.fundsRepository.find(options);
    }

    async one(options: FindOneOptions<Funds>) {
		return await this.fundsRepository.findOne(options);
    }

    async save(funds: Funds) {
		await this.fundsRepository.save(funds);
		return funds;
	}
	
	async update(funds: Funds){
		await this.fundsRepository.save(funds);
		/*
		this.fundsRepository.manager.transaction(async transactionEntityManager => {
			await transactionEntityManager.save(funds);
		});
		*/
	}

    async create(funds: Funds) {
		funds = await this.fundsRepository.create(funds);
		funds = await this.fundsRepository.save(funds);
		return funds;
    }

    async remove(funds: Funds) {
		await this.fundsRepository.remove(funds);
    }

}

export default FundsController.Instance;