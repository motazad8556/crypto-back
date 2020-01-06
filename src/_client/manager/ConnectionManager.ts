import * as SocketIOClient from 'socket.io-client';
import Config from '../_config';
import { ISocketRequest, ISocketResponse } from '../interfaces/requests';
import * as ws_socket from 'ws';
import { OPEN_POSITION_ROUTES } from '../enums/routes';

declare var WebSocket: any;

export class ConnectionManager {
	private static _instance: ConnectionManager = new ConnectionManager();

	//private _IOSocket: SocketIOClient.Socket;
	private _IOClientSocket: SocketIOClient.Socket;

	public get IOClientSocket(){
		return this._IOClientSocket;
	}

	private constructor(){}

	public static get Instance():ConnectionManager{
		return this._instance;
	}

	public getConnection(connectionUrl:string, options?:SocketIOClient.ConnectOpts){
		let connection =  SocketIOClient(connectionUrl, options ? options : {
			transports: ['websocket']
		});
		return connection;
	}

	public async init(){
		let connectionUrl = Config.production ? `${Config.SocketHost}` : `${Config.SocketHost}:${Config.SocketPort}`;

		this._IOClientSocket = SocketIOClient(connectionUrl, {
			transports: ['websocket']
		});
		
		setTimeout(()=>{
			console.log("Connected? ",this._IOClientSocket.connected);
		},1000);

		await new Promise((accept, reject)=>{
			this._IOClientSocket.once('connect', ()=>{
				this._IOClientSocket = this._IOClientSocket;
				accept();
			});
			this._IOClientSocket.once('connect_error', function(error:any){
				console.log(error);
				accept(false);
			});
		});
	}

	public async call(route:string, payload:any, token?:string): Promise<ISocketResponse> {
		let _request:ISocketRequest = {
			_meta:{
				_id: (Math.floor(Math.random()*1e15)).toString(16),
				_issuedAt: new Date().getTime(),
				_authToken: token ? token : null
			},
			_payload: payload
		};

		let result:any = await new Promise((accept, reject)=>{
			this._IOClientSocket.emit(route, _request);
			let requestTimeout = setTimeout(()=>{
				reject("SOCKET TIMED OUT...");
			}, Config.SocketTimeoutMillis);
			let handler = function handleResult(_payload:ISocketRequest){
				if(_payload._meta._id === _request._meta._id){
					clearTimeout(requestTimeout);
					emitter.removeEventListener(this);
					accept(_payload);
				}
			};
			let emitter = this._IOClientSocket.addEventListener(route, handler);
		});
		return result;
	}

	public listen(route: string, callback:Function, token?:string){
		this._IOClientSocket.on(route, callback);
	}

	public listenStream(route:string, callback:Function){
		const socket = WebSocket ? new WebSocket(route) : new ws_socket(route);
		socket.addEventListener('open', function (event) {});
		socket.addEventListener('message', function (event) {
			callback(event.data);
		});
		return socket;
	}

	public unlisten(route: string, callback:Function){
		this._IOClientSocket.removeListener(route, callback);
	}
}

export default ConnectionManager.Instance;