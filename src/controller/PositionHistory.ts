import {FindManyOptions, FindOneOptions, Repository, Column} from "typeorm";
import DatabaseManager from "../manager/DatabaseManager";
import { User } from "../entity/User";
import { Price } from "../entity/Price";
import { PositionHistory } from "../entity/PositionHistory";

export class PositionHistoryController {
	private static _instance:PositionHistoryController = new PositionHistoryController();

	private constructor(){

	}

	public static get Instance(): PositionHistoryController{
		return this._instance;
	}

	private _positionHistoryRepository: Repository<PositionHistory>;
	private get openOrderRepository(){
		this._positionHistoryRepository = (this._positionHistoryRepository) ? this._positionHistoryRepository : <any>DatabaseManager.databaseConnection.getRepository(PositionHistory);
		return this._positionHistoryRepository;
	}

    async all(options: FindManyOptions<PositionHistory>) {
		return await this.openOrderRepository.find(options);
    }

    async one(options: FindOneOptions<PositionHistory>) {
		return await this.openOrderRepository.findOne(options);
    }

    async save(_positionHistory: PositionHistory) {
		await this.openOrderRepository.save(_positionHistory);
		return _positionHistory;
    }

    async remove(_positionHistory: PositionHistory) {
		await this.openOrderRepository.remove(_positionHistory);
    }

}

export default PositionHistoryController.Instance;