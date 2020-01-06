import WorkerManager from "./Worker";

export class ShutdownManager {
	public static Instance:ShutdownManager = new ShutdownManager();

	private constructor(){
	}

	/**
	 * @description Handles the shutdown and process termination events
	 */
	init(){
		process.on('SIGTERM', function(){
			WorkerManager.stopWorker()
			.then(()=>{
				console.log("Stopped worker SIGTERM...");
				process.exit();
			})
			.catch((err)=>{
				console.log("Error found...",err);
				process.exit();
			});
		});
		process.on('SIGINT', function(){
			WorkerManager.stopWorker()
			.then(()=>{
				console.log("Stopped worker SIGINT...");
				process.exit();
			})
			.catch((err)=>{
				console.log("Error found...",err);
				process.exit();
			});
		});
	}
}

export default ShutdownManager.Instance;