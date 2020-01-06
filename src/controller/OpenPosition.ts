import {FindManyOptions, FindOneOptions, Repository } from "typeorm";
import DatabaseManager from "../manager/DatabaseManager";
import { OpenPosition } from "../entity/OpenPosition";
import { User } from "../entity/User";
import { Price } from "../entity/Price";
import { PositionHistory } from "../entity/PositionHistory";
import { OPEN_POSITION_STATUS, ORDER_SIDE } from "../_client/enums/order";
import Configuration from "../_config";
import { COLUMN_NAME } from "../enum/columnNames";
import { TABLE_NAME } from "../enum/tableName";
import ConnectionManager from "../manager/ConnectionManager";
import { POSITION_HISTORY_ROUTES, OPEN_POSITION_ROUTES, FUND_ROUTES } from "../_client/enums/routes";
import { Funds } from "../entity/Funds";
import { UID_REPLACEMENT } from "../_client/enums/codes";
import { IOpenPosition } from "../_client/interfaces/openPosition";
import Utils from "../_client/utils";

export class OpenPositionController {
	private static _instance:OpenPositionController = new OpenPositionController();

	private constructor(){

	}

	public static get Instance(): OpenPositionController{
		return this._instance;
	}

	private _openPositionRepository: Repository<OpenPosition>;
	private get openPositionRepository(){
		this._openPositionRepository = (this._openPositionRepository) ? this._openPositionRepository : <any>DatabaseManager.databaseConnection.getRepository(OpenPosition);
		return this._openPositionRepository;
	}

    async all(options: FindManyOptions<OpenPosition>) {
		return await this.openPositionRepository.find(options);
    }

    async one(options: FindOneOptions<OpenPosition>) {
		return await this.openPositionRepository.findOne(options);
    }

    async save(_openPosition: OpenPosition) {
		await this.openPositionRepository.save(_openPosition);
		return _openPosition;
    }

	/**
	 * @description Creates a new OpenPosition.
	 * @param user User that is creating this open position
	 * @param openPosition Open position with the required data; record not yet created.
	 * @param price The current bitcoin price record
	 */
    async create(user: User, openPosition: OpenPosition, price:Price) {
		try{
			openPosition = await new Promise(async (accept)=>{
				let newPrice = new Price();
				price.id = price.getNewId();
				price._tradeCopy = true;

				openPosition.id = openPosition.getNewId();
				openPosition.price_copy = newPrice;
				openPosition.user = user;

				openPosition = await DatabaseManager.databaseConnection.getRepository(OpenPosition).save(openPosition);
				accept(openPosition);
				/*await TransactionRunner.runTransaction(async (transactionManager) => {
					await transactionManager.save(OpenPosition, openPosition);
				});*/
			});
			//ConnectionManager.emitBroadcast(OPEN_POSITION_ROUTES.LISTEN_NEW.replace(UID_REPLACEMENT, user.id.toString()), openPosition.toJson());
			return openPosition;
		}catch(e){
			console.log("Error caught: ",e);
		}
	}

	/**
	 * @description This transforms the ammount of fia proffit (BTCUSD) to bitcoin
	 * @param bitcointPrice Current bitcoin price (USDBTC)
	 * @param ammountFiat Profit to be earned
	 */
	fiatToBTC(bitcointPrice: number, ammountFiat:number){
		return Utils.normalizeBitcoinAmmount(ammountFiat / bitcointPrice);
	}

