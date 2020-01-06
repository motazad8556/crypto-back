import Configuration from "../_config";
import WorkerController from "../controller/Worker";
import { WORKER_STATUS, WORKER_TASK } from "../enum/worker";
import * as Request from 'request';
import LatestPriceController from "../controller/Price";
import { Price } from "../entity/Price";
import { ILatestPriceRequestBody_bitmex } from "../_client/interfaces/priceRequest";
import WorkerManager from "./Worker";
import ConnectionManager from "./ConnectionManager";
import { PRICE_ROUTES } from "../_client/enums/routes";
import { SYMBOL, SYMBOL_EQ } from "../_client/enums/symbols";
import OpenOrderController from "../controller/OpenOrder";
import OpenPositionController from "../controller/OpenPosition";


export class LatestPriceManager {
	public static Instance:LatestPriceManager = new LatestPriceManager();

	private constructor(){}

	async init(){
		this.startWatching(SYMBOL.XBT);
	}

	/**
	 * @description Starts requesting and updating the price every 5s
	 */
	private async startWatching(symbol:SYMBOL){
		//console.log("\n\n\n"+__filename+": startWatching -- 1\n");
		let currentWorker = await WorkerController.one({
			where:{
				status: WORKER_STATUS.WORKING,
				task: WORKER_TASK.FETCH_LATEST_PRICE
			},
			order:{
				updatedAt:'DESC'
			}
		});

		if(currentWorker){
			let diff = new Date().getTime() - currentWorker.updatedAt.getTime();
			if(diff > (Configuration.PriceUpdateTime+3000)){
				if(currentWorker.id !== Configuration.workerId){
					await WorkerManager.startWorker(WORKER_TASK.FETCH_LATEST_PRICE);
					for(let i=0;true;i++){
						await new Promise((accept)=>{
							setTimeout(async ()=>{
								await this._updatePrice(symbol);
								await WorkerManager.updateWorker();
								accept();
							}, Configuration.PriceUpdateTime)
						})
						.catch((err)=>{
							//console.log(err);
						})
					}
				}else{
					//console.log("\n\n\n"+__filename+": startWatching -- 6\n\n\n");
					//Fetch price, update and
					//start listening
					await WorkerManager.startWorker(WORKER_TASK.FETCH_LATEST_PRICE);
					await this._updatePrice(symbol);
					for(let i=0;true;i++){
						await new Promise((accept)=>{
							setTimeout(async ()=>{
								await this._updatePrice(symbol);
								await WorkerManager.updateWorker();
								accept();
							}, Configuration.PriceUpdateTime)
						})
						.catch((err)=>{
							console.log(err);
						})
					}
				}
			}
		}else{
			//console.log("\n\n\n"+__filename+": startWatching -- 7\n\n\n");
			//No current worker to undertake this task
			//We proceed to take it on our own
			await WorkerManager.startWorker(WORKER_TASK.FETCH_LATEST_PRICE);
			await this._updatePrice(symbol);
			for(let i=0;true;i++){
				await new Promise((accept)=>{
					setTimeout(async ()=>{
						await this._updatePrice(symbol);
						await WorkerManager.updateWorker();
						accept();
					}, Configuration.PriceUpdateTime)
				})
				.catch((err)=>{
					console.log(err);
				})
			}
		}
	}

	/**
	 * @description Requests and Updates the Bitcoin Price
	 * @param symbol The symbol to watch
	 */
	private async _updatePrice(symbol:SYMBOL){
		//get(`https://www.bitmex.com/api/v1/trade?symbol=${symbol}&count=1&reverse=true`)
		
		let body:ILatestPriceRequestBody_bitmex = await new Promise((accept)=>{
			Request
			.get(`https://www.bitmex.com/api/v1/trade?symbol=${SYMBOL_EQ[symbol]}&count=1&reverse=true`, function(error, response, body){
				if(error){
					accept(null);
				}else{
					try{
						accept(JSON.parse(body)[0]);
					}catch(e){
						accept(null);
					}
				}
			});
		});

		if(!body){
			return;
		}
		//console.log("\n\n\n\nSETTING UP: ",body,"\n\n");

		let currentPrice = await LatestPriceController.one({
			where:{
				_tradeCopy: false
				,symbol: body.symbol
			}
		});

		let _oldRecord:Price;

		if(!currentPrice){	//Still doesn't exist
			//Create it
			currentPrice = new Price();
			currentPrice._tradeCopy = false;
			currentPrice.symbol = body.symbol;
		}else{
			_oldRecord = currentPrice.fromJson(currentPrice.toJson());
			_oldRecord.id = null;
			_oldRecord = await LatestPriceController.save(_oldRecord);
			const obsoletePrices = await LatestPriceController.removeObsoletePrices(_oldRecord.timestamp);
			console.log(`obsoletePrices -- reference: `,_oldRecord);
			console.log(`obsoletePrices: `,obsoletePrices);
		}
		currentPrice.price = body.price;
		currentPrice.price = 1234;			//TODO Delete this line
		currentPrice.timestamp = new Date(body.timestamp);
		currentPrice = await LatestPriceController.save(currentPrice);	//Saving Updated Copy

		//Emmit Price via broadcast
		if(symbol === SYMBOL.XBT){
			ConnectionManager.emitBroadcast(PRICE_ROUTES.PRICE_UPDATE_XBT, currentPrice.toJson());
			OpenOrderController.upgradeMetOpenOrders(currentPrice)
			.then(()=>{
				console.log("Upgraded Met Open Orders...");
			})
			.catch((e)=>{
				console.log(`\n\n\n\n
**************** ERROR UPGRADING UPDATE ORDERS:\n\n`,e);
			});
			OpenPositionController.closeMetOpenPositions(currentPrice)
			.then(()=>{
				console.log(`Upgraded Met Open Positions...`);
			})
			.catch((e)=>{
				console.log(`\n\n\n\n\n
**************** ERROR UPGRADING UPDATE POSITIONS:\n\n`,e);
			});
		}
	}

}

export default LatestPriceManager.Instance;

