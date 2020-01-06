import {FindManyOptions, FindOneOptions, Repository, LessThan, Raw} from "typeorm";
import DatabaseManager from "../manager/DatabaseManager";
import { Price } from "../entity/Price";
import { SYMBOL } from "../_client/enums/symbols";
import { Configuration } from "../_config";

export class LatestPriceController {
	private static _instance:LatestPriceController = new LatestPriceController();

	private constructor(){

	}

	public static get Instance(): LatestPriceController{
		return this._instance;
	}

	private _priceRepository: Repository<Price>;
	private get latestPriceRepository(){
		this._priceRepository = (this._priceRepository) ? this._priceRepository : <any>DatabaseManager.databaseConnection.getRepository(Price);
		return this._priceRepository;
	}

    async all(options: FindManyOptions<Price>) {
		return await this.latestPriceRepository.find(options);
    }

    async one(options: FindOneOptions<Price>) {
		return await this.latestPriceRepository.findOne(options);
    }

    async save(price: Price) {
		await this.latestPriceRepository.save(price);
		return price;
    }

    async create(price: Price) {
		price = await this.latestPriceRepository.create(price);
		price = await this.latestPriceRepository.save(price);
		return price;
    }

    async remove(price: Price) {
		await this.latestPriceRepository.remove(price);
	}

	getLessThanDate(alias:string, fromDate:Date){
		return Configuration.Instance.isProduction ? `${alias} < '${fromDate.toISOString()}'` : `${alias} < DATETIME("${fromDate.toISOString()}")`;
	}
	
	async getLastestPrice(fromDate: Date){
		let price = await this.one({
			where:{
				_tradeCopy: false,
				symbol: SYMBOL.XBT,
				timestamp: Raw((alias)=>this.getLessThanDate(alias, fromDate))
			},
			order:{
				timestamp: 'DESC'
			}
		});
		return price;
	}

	async removeObsoletePrices(fromDate: Date){
		let prices = await this.all({
			select:['id'],
			where:{
				_tradeCopy: false,
				symbol: SYMBOL.XBT,
				timestamp: Raw((alias)=>this.getLessThanDate(alias, fromDate))
			},
			order:{
				timestamp: 'DESC'
			}
		});
		if(prices && prices.length>0){
			const pricesObj = prices.map((el)=>el.id);
			if(pricesObj.length>0){
				await this._priceRepository.delete(pricesObj);
			}
		}
		return prices;
	}
}

export default LatestPriceController.Instance;