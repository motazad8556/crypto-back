import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn, OneToMany} from "typeorm";
import { Auth } from "./Auth";
import { IAccountMainData } from "../_client/interfaces/user";
import { OpenPosition } from "./OpenPosition";
import { Funds } from "./Funds";
import { OpenOrder } from "./OpenOrder";
import { TABLE_NAME } from "../enum/tableName";
import { COLUMN_NAME } from "../enum/columnNames";
import { PositionHistory } from "./PositionHistory";
import { Deposit } from "./Deposit";

@Entity({
	name: TABLE_NAME.USER
})
export class User {

    @PrimaryGeneratedColumn({
		name: COLUMN_NAME.USER.id
	})
	id: number;
	
	@CreateDateColumn({
		name: COLUMN_NAME.USER.createdAt
	})
	createdAt: Date;

	@UpdateDateColumn({
		name: COLUMN_NAME.USER.updatedAt
	})
	updatedAt: Date;

    @Column({
		nullable: true,
		name: COLUMN_NAME.USER.firstName
	})
    firstName: string;

    @Column({
		nullable: true,
		name: COLUMN_NAME.USER.lastName
	})
    lastName: string;

    @Column({
		nullable: false,
		name: COLUMN_NAME.USER.username
	})
	username: string;
	
    @Column({
		nullable: false,
		name: COLUMN_NAME.USER.email
	})
	email: string;
	
    @Column({
		nullable: true,
		name: COLUMN_NAME.USER.country
	})
	country?: string;
	
    @Column({
		nullable: true,
		name: COLUMN_NAME.USER.photo
	})
	photo: string;

	/**
	 * @description The funds related to this user
	 */
	@OneToOne( type => Funds, funds => funds.user, {
		cascade: true,
	})
	funds:Funds;

	/**
	 * @description The funds related to this user
	 */
	@OneToMany( type => Funds, funds => funds.user, {
		cascade: true,
	})
	deposits:Deposit[];

	/**
	 * @description The open positions this user has issued
	 */
	@OneToMany(type => OpenPosition, order => order.user, {
		cascade: true
	})
	openPositions: OpenPosition[];

	/**
	 * @description The open orders this user has issued
	 */
	@OneToMany(type => OpenOrder, order => order.user, {
		cascade: true
	})
	openOrders: OpenPosition[];

	/**
	 * @description The open orders this user has issued
	 */
	@OneToMany(type => PositionHistory, order => order.user, {
		cascade: true
	})
	PositionHistory: PositionHistory[];
	
	/**
	 * @description The authentication and access information required for this user.
	 */
	@OneToOne(type => Auth)
	@JoinColumn({
		name: COLUMN_NAME.USER.auth
	})
	auth: Auth;

	toJson():IAccountMainData{
		return {
			id: this.id,
			createdAt: this.createdAt,
			updatedAt: this.updatedAt,
			firstName: this.firstName,
			lastName: this.lastName,
			username: this.username,
			email: this.email,
			country: this.country,
			photo: this.photo,
			funds: this.funds ? this.funds.toJson() : null
		}
	}
}