	/**
	 * @description Closes the sell of the bitcoin price, and creates a new PositionHistory record.
	 * @param user The user record that is performing the closing
	 * @param openPosition The open position to close. Should have loaded relationship price_copy.
	 * @param price The current market price record at the moment of the upgrade
	 */
	async closeToCMP(user: User, openPosition: OpenPosition, price: Price):Promise<{history:PositionHistory, position:IOpenPosition, user:User}>{
		try{
			let newPositionHistory:PositionHistory = new PositionHistory();
			newPositionHistory.id = newPositionHistory.getNewId();
			newPositionHistory.status = OPEN_POSITION_STATUS.ACTIVE;
			newPositionHistory.pair = openPosition.pair;
			newPositionHistory.size = openPosition.size;
			newPositionHistory.side = openPosition.side;
			newPositionHistory.stop_price = openPosition.stop_price;
			newPositionHistory.exit_price = openPosition.exit_price;
			newPositionHistory.entry_price = openPosition.entry_price;
			newPositionHistory.leverage = openPosition.leverage;
			newPositionHistory.margin = openPosition.margin;
			newPositionHistory.dateTime = new Date();
			if(!openPosition.price_copy){
				openPosition.price_copy = await DatabaseManager.databaseConnection.getRepository(Price).findOne({
					where:{
						openPosition: openPosition.id
					},
					select:['price']
				});
			}
			if(!user.funds){
				user.funds = await DatabaseManager.databaseConnection.getRepository(Funds).findOne({
					where:{
						user: user
					},select:['btc_ammount']
				});
			}
			//let tradeProfit = Utils.getProfit(price.price, openPosition.entry_price, openPosition.size, openPosition.price_copy.price, openPosition.leverage);
			let tradeProfit = Utils.getProfit(price.price, openPosition.entry_price, openPosition.size, price.price, openPosition.leverage, openPosition.side);
			console.log(`tradeProfit: `,tradeProfit);
			newPositionHistory.profit = tradeProfit;

			user.funds.btc_ammount =  Utils.normalizeBitcoinAmmount(user.funds.btc_ammount + newPositionHistory.profit);

			newPositionHistory.user = new User();
			newPositionHistory.user.id = user.id;
			newPositionHistory.liquidation_price = openPosition.liquidation_price;

			newPositionHistory.price_copy = openPosition.price_copy;

			newPositionHistory = await DatabaseManager.databaseConnection.getRepository(PositionHistory).save(newPositionHistory);
			user.funds = await DatabaseManager.databaseConnection.getRepository(Funds).save(user.funds);
			ConnectionManager.emitBroadcast(FUND_ROUTES.LISTEN_UPDATED.replace(UID_REPLACEMENT, user.id.toString()), user.funds.toJson());
			let oldOpenPosition = openPosition.toJson();
			await DatabaseManager.databaseConnection.getRepository(OpenPosition).delete(openPosition.id);
		
			//console.log(`Sending broadcast to: ${OPEN_POSITION_ROUTES.LISTEN_CLOSED_AMP.replace(UID_REPLACEMENT, user.id.toString())}`);
			ConnectionManager.emitBroadcast(OPEN_POSITION_ROUTES.LISTEN_CLOSED_AMP.replace(UID_REPLACEMENT, user.id.toString()), oldOpenPosition);
			//console.log(`Sending broadcast to: ${OPEN_POSITION_ROUTES.LISTEN_REMOVED.replace(UID_REPLACEMENT, user.id.toString())}`);
			ConnectionManager.emitBroadcast(OPEN_POSITION_ROUTES.LISTEN_REMOVED.replace(UID_REPLACEMENT, user.id.toString()), oldOpenPosition);
			//console.log(`Sending broadcast to: ${POSITION_HISTORY_ROUTES.LISTEN_NEW.replace(UID_REPLACEMENT, user.id.toString())}`);
			ConnectionManager.emitBroadcast(POSITION_HISTORY_ROUTES.LISTEN_NEW.replace(UID_REPLACEMENT, user.id.toString()), newPositionHistory.toJson());
			return {history: newPositionHistory, position: oldOpenPosition, user:user};
		}catch(e){
			console.log(e);
			return null;
		}
	}



