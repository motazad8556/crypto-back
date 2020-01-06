import { IRealtimeBitmexOrderData, ILatestTradesData_bitmex } from './priceRequest';

export interface IPrice {
	id: number;
	createdAt: Date;
	updatedAt: Date;
    symbol: string;
	timestamp: Date;
	price: number;
	_tradeCopy: boolean;
}

export interface IUIOrderData {
	data: IRealtimeBitmexOrderData
}

export interface IUILatestTradesData {
	data: ILatestTradesData_bitmex
}

export interface IUIDisplayOrderData {
	origin: IUIOrderData,
	data:{
		asks:{
			price: number,
			size: number
		}[],
		bids:{
			price: number,
			size: number
		}[]
	},
}

export interface IUIDisplayRecentOrdersData {
	origin: IUIOrderData,
	data:{
		asks:{
			price: number,
			size: number
		}[],
		bids:{
			price: number,
			size: number
		}[]
	},
}