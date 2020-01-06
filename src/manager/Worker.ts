import WorkerController from "../controller/Worker";
import Configuration from "../_config";
import { WORKER_TASK, WORKER_STATUS } from "../enum/worker";
import { Worker } from "../entity/Worker";

export class WorkerManager {
	public static Instance:WorkerManager = new WorkerManager();

	private constructor(){}

	/**
	 * @description Sets this instance as a worker for this task.
	 */
	public async startWorker(task: number){
		let workerProfile = await this.getThisWorker();

		if(!workerProfile){
			workerProfile = new Worker();
			workerProfile.id = Configuration.workerId;
			workerProfile.lastResult = new Date();
		}
		workerProfile.task = task;
		workerProfile.status = WORKER_STATUS.WORKING;
		await WorkerController.save(workerProfile);
	}

	public async stopWorker(){
		let worker = new Worker();
		worker.id = Configuration.workerId;
		await WorkerController.remove(worker);
	}

	async getThisWorker(select?:string[]){
		let currentWorker = await WorkerController.one({
			where:{
				id: Configuration.workerId
			},
			select: select ? <any>select : ['id']
		});
		return currentWorker;
	}

	async updateWorker(){
		let worker = await this.getThisWorker();
		worker.lastResult = new Date();
		await WorkerController.save(worker);
	}
}

export default WorkerManager.Instance;