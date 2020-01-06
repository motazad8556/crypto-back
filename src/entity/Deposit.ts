import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn, OneToMany, ManyToOne} from "typeorm";
import { User } from "./User";
import { TABLE_NAME } from "../enum/tableName";
import { IDeposit } from "../_client/interfaces/deposit";
import { COLUMN_NAME } from "../enum/columnNames";

@Entity({
	name: TABLE_NAME.DEPOSIT
})
export class Deposit {

    @PrimaryGeneratedColumn({
		name:COLUMN_NAME.DEPOSIT.id
	})
	id: number;
	
	@CreateDateColumn({
		name:COLUMN_NAME.DEPOSIT.createdAt
	})
	createdAt: Date;

	@UpdateDateColumn({
		name:COLUMN_NAME.DEPOSIT.updatedAt
	})
	updatedAt: Date;

	/**
	 * @description The user that has this funds account.
	 */
	@ManyToOne(type => User, user => user.funds)
	@JoinColumn({
		name:COLUMN_NAME.DEPOSIT.user
	})
	user: User;

	/**
	 * @description The bitcoin ammount for this user.
	 */
	@Column({
		type:"float",
		name:COLUMN_NAME.DEPOSIT.btc_ammount
	})
	btc_ammount: number;

	/**
	 * @description The bitcoin ammount for this user.
	 */
	@Column({
		name:COLUMN_NAME.DEPOSIT.btc_address
	})
	btc_adddress: string;
	
	toJson():IDeposit{
		return {
			id: this.id,
			createdAt: this.createdAt,
			updatedAt: this.updatedAt,
			user: this.user ? this.user.id : null,
			btc_ammount: this.btc_ammount,
			btc_adddress: this.btc_adddress
		}
	}
}
