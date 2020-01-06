import * as SocketIO from 'socket.io';
import Config from '../_config';
import * as SocketIOClient from 'socket.io-client';
import { Server } from "http";
import { SocketRoutesManager } from "./SocketRouting";

class ConnectionManager {
	private static _instance: ConnectionManager = new ConnectionManager();
	private _socketServer: SocketIO.Server;

	private constructor(){}

	public static get Instance():ConnectionManager{
		return this._instance;
	}

	public async init(expressServer:Server){
		this._socketServer = SocketIO(expressServer);
		this._socketServer.on('connection', function(sock:SocketIO.Socket){
			SocketRoutesManager.Instance.listen(sock);
		});
	}

	async isAcceptingSocketConnections(){
		let client = SocketIOClient(`http://0.0.0.0:${Config.SocketPort}`);
		client.connect();

		let isAccepting = await new Promise((accept, reject)=>{
			client.once('connect', function(){
				client.disconnect();
				accept(true);
			});
			client.once('connect_error', function(error:any){
				console.log("error:");
				console.log(error);
				accept(false);
			});
		});
		return isAccepting;
	}

	async emitBroadcast(route:string, payload:any){
		this._socketServer.sockets.emit(route, payload);
	}
}

export default ConnectionManager.Instance;