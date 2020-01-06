import {getRepository, FindManyOptions, FindOneOptions, Repository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {User} from "../entity/User";
import DatabaseManager from "../manager/DatabaseManager";

export class UserController {
	private static _instance:UserController = new UserController();

	private constructor(){

	}

	public static get Instance(): UserController{
		return this._instance;
	}

	private _userRepository: Repository<User>;
	private get userRepository(){
		this._userRepository = (this._userRepository) ? this._userRepository : <any>DatabaseManager.databaseConnection.getRepository(User);
		return this._userRepository;
	}

    async all(options: FindManyOptions<User>) {
		return await this.userRepository.find(options);
    }

    async count(options: FindManyOptions<User>) {
		return await this.userRepository.count(options);
    }

    async one(options: FindOneOptions<User>) {
		return await this.userRepository.findOne(options);
    }

    async save(user: User) {
		await this.userRepository.save(user);
		return user;
    }

    async create(user: User) {
		user = await this.userRepository.create(user);
		user = await this.userRepository.save(user);
		return user;
    }

    async remove(user: User) {
		await this.userRepository.remove(user);
    }

}

export default UserController.Instance;