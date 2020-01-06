import {Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryColumn, ManyToOne, JoinColumn, OneToOne} from "typeorm";
import { User } from "./User";
import { ORDER_TYPE, ORDER_SIDE, OPEN_ORDER_STATUS } from "../_client/enums/order";
import { Price } from "./Price";
import { IOpenOrder } from "../_client/interfaces/openOrder";
import { PAIR } from "../_client/enums/symbols";
import { COLUMN_NAME } from "../enum/columnNames";
import { OpenPosition } from "./OpenPosition";
import { TABLE_NAME } from "../enum/tableName";

@Entity({
	name: TABLE_NAME.OPEN_ORDER
})
export class OpenOrder {
	@PrimaryColumn({
		name: COLUMN_NAME.OPEN_ORDER.id
	})
	id:string;
	@UpdateDateColumn({
		name: COLUMN_NAME.OPEN_ORDER.updatedAt
	})
	updatedAt: Date;
	@CreateDateColumn({
		name: COLUMN_NAME.OPEN_ORDER.created_at
	})
	createdAt: Date;

	/**
	 * @description The status of the order, ACTIVE, COMPLETED or CANCELED.
	 */
	@Column({
		name: COLUMN_NAME.OPEN_ORDER.status,
		default: OPEN_ORDER_STATUS.ACTIVE
	})
	status: OPEN_ORDER_STATUS;

	/**
	 * @description The user that's bound to the order (who have emitted it)
	 */
	@ManyToOne(type => User, user => user.openOrders,{
		nullable: true
	})
	@JoinColumn({
		name: COLUMN_NAME.OPEN_ORDER.user
	})
	user: User;

	/**
	 * @description The open position related to this order (in case it's become an open position)
	 */
	@OneToOne(type => OpenPosition, position => position.order)
	openPosition: OpenPosition;

	/**
	 * @description The price copy related to this record.
	 */
	@OneToOne(type => Price, price => price.openOrder, {
		nullable: true
		,cascade:true
	})
	@JoinColumn({
		name: COLUMN_NAME.OPEN_ORDER.price_copy
	})
	price_copy: Price;
	
	/**
	 * @description When was the order emitted / calculated.
	 */
	@Column({
		name: COLUMN_NAME.OPEN_ORDER.dateTime
	})
	dateTime: Date;

	/**
	 * @description The order type that  this Open Order, wether it's limit or market order.
	 */
	@Column({
		name: COLUMN_NAME.OPEN_ORDER.order_type
	})
	order_type: ORDER_TYPE;

	/**
	 * @description The order pair that belongs to this order (ex. BTC/USD)
	 */
	@Column({
		name: COLUMN_NAME.OPEN_ORDER.pair
	})
	pair: PAIR;

	/**
	 * @description The size of the order, in dollars, for this order.
	 */
	@Column({
		name: COLUMN_NAME.OPEN_ORDER.size
	})
	size: number;

	/**
	 * @description The leverage for this order.
	 */
	@Column({
		name: COLUMN_NAME.OPEN_ORDER.leverage
	})
	leverage: number;

	/**
	 * @description The BTC that's left on the user's account
	 */
	@Column({
		type: "float",
		name: COLUMN_NAME.OPEN_ORDER.margin
	})
	margin: number;

	/**
	 * @description The side of the order (short = SELL, long = BUY)
	 */
	@Column({
		name: COLUMN_NAME.OPEN_ORDER.side
	})
	side: ORDER_SIDE;

	/**
	 * @description It's a trigger ammount for open orders.
	 * If the backend sees that the btc price equals to or is below the 
	 * entry_price, it should then take this row from open_orders table (sql) 
	 * and place it to open_positions table, modifying the 
	 * entry_price to that of current btc price.
	 */
	@Column({
		type:"float",
		name: COLUMN_NAME.OPEN_ORDER.entry_price
	})
	entry_price: number;

	/**
	 * @description 
	 */
	@Column({
		type:"float",
		name: COLUMN_NAME.OPEN_ORDER.limit_price
	})
	limit_price: number;

	/**
	 * @description A trigger mechanism for the Open Position orders.
	 * 	Back-end script must check if there are any existing open positions. If there are, it
		should check if the exit price is less (if buy) or more (if sell) than current price and
		1. create an entry in position_history sql and delete it from open_positions sql.
		Copy all applicable columns or make calculations as needed, i.e. for profit -
		((current price – entry price) * (size / bitcoin price)) / leverage.
		2. update the sql table funds field btc_amount with the profit of the trade.
	 */
	@Column({
		type:"float",
		name: COLUMN_NAME.OPEN_ORDER.exit_price
	})
	exit_price: number;

	/**
	 * @description It's a loss-prevention trigger.
	 * Stop_price is set by the user manually as loss prevention mechanism.
	 * The backend should trigger the sell/buy of the position if btc price 
	 * hits stop_loss price, but only if the order is already executed, 
	 * i.e in open_positions sql, not in open_orders sql.
	 */
	@Column({
		type: "float",
		name: COLUMN_NAME.OPEN_ORDER.stop_price
	})
	stop_price: number;

	/**
	 * @description Gets a 10-letters (+ digits) ID for this order
	 */
	getNewId(){
		let newID = "";
		while(newID.length<10){
			newID+=(Math.random()*Number.MAX_SAFE_INTEGER).toString(16);
		}
		if(newID.length>10){
			newID = newID.substr(0, 10);
		}
		return newID;
	}
	
	toJson():IOpenOrder{
		return {
			id: this.id,
			createdAt: this.createdAt,
			updatedAt: this.updatedAt,
			status: this.status,
			user: this.user ? this.user.id : null,
			openPosition: this.openPosition ? this.openPosition.toJson() : null,
			dateTime: this.dateTime,
			order_type: this.order_type,
			pair: this.pair,
			size: this.size,
			leverage: this.leverage,
			margin: this.margin,
			side: this.side,
			entry_price: this.entry_price,
			limit_price: this.limit_price,
			exit_price: this.exit_price,
			stop_price: this.stop_price,
			price_copy: this.price_copy ? this.price_copy.toJson() : null
		}
	}
}
