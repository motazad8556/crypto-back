import ConnectionManager from './manager/ConnectionManager';
import Config from './_config';
import { EventEmitter } from 'events';

export class Initializer {
	private static _instance: Initializer = new Initializer();
	private constructor(){}

	private _calledInit:boolean;
	private _initialized:boolean = false;
	private _eventEmitter: EventEmitter;

	public get calledInit(){
		return this._calledInit;
	}

	public get initialized(){
		return this._initialized;
	}

	public get eventEmitter(){
		return this._eventEmitter;
	}

	public static get Instance(){
		return this._instance;
	}

	async init(){
		if(!this._calledInit){
			this._calledInit = true;
			this._eventEmitter = new EventEmitter();
			await Config.init();
			await ConnectionManager.init();
			this._initialized = true;
			this._eventEmitter.emit('completed');
		}else{
			if(!this._initialized){
				await new Promise((accept)=>{
					this._eventEmitter.on('completed', accept);
				});
			}
		}
	}
}

export default Initializer.Instance;