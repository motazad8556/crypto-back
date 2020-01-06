import {Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryColumn, ManyToOne, JoinColumn, OneToOne} from "typeorm";
import { User } from "./User";
import { IOpenPosition } from "../_client/interfaces/openPosition";
import { ORDER_SIDE, OPEN_POSITION_STATUS } from "../_client/enums/order";
import { Price } from "./Price";
import { COLUMN_NAME } from "../enum/columnNames";
import { OpenOrder } from "./OpenOrder";
import { TABLE_NAME } from "../enum/tableName";

@Entity({
	name: TABLE_NAME.OPEN_POSITION
})
export class OpenPosition {

    @PrimaryColumn({
		name: COLUMN_NAME.OPEN_POSITION.id
	})
	id: string;

	@CreateDateColumn({
		name: COLUMN_NAME.OPEN_POSITION.createdAt
	})
	createdAt: Date;

	@Column({
		name: COLUMN_NAME.OPEN_POSITION.status,
		default: OPEN_POSITION_STATUS.ACTIVE
	})
	status: OPEN_POSITION_STATUS;

	@UpdateDateColumn({
		name: COLUMN_NAME.OPEN_POSITION.updatedAt
	})
	updatedAt: Date;

	/**
	 * @description When was the order emitted / calculated.
	 */
	@Column({
		name: COLUMN_NAME.OPEN_POSITION.dateTime
	})
	dateTime: Date;

	/**
	 * @description The user that's bound to the order (who have emitted it)
	 */
	@ManyToOne(type => User, user => user.openPositions, {
		nullable: true
	})
	@JoinColumn({
		name: COLUMN_NAME.OPEN_POSITION.user
	})
	user: User;
	
	/**
	 * @description The open position related to this order (in case it's become an open position)
	 */
	@OneToOne(type => OpenOrder, order => order.openPosition, {
		nullable: true
	})
	@JoinColumn({
		name: COLUMN_NAME.OPEN_POSITION.order
	})
	order: OpenOrder;

	/**
	 * @description The order pair that belongs to this order (ex. BTC/USD)
	 */
	@Column({
		name: COLUMN_NAME.OPEN_POSITION.pair
	})
	pair: string;

	@Column({
		name: COLUMN_NAME.OPEN_POSITION.size
	})
	size: number;

	/**
	 * @description The size of the order, in dollars, for this order.
	 */
	@Column({
		name: COLUMN_NAME.OPEN_POSITION.side
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
		type: "float",
		name: COLUMN_NAME.OPEN_POSITION.entry_price
	})
	entry_price: number;

	/**
	 * @description  is calculated as follows: entry price – (entry price / leverage / 2)
	 */
	@Column({
		type: "float",
		name: COLUMN_NAME.OPEN_POSITION.liquidation_price
	})
	liquidation_price: number;

	/**
	 * @description  is calculated as follows: entry price – (entry price / leverage / 2)
	 */
	@Column({
		type: "float",
		name: COLUMN_NAME.OPEN_POSITION.exit_price
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
		name: COLUMN_NAME.OPEN_POSITION.stop_price
	})
	stop_price: number;

	/**
	 * @description The leverage for this order.
	 */
	@Column({
		name: COLUMN_NAME.OPEN_POSITION.leverage
	})
	leverage: number;

	/**
	 * @description The margin for this order.
	 */
	@Column({
		type: "float",
		name: COLUMN_NAME.OPEN_POSITION.margin
	})
	margin: number;

	/**
	 * @description The profit of the trade.
	 */
	@Column({
		name: COLUMN_NAME.OPEN_POSITION.profit,
		default: null,
		nullable: true
	})
	profit: number;

	/**
	 * @description The price copy related to this record.
	 */
	@OneToOne(type => Price, price => price.openPosition)
	@JoinColumn({
		name: COLUMN_NAME.OPEN_POSITION.price_copy
	})
	price_copy:Price;

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
	
	toJson():IOpenPosition{
		return {
			id: this.id,
			margin: this.margin,
			createdAt: this.createdAt,
			updatedAt: this.updatedAt,
			user: this.user ? this.user.id : null,
			order: this.order ? this.order.id : null,
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
			price_copy: this.price_copy ? this.price_copy.toJson() : null,
		}
	}
}
