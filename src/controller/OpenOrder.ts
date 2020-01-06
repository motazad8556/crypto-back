import {FindManyOptions, FindOneOptions, Repository, Column} from "typeorm";
import DatabaseManager from "../manager/DatabaseManager";
import { User } from "../entity/User";
import { Price } from "../entity/Price";
import { OpenOrder } from "../entity/OpenOrder";
import { OPEN_ORDER_STATUS, ORDER_SIDE, OPEN_POSITION_STATUS } from "../_client/enums/order";
import { TABLE_NAME } from "../enum/tableName";
import { COLUMN_NAME } from "../enum/columnNames";
import { OpenPosition } from "../entity/OpenPosition";
import OpenPositionController from "./OpenPosition";
import Configuration from "../_config";
import { Funds } from "../entity/Funds";
import TransactionRunner from "./TransactionRunner";
import { OPEN_ORDER_ROUTES, POSITION_HISTORY_ROUTES, OPEN_POSITION_ROUTES, FUND_ROUTES } from "../_client/enums/routes";
import ConnectionManager from "../manager/ConnectionManager";
import { UID_REPLACEMENT } from "../_client/enums/codes";
import Utils from "../_client/utils";

export class OpenOrderController {
	private static _instance:OpenOrderController = new OpenOrderController();

	private constructor(){

	}

	public static get Instance(): OpenOrderController{
		return this._instance;
	}

	private _openOrderRepository: Repository<OpenOrder>;
	private get openOrderRepository(){
		this._openOrderRepository = (this._openOrderRepository) ? this._openOrderRepository : <any>DatabaseManager.databaseConnection.getRepository(OpenOrder);
		return this._openOrderRepository;
	}

    async all(options: FindManyOptions<OpenOrder>) {
		return await this.openOrderRepository.find(options);
    }

    async one(options: FindOneOptions<OpenOrder>) {
		return await this.openOrderRepository.findOne(options);
    }

    async save(_openOrder: OpenOrder) {
		await this.openOrderRepository.save(_openOrder);
		return _openOrder;
    }

	/**
	 * @description Creates a new order and updates the required records
	 * @param user User who's creating the order
	 * @param openOrder Open order record to be created
	 * @param price Price to be bound to the order
	 */
    async create(user: User, openOrder: OpenOrder, price:Price) {
		
		try{
			let newPrice = new Price();
			newPrice.id = price.getNewId();
			newPrice.price = price.price;
			newPrice.timestamp = price.timestamp;
			newPrice._tradeCopy = true;
			newPrice.symbol = price.symbol;

			newPrice = await DatabaseManager.databaseConnection.getRepository(Price).create(newPrice);

			openOrder.id = openOrder.getNewId();
			openOrder.user = user;
			openOrder.dateTime = new Date();
			openOrder.price_copy = newPrice;

			openOrder = await DatabaseManager.databaseConnection.getRepository(OpenOrder).save(openOrder);
			user = await DatabaseManager.databaseConnection.getRepository(User).save(user);

			ConnectionManager.emitBroadcast(OPEN_ORDER_ROUTES.LISTEN_NEW.replace(UID_REPLACEMENT, user.id+""), openOrder.toJson());
			ConnectionManager.emitBroadcast(FUND_ROUTES.LISTEN_UPDATED.replace(UID_REPLACEMENT, user.id+""), user.funds.toJson());

			return openOrder;
		}catch(e){
			console.log(`Error creating open order: `,e);
			return null;
		}
	}

	/**
	 * @description Cancels the specified order and updates the required records
	 * @param user User who's creating the order
	 * @param openOrder Open order record to be created
	 * @param price Price to be bound to the order
	 */
	async cancel(user: User, openOrder: OpenOrder){
		try{
			try{
				let removedJson = openOrder.toJson();
				let price = await DatabaseManager.databaseConnection.getRepository(Price).findOne({ where:{ openOrder: openOrder.id }, select:['id'] });
				price.openOrder = null;
				openOrder.price_copy = null;
				DatabaseManager.databaseConnection.getRepository(Price).save(price);
				await this.openOrderRepository.save(openOrder);

				await this.openOrderRepository.remove(openOrder);
				user.funds = await DatabaseManager.databaseConnection.getRepository(Funds).save(user.funds);
				ConnectionManager.emitBroadcast(FUND_ROUTES.LISTEN_UPDATED.replace(UID_REPLACEMENT, user.id+""), user.funds.toJson());
				
				ConnectionManager.emitBroadcast(OPEN_ORDER_ROUTES.LISTEN_CANCELLED.replace(UID_REPLACEMENT, user.id+""), removedJson);
				ConnectionManager.emitBroadcast(OPEN_ORDER_ROUTES.LISTEN_REMOVED.replace(UID_REPLACEMENT, user.id+""), removedJson);
				return user;
			}catch(e){
				console.log(`Error cancelling order #1: \n\n\n`,e);
				return null;
			}
		}catch(e){
			console.log("Error cancelling order #2: ",e);
			return null;
		}
	}

    async remove(_openOrder: OpenOrder) {
		await this.openOrderRepository.remove(_openOrder);
	}
	
