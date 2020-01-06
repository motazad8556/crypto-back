import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne} from "typeorm";
import { IPrice } from "../_client/interfaces/price";
import { OpenPosition } from "./OpenPosition";
import { OpenOrder } from "./OpenOrder";
import { SYMBOL } from "../_client/enums/symbols";
import { TABLE_NAME } from "../enum/tableName";
import { PositionHistory } from "./PositionHistory";

@Entity({
	name: TABLE_NAME.PRICE
})
export class Price {

	@PrimaryGeneratedColumn()
	id: number;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;

	/**
	 * @description This symbol that recognizes this price (XBTUSD, for example)
	 */
    @Column()
    symbol: SYMBOL;

	/**
	 * @description TimeStamp for the edited price.
	 */
    @Column()
	timestamp: Date;

	/**
	 * @description Price, in dollars, for one of the current units of crypto.
	 */
    @Column({
		type:"float"
	})
	price: number;

	/**
	 * @description Whether or not this is a trade copy (A backup fo the current price to be used for orders and positions)
	 */
    @Column()
	_tradeCopy: boolean;

	/**
	 * @description The open positions related to this price. If none, it's null.
	 */
	@OneToOne(type => OpenPosition, position => position.price_copy, {
		nullable: true
	})
	openPosition:OpenPosition;

	/**
	 * @description The open orders related to this price. If none, it's null.
	 */
	@OneToOne(type => OpenOrder, position => position.price_copy, {
		nullable: true
	})
	openOrder:OpenPosition;

	/**
	 * @description The open orders related to this price. If none, it's null.
	 */
	@OneToOne(type => OpenOrder, position => position.price_copy, {
		nullable: true
	})
	positionHistory:PositionHistory;
	
	fromJson(data: IPrice){
		let _price = new Price();
		_price.id =  data.id;
		_price.createdAt =  data.createdAt;
		_price.updatedAt =  data.updatedAt;
		_price.symbol =  <any>data.symbol;
		_price.timestamp =  data.timestamp;
		_price.price =  data.price;
		_price._tradeCopy = data._tradeCopy;
		return _price;
	}
	
	toJson():IPrice{
		return {
			id: this.id,
			createdAt: this.createdAt,
			updatedAt: this.updatedAt,
			symbol: this.symbol,
			timestamp: this.timestamp,
			price: this.price,
			_tradeCopy: this._tradeCopy
		}
	}

	getNewId(){
		let newID = "";
		while(newID.length<10){
			newID+=Math.floor((Math.random()*Number.MAX_SAFE_INTEGER));
		}
		if(newID.length>10){
			newID = newID.substr(0, 9);
		}
		return parseInt(newID);
	}
}
