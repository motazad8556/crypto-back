import {FindManyOptions, FindOneOptions, Repository} from "typeorm";
import DatabaseManager from "../manager/DatabaseManager";
import { Auth } from "../entity/Auth";

export class AuthController {
	private static _instance:AuthController = new AuthController();

	private constructor(){

	}

	public static get Instance(): AuthController{
		return this._instance;
	}

	private _authRepository: Repository<Auth>;
	private get authRepository(){
		this._authRepository = (this._authRepository) ? this._authRepository : <any>DatabaseManager.databaseConnection.getRepository(Auth);
		return this._authRepository;
	}

    async all(options: FindManyOptions<Auth>) {
		return await this.authRepository.find(options);
    }

    async one(options: FindOneOptions<Auth>) {
		return await this.authRepository.findOne(options);
    }

    async save(auth: Auth) {
		await this.authRepository.save(auth);
		return auth;
    }

    async create(auth: Auth) {
		auth = await this.authRepository.create(auth);
		auth = await this.authRepository.save(auth);
		return auth;
    }

    async remove(auth: Auth) {
		await this.authRepository.remove(auth);
    }

}

export default AuthController.Instance;