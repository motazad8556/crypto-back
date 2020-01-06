import {FindManyOptions, FindOneOptions, Repository} from "typeorm";
import {Worker} from "../entity/Worker";
import DatabaseManager from "../manager/DatabaseManager";

export class WorkerController {
	private static _instance:WorkerController = new WorkerController();

	private constructor(){

	}

	public static get Instance(): WorkerController{
		return this._instance;
	}

	private _workerRepository: Repository<Worker>;
	private get workerRepository(){
		this._workerRepository = (this._workerRepository) ? 
		this._workerRepository : <any>DatabaseManager.databaseConnection.getRepository(Worker);
		return this._workerRepository;
	}

    async all(options: FindManyOptions<Worker>) {
		return await this.workerRepository.find(options);
    }

    async count(options: FindManyOptions<Worker>) {
		return await this.workerRepository.count(options);
    }

    async one(options: FindOneOptions<Worker>) {
		return await this.workerRepository.findOne(options);
    }

    async save(worker: Worker) {
		await this.workerRepository.save(worker);
		return worker;
    }

    async create(worker: Worker) {
		worker = await this.workerRepository.create(worker);
		worker = await this.workerRepository.save(worker);
		return worker;
    }

    async remove(worker: Worker) {
		await this.workerRepository.remove(worker);
	}

	async purge(options: FindManyOptions<Worker>){
		options.select = ['id'];
		let found = await this.all(options);
		for(let i=0;i<found.length;i++){
			try{
				await this.workerRepository.delete(found[i].id);
			}catch(e){
				console.log(e);
			}
		}
	}

}

export default WorkerController.Instance;