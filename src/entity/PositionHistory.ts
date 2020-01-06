import {Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryColumn, ManyToOne, JoinColumn, OneToOne} from "typeorm";
import { User } from "./User";
import { IPositionHistory } from "../_client/interfaces/positionHistory";
import { ORDER_SIDE, OPEN_POSITION_STATUS } from "../_client/enums/order";
import { Price } from "./Price";
import { COLUMN_NAME } from "../enum/columnNames";
import { TABLE_NAME } from "../enum/tableName";

@Entity({
	name: TABLE_NAME.POSITION_HISTORY
})
export class PositionHistory {

    @PrimaryColumn({
		name: COLUMN_NAME.POSITION_HISTORY.id
	})
	id: string;

	@CreateDateColumn({
		name: COLUMN_NAME.POSITION_HISTORY.createdAt
	})
	createdAt: Date;

	@Column({
		name: COLUMN_NAME.POSITION_HISTORY.status,
		default: OPEN_POSITION_STATUS.ACTIVE
	})
	status: OPEN_POSITION_STATUS;

	@UpdateDateColumn({
		name: COLUMN_NAME.POSITION_HISTORY.updatedAt
	})
	updatedAt: Date;

	/**
	 * @description When was the order emitted / calculated.
	 */
	@Column({
		name: COLUMN_NAME.POSITION_HISTORY.dateTime
	})
	dateTime: Date;

	/**
	 * @description The user that's bound to the order (who have emitted it)
	 */
	@ManyToOne(type => User, user => user.PositionHistory)
	@JoinColumn({
		name: COLUMN_NAME.POSITION_HISTORY.user
	})
	user: User;

	/**
	 * @description The order pair that belongs to this order (ex. BTC/USD)
	 */
	@Column({
		name: COLUMN_NAME.POSITION_HISTORY.pair
	})
	pair: string;

	/**
	 * @description Size of the order in format 0,0.00
	 */
	@Column({
		name: COLUMN_NAME.POSITION_HISTORY.size
	})
	size: number;

	/**
	 * @description The size of the order, in dollars, for this order. (short/long)
	 */
	@Column({
		name: COLUMN_NAME.POSITION_HISTORY.side
	})
	side: ORDER_SIDE;

	/**
	 * @description The margin for this order.
	 */
	@Column({
		type: "float",
		name: COLUMN_NAME.POSITION_HISTORY.margin
	})
	margin: number;

	/**
	 * @description It's a trigger ammount for open orders.
	 * If the backend sees that the btc price equals to or is below the 
	 * entry_price, it should then take this row from open_orders table (sql) 
	 * and place it to open_positions table, modifying the 
	 * entry_price to that of current btc price.
	 */
	@Column({
		type:"float",
		name: COLUMN_NAME.POSITION_HISTORY.entry_price
	})
	entry_price: number;

	/**
	 * @description  is calculated as follows: entry price – (entry price / leverage / 2)
	 */
	@Column({
		type:"float",
		name: COLUMN_NAME.POSITION_HISTORY.liquidation_price
	})
	liquidation_price: number;

	/**
	 * @description  is calculated as follows: entry price – (entry price / leverage / 2)
	 */
	@Column({
		type: "float",
		name: COLUMN_NAME.POSITION_HISTORY.exit_price
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
		name: COLUMN_NAME.POSITION_HISTORY.stop_price
	})
	stop_price: number;

	/**
	 * @description The leverage for this order.
	 */
	@Column({
		name: COLUMN_NAME.POSITION_HISTORY.leverage
	})
	leverage: number;

	/**
	 * @description The profit of the trade.
	 */
	@Column({
		type: "float",
		name: COLUMN_NAME.POSITION_HISTORY.profit
	})
	profit: number;

	/**
	 * @description The price copy related to this record.
	 */
	@OneToOne(type => Price, price => price, {
		cascade: true
	})
	@JoinColumn({
		name: COLUMN_NAME.POSITION_HISTORY.price_copy
	})
	price_copy:Price;

	/**
	 * @description Gets a 10-letters (+ digits) ID
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
	
	toJson():IPositionHistory{
		return {
			id: this.id,
			createdAt: this.createdAt,
			updatedAt: this.updatedAt,
			user: this.user ? this.user.id : null,
			dateTime: this.dateTime,
			pair: this.pair,
			size: this.size,
			side: this.side,
			exit_price: this.exit_price,
			entry_price: this.entry_price,
			liquidation_price: this.liquidation_price,
			stop_price: this.stop_price,
			profit: this.profit,
			leverage: this.leverage,
			margin: this.margin,
		}
	}
}
