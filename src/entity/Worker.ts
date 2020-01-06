import {Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryColumn} from "typeorm";
import { WORKER_STATUS, WORKER_TASK } from "../enum/worker";
import { TABLE_NAME } from "../enum/tableName";

@Entity({
	name: TABLE_NAME.WORKER
})
export class Worker {
	
    @PrimaryColumn()
	id: string;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;

	/**
	 * @description The task this worker is embedded in
	 */
    @Column()
    task: number;

	/**
	 * @description The current status for this worker
	 */
    @Column()
	status: number;

	/**
	 * @description Last time it calculated / issued a result
	 */
    @Column()
	lastResult: Date;
	
	toJson(){
		return {
			id: this.id,
			createdAt: this.createdAt,
			updatedAt: this.updatedAt,
			task: this.task,
			status: this.status,
			lastResult: this.lastResult
		}
	}
}
