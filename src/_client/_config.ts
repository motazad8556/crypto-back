import { environment } from '../environments/environment';

interface DefaultConfiguration {
	EXPRESS_HOST: string,
	EXPRESS_PORT: number,
	SOCKET_HOST: string,
	SOCKET_PORT: number,
	SOCKET_TIMEOUT_MILLIS: number
}

class Configuration {
	
	private static _instance: Configuration = new Configuration();

	private _defConfiguration: DefaultConfiguration = {
		EXPRESS_HOST: environment.EXPRESS_HOST,
		EXPRESS_PORT: environment.EXPRESS_PORT,
		SOCKET_HOST: environment.SOCKET_HOST,
		SOCKET_PORT: environment.SOCKET_PORT,
		SOCKET_TIMEOUT_MILLIS: environment.SOCKET_TIMEOUT_MILLIS
	};

	private constructor(){}

	public static get Instance(){
		return this._instance;
	}

	public get production(){
		return environment.production;
	}

	public get ExpressPort(): number {
		return this._defConfiguration.EXPRESS_PORT;
	}

	public get ExpressHost(): string {
		return this._defConfiguration.EXPRESS_HOST;
	}

	public get SocketPort(): number {
		return this._defConfiguration.SOCKET_PORT;
	}

	public get SocketHost(): string {
		return this._defConfiguration.SOCKET_HOST;
	}

	public get SocketTimeoutMillis(): number {
		return this._defConfiguration.SOCKET_TIMEOUT_MILLIS;
	}

	async init(){
		console.log("_defConfiguration: ",this._defConfiguration);
	}
}

export default Configuration.Instance;