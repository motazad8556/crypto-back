import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn, OneToMany} from "typeorm";
import { User } from "./User";
import { IFunds } from "../_client/interfaces/funds";
import { TABLE_NAME } from "../enum/tableName";

@Entity({
	name: TABLE_NAME.FUNDS
})
export class Funds {

    @PrimaryGeneratedColumn()
	id: number;
	
	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;

	/**
	 * @description The user that has this funds account.
	 */
	@OneToOne(type => User, user => user.funds)
	@JoinColumn({
		name:'user_id'
	})
	user: User;

	/**
	 * @description The bitcoin ammount for this user.
	 */
	@Column({
		type: "float"
	})
	btc_ammount: number;
	
	toJson():IFunds{
		return {
			id: this.id,
			createdAt: this.createdAt,
			updatedAt: this.updatedAt,
			user: this.user ? this.user.id : null,
			btc_ammount: this.btc_ammount
		}
	}
}