	/**
	 * @description Upgrades an open order to an open position.
	 * @param order The order to update. Must have loaded Price and User as it's relationships.
	 * @returns
	 * 1. OpenOrder: The order that has been upgraded and (if it's set to delete) deleted.
	 * 2. OpenPosition: The new open position.
	 */
	async upgradeToOpenPosition(order: OpenOrder):Promise<{openOrder: OpenOrder, openPosition: OpenPosition}>{

		const deleteOpenOrderRecord = true;
		let newOpenPosition:OpenPosition = new OpenPosition();
		try{
			newOpenPosition.id = newOpenPosition.getNewId();
			newOpenPosition.status = OPEN_POSITION_STATUS.ACTIVE;
			newOpenPosition.pair = order.pair;
			newOpenPosition.size = order.size;
			newOpenPosition.side = order.side;
			newOpenPosition.stop_price = order.stop_price;
			newOpenPosition.exit_price = order.exit_price;
			newOpenPosition.entry_price = order.entry_price;
			newOpenPosition.leverage = order.leverage;
			newOpenPosition.dateTime = new Date();
			newOpenPosition.margin = order.margin;

			newOpenPosition.user = new User();
			newOpenPosition.user.id = order.user.id;
			newOpenPosition.liquidation_price = Utils.calculateLiquidationPrice(order.entry_price, order.leverage);

			if(!deleteOpenOrderRecord){
				newOpenPosition.order = new OpenOrder();
				newOpenPosition.order.id = order.id;
			}
			newOpenPosition.price_copy = new Price();
			newOpenPosition.price_copy.id = order.price_copy.id;
			
			await DatabaseManager.databaseConnection.getRepository(OpenPosition).save(newOpenPosition);
			ConnectionManager.emitBroadcast(OPEN_POSITION_ROUTES.LISTEN_NEW.replace(UID_REPLACEMENT, order.user.id+""), order.toJson());
			
			if(deleteOpenOrderRecord){
				await DatabaseManager.databaseConnection.getRepository(OpenOrder).delete(order.id);
				ConnectionManager.emitBroadcast(OPEN_ORDER_ROUTES.LISTEN_REMOVED.replace(UID_REPLACEMENT, order.user.id+""), order.toJson());
			}else{
				order.status = OPEN_ORDER_STATUS.COMPLETED;
				await DatabaseManager.databaseConnection.getRepository(OpenOrder).save(order);
			}
			ConnectionManager.emitBroadcast(OPEN_POSITION_ROUTES.LISTEN_NEW.replace(UID_REPLACEMENT, order.user.id.toString()), newOpenPosition.toJson());
		}catch(e){
			console.log(`Error upgradeToOpenPosition #1: `,e);
		}
		return {openOrder: order, openPosition: newOpenPosition}
	}

	/**
	 * @description Updates the orders on the system that meets certain criteria
	 * specified by the bitcoin price and the orders data to new open positions
	 * @param price The price that has just been updated (the current bitcoin price).
	 */
	async upgradeMetOpenOrders(price:Price){
		//Update the open orders
		const OOALIAS = "matching_open_order";

		let builder = this.openOrderRepository.manager.createQueryBuilder();
		let query = builder
		.select(Object.keys(COLUMN_NAME.OPEN_ORDER).map((key)=>{
			return `${OOALIAS}.${COLUMN_NAME.OPEN_ORDER[key]} as ${OOALIAS}${COLUMN_NAME.OPEN_ORDER[key]}`
		}).join(", "))
		.from(OpenOrder, OOALIAS)
		.innerJoinAndSelect(`${TABLE_NAME.USER}`, `_user`, `_user.${COLUMN_NAME.USER.id} = ${OOALIAS}.${COLUMN_NAME.OPEN_ORDER.user}`)
		.innerJoinAndSelect(`${TABLE_NAME.PRICE}`, `_price`, `_price.${COLUMN_NAME.PRICE.id} = ${OOALIAS}.${COLUMN_NAME.OPEN_ORDER.price_copy}`)
		.where(`${OOALIAS}.${COLUMN_NAME.OPEN_ORDER.status} = :_status`, {_status: OPEN_ORDER_STATUS.ACTIVE})
		.andWhere(
			` ( ${OOALIAS}.${COLUMN_NAME.OPEN_ORDER.limit_price} > :_price AND ${OOALIAS}.${COLUMN_NAME.OPEN_ORDER.side} = :_side_short)`
			+` OR `
			+` ( ${OOALIAS}.${COLUMN_NAME.OPEN_ORDER.limit_price} > :_price AND ${OOALIAS}.${COLUMN_NAME.OPEN_ORDER.side} = :_side_long)`
		, {
			_price: price.price,
			_side_short: ORDER_SIDE.SHORT,
			_side_long: ORDER_SIDE.LONG
		});

		let queryResult = await query.getRawMany()

		if(queryResult.length>0){
			let mapped:OpenOrder[] = queryResult.map((rawData)=>{

				const openOrderAlias = OOALIAS;
				const priceAlias = "_price_";
				const priceFName = "price_copy"
				const userAlias = "_user_"
				const userFName = "user";


				const openOrder = new OpenOrder();
				let dissallowedFields = {
					[priceAlias]:[`${priceAlias}_tradeCopy`],
					[userAlias]:[`${userAlias}auth`],
					[openOrderAlias]: [`${openOrderAlias}user_id`, `${openOrderAlias}price_copy_id`]
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

			for(let i=0;i<mapped.length;i++){
				let order = mapped[i];
				order.entry_price = price.price;
				try{
					console.log(`Upgrading open order...`,order);
					await this.upgradeToOpenPosition(order);
					ConnectionManager.emitBroadcast(OPEN_ORDER_ROUTES.LISTEN_UPGRADED_TO_OP.replace(UID_REPLACEMENT, order.user.id.toString()), order.toJson());
				}catch(e){
					console.log(`Error updating open order...`);
				}
			}
		}
		return;
	}

}

export default OpenOrderController.Instance;