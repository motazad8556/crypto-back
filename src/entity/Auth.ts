import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn} from "typeorm";
import { TABLE_NAME } from "../enum/tableName";

@Entity({
	name: TABLE_NAME.AUTH
})
export class Auth {

    @PrimaryGeneratedColumn()
	id: number;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;

	/**
	 * @description The hash that identifies this password.
	 */
    @Column()
    hash: string;

	/**
	 * @description The salt that makes this password unique.
	 */
    @Column()
	salt: string;
	
	toJson(){
		return {
			id: this.id,
			createdAt: this.createdAt,
			updatedAt: this.updatedAt,
			hash: this.hash,
			salt: this.salt
		}
	}
}