	/**
	 * @description Updates the orders on the system that meets certain criteria
	 * specified by the bitcoin price and the orders data, by closing them.
	 * @param price The price that has just been updated (the current bitcoin price).
	 */
	public async closeMetOpenPositions(price:Price){
		//Update the open orders
		const OOALIAS = "matching_open_position";
		let builder = this.openPositionRepository.manager.createQueryBuilder();
		const selectedColumns = Object.keys(COLUMN_NAME.OPEN_POSITION).map((key)=>{
			return `${OOALIAS}.${COLUMN_NAME.OPEN_POSITION[key]} as ${OOALIAS}${COLUMN_NAME.OPEN_POSITION[key]}`
		}).join(", ");
		let query = builder
		.select(selectedColumns)
		.from(OpenPosition, OOALIAS)
		.innerJoinAndSelect(`${TABLE_NAME.USER}`, `_user`, `_user.${COLUMN_NAME.USER.id} = ${OOALIAS}.${COLUMN_NAME.OPEN_POSITION.user}`)
		.innerJoinAndSelect(`${TABLE_NAME.PRICE}`, `_price`, `_price.${COLUMN_NAME.PRICE.id} = ${OOALIAS}.${COLUMN_NAME.OPEN_POSITION.price_copy}`)
		.where(`${OOALIAS}.${COLUMN_NAME.OPEN_POSITION.status} = :_status`, {_status: OPEN_POSITION_STATUS.ACTIVE})
		.andWhere(
			`( `
				+`( ${OOALIAS}.${COLUMN_NAME.OPEN_POSITION.exit_price} < :_price AND ${OOALIAS}.${COLUMN_NAME.OPEN_POSITION.side} = :_side_short)`
				+` OR `
				+`( ${OOALIAS}.${COLUMN_NAME.OPEN_POSITION.exit_price} > :_price AND ${OOALIAS}.${COLUMN_NAME.OPEN_POSITION.side} = :_side_long)`
			+` )`
		, {
			_price: price.price,
			_side_short: ORDER_SIDE.SHORT,
			_side_long: ORDER_SIDE.LONG
		});

		let queryResult = await query.getRawMany()

		if(queryResult.length>0){
			let mapped:OpenPosition[] = queryResult.map((rawData)=>{

				const openOrderAlias = OOALIAS;
				const priceAlias = "_price_";
				const priceFName = "price_copy"
				const userAlias = "_user_"
				const userFName = "user";


				const openOrder = new OpenPosition();
				let dissallowedFields = {
					[priceAlias]:[`${priceAlias}_tradeCopy`],
					[userAlias]:[`${userAlias}auth`],
					[openOrderAlias]: [`${openOrderAlias}user_id`, `${openOrderAlias}price_copy`]
				}

				Object.keys(rawData).forEach((key)=>{
					if((key.indexOf(openOrderAlias) == 0) && (dissallowedFields[openOrderAlias].indexOf(key)<0)){
						openOrder[key.replace(openOrderAlias, '')] = rawData[key];

					}else if((key.indexOf(priceAlias) == 0) && (dissallowedFields[priceAlias].indexOf(key)<0)){
						openOrder[priceFName] = openOrder[priceFName] ? openOrder[priceFName] : new Price();
						openOrder[priceFName][key.replace(priceAlias, '')] = rawData[key];

					}else if((key.indexOf(userAlias) == 0) && (dissallowedFields[userAlias].indexOf(key)<0)){
						openOrder[userFName] = openOrder[userFName] ? openOrder[userFName] : new User();
						openOrder[userFName][key.replace(userAlias, '')] = rawData[key];
					}

				})
				return openOrder;
			});
			console.log(`Ammount of mapped open positions to update to open history: `,mapped.length);

			//return;
			///*
			for(let i=0;i<mapped.length;i++){
				let openPosition = mapped[i];
				try{
					await this.closeToCMP(openPosition.user, openPosition, price);
				}catch(e){
					console.log(`

					#12# ERROR CLOSING AT MARKET PRICE: \n
					
					`,e);
				}
				
			}
			//*/
		}
		return;
	}

    async remove(_openPosition: OpenPosition) {
		await this.openPositionRepository.remove(_openPosition);
    }

}

export default OpenPositionController.Instance;