import { expect } from 'chai';
import ServerConfiguration from '../_config';
import ServerConnectionManager from '../manager/ConnectionManager';
import AuthController from '../_client/controller/auth';
import { RESULT_CODE } from '../_client/enums/codes';
import UserController from '../_client/controller/user';
import ClientInitializer from '../_client/_init';
import ServerInitializer from '../_init';
import PriceController from '../_client/controller/price';
import { PRICE_ROUTES } from '../_client/enums/routes';
import { IPrice } from '../_client/interfaces/price';
import { SYMBOL, PAIR } from '../_client/enums/symbols';
import { PayloadValidator } from '../manager/RequestValidator';
import OrderController from '../_client/controller/order'
import { ORDER_TYPE, ORDER_SIDE } from '../_client/enums/order';
import { IOpenPosition } from '../_client/interfaces/openPosition';
import { QUERY_ORDER_DIR } from '../_client/enums/query';
import { CN_OPEN_ORDER, CN_OPEN_ORDER_INCLUDE_REL, CN_USER_INCLUDE_REL, CN_OPEN_POSITION, CN_POSITION_HISTORY } from '../_client/enums/columnNames';
import { IOpenOrder } from '../_client/interfaces/openOrder';
import DepositController from '../_client/controller/deposit';
import { IDeposit } from '../_client/interfaces/deposit';
import FundsController from '../_client/controller/funds';
import { IFunds } from '../_client/interfaces/funds';
import { Utils } from '../_client/utils';

it.skip('Auxiliary Testing', async function () {
	this.timeout(60000);

	console.log(Object.values(SYMBOL));

	console.log(`Object.values(SYMBOL).indexOf(SYMBOL.XBT)>-1: ${Object.values(SYMBOL).indexOf(SYMBOL.XBT) > -1}`);

	let res = await PayloadValidator.Instance.validateRequestPayload(PRICE_ROUTES.PRICE_GET_XBT, {
		symbol: SYMBOL.XBT
	});

	console.log(res);
});


describe('Main Testing', () => {

	let testData = {
		firstName: "firstTestName",
		lastName: "lastTestName",
		username: "username1",
		email: "email1@gmail.com",
		coutry: "USA",
		photo: "SOMETHINGOBERHERE",
		password: "123456"
	}

	let invalidTestData = {
		firstName: "firstTestName",
		lastName: "lastTestName",
		username: "username1",
		email: "email2@gmail.com",
		coutry: "US",
		photo: "SOMETHINGOBERHERE",
		password: "12345678"
	}

	before(async function configureTestEnv() {
		this.timeout(300000);
		await ServerInitializer.init();
		await ClientInitializer.init();
	});

	it('Should test server configuration', async () => {
		expect(typeof ServerConfiguration.ExpressPort === "number").to.be.eq(true);
	});

	it('Should test server socket is listening to new calls', async function () {
		expect(await ServerConnectionManager.isAcceptingSocketConnections()).to.be.eq(true);
	});

	describe('Should test the client interaction', function testClientInteractions() {


		it('Tests Client/Server User Creation Functionality', async function () {
			let result = await AuthController.signUp(testData);
			expect(result._meta._statusCode).to.be.eq(RESULT_CODE.SUCCESS);
			expect(result._payload.createdAt).to.be.greaterThan(0);
			expect(result._payload.id).to.be.greaterThan(0);
		});

		it.skip('Tests Client/Server User Creation Validation -- Requires previous test enabled', async function () {

			let result = await AuthController.signUp(invalidTestData);
			expect(result._meta._statusCode).to.be.eq(RESULT_CODE.USERNAME_ALREADY_REGISTERED);

			result = await AuthController.signUp(testData);
			expect(result._meta._statusCode).to.be.eq(RESULT_CODE.EMAIL_ALREADY_REGISTERED);

			let INVALID_USERNAME_DATA = JSON.parse(JSON.stringify(testData));
			INVALID_USERNAME_DATA.email = "another2@gmail.com";
			result = await AuthController.signUp(INVALID_USERNAME_DATA);

			expect(result._meta._statusCode).to.be.eq(RESULT_CODE.USERNAME_ALREADY_REGISTERED);
		});

		it.skip('Tests the user Auth. sign-in', async function () {
			let result = await AuthController.signIn({
				email: testData.email,
				password: testData.password
			});
			expect(typeof result._payload.authToken).to.be.eq("string");


			result = await AuthController.signIn({
				email: invalidTestData.email,
				password: invalidTestData.password
			});
			expect(result._meta._statusCode).to.be.eq(RESULT_CODE.EMAIL_DOES_NOT_EXIST);


			result = await AuthController.signIn({
				email: testData.email,
				password: invalidTestData.password
			});
			console.log(result);
			expect(result._meta._statusCode).to.be.eq(RESULT_CODE.INVALID_PASSWORD);
		});

		it.skip('Tests user update + fetch', async function () {
			let signIn = await AuthController.signIn({
				email: testData.email,
				password: testData.password
			});

			let updateUserName = "User_" + new Date().getTime()
			let result = await UserController.updateAccount({
				username: updateUserName
			}, signIn._payload.authToken);
			expect(result._meta._statusCode).to.be.eq(RESULT_CODE.SUCCESS);

			let updatedInfo = await UserController.fetchAccount({
				fields: ['username']
			}, signIn._payload.authToken);
			expect(updatedInfo._meta._statusCode).to.be.eq(RESULT_CODE.SUCCESS);
			expect(updatedInfo._payload.username).to.be.eq(updateUserName);
		});

		it.skip('Test the user password change', async function () {
			let signIn = await AuthController.signIn({
				email: testData.email,
				password: testData.password
			});

			let changePasswordResult = await AuthController.changePassword({
				password: testData.password,
				newPassword: testData.password + "32"
			}, signIn._payload.authToken);
			expect(changePasswordResult._payload.changed).to.be.eq(true);

			signIn = await AuthController.signIn({
				email: testData.email,
				password: testData.password + "32"
			});
			expect(signIn._meta._statusCode).to.be.eq(RESULT_CODE.SUCCESS);
			expect(typeof signIn._payload.authToken).to.be.eq("string");

			changePasswordResult = await AuthController.changePassword({
				password: testData.password + "32",
				newPassword: testData.password
			}, signIn._payload.authToken);

			expect(changePasswordResult._payload.changed).to.be.eq(true);

			signIn = await AuthController.signIn({
				email: testData.email,
				password: testData.password
			});
			expect(signIn._meta._statusCode).to.be.eq(RESULT_CODE.SUCCESS);
		});
	});

	describe('Should test the prices functionality', () => {

		it('Should test the price updates', async function testPriceUpdates() {
			this.timeout(300000);
			let prices: IPrice[] = await new Promise((accept) => {
				let prices = [];
				let handler = function (price: IPrice) {
					console.log(`Adding price #${prices.length + 1}: \n`, price, `\n\n`);
					prices.push(price);
				}
				let emitter = PriceController.listenToPrice(SYMBOL.XBT);
				emitter.on(SYMBOL.XBT, handler);
				setTimeout(() => {
					PriceController.unlistenToPrice(SYMBOL.XBT);
					accept(prices);
				}, 10000);
			});
			expect(prices.length).to.be.greaterThan(0);


			let signIn = await AuthController.signIn({
				email: testData.email,
				password: testData.password
			});
			let currentPrice = await PriceController.getCurrentPrice(SYMBOL.XBT, signIn._payload.authToken);
			expect(currentPrice).to.not.be.eq(null);
		});

	});

	describe('Should test the orders functionality', () => {
		//Tried with: long, market order, 100/9800/10000
		it('Should create a order', async function () {
			this.timeout(5000);

			let token: string;

			let signIn = await AuthController.signIn({
				email: testData.email,
				password: testData.password
			});

			expect(signIn._meta._statusCode).to.be.eq(RESULT_CODE.SUCCESS);

			let result = await OrderController.createNewOrder({
				pair: PAIR.BTC_USD,
				order_type: ORDER_TYPE.MARKET_ORDER,
				datetime: new Date(),
				size: 100,
				limit_price: 4000,
				entry_price: 5000,
				exit_price: 6000,
				stop_price: 6000,
				maker_only: false,
				side: ORDER_SIDE.LONG,
				leverage: 0
			}, token);
			expect(result._meta._statusCode).to.be.eq(RESULT_CODE.INVALID_TOKEN);

			token = signIn._payload.authToken;

			let newOrders = [];
			OrderController.listenNewOrderAdded(signIn._payload.id, (order)=>{
				newOrders.push(order);
			});

			result = await OrderController.createNewOrder({
				pair: PAIR.BTC_USD,
				order_type: ORDER_TYPE.LIMIT,
				datetime: new Date(),
				size: 3000,
				limit_price: 4000,
				entry_price: 5000,
				exit_price: 6000,
				stop_price: 6000,
				maker_only: false,
				side: ORDER_SIDE.SHORT,
				leverage: 2
			}, token);
			expect(result._meta._statusCode).to.be.eq(RESULT_CODE.SUCCESS);
			expect(newOrders.length).to.be.greaterThan(0);

			newOrders = [];
			result = await OrderController.createNewOrder({
				pair: PAIR.BTC_USD,
				order_type: ORDER_TYPE.MARKET_ORDER,
				datetime: new Date(),
				size: 1000,
				limit_price: 2000,
				entry_price: 1500,
				exit_price: 1000,
				stop_price: 1000,
				maker_only: false,
				side: ORDER_SIDE.LONG,
				leverage: 50
			}, token);
			expect(result._meta._statusCode).to.be.eq(RESULT_CODE.SUCCESS);
			expect(newOrders.length).to.be.greaterThan(0);

			newOrders = [];
			result = await OrderController.createNewOrder({
				pair: PAIR.BTC_USD,
				order_type: ORDER_TYPE.MARKET_ORDER,
				datetime: new Date(),
				size: 1000,
				limit_price: 2000,
				entry_price: 1500,
				exit_price: 1000,
				stop_price: 1000,
				maker_only: false,
				side: ORDER_SIDE.LONG,
				leverage: 50
			}, token);
			expect(result._meta._statusCode).to.be.eq(RESULT_CODE.SUCCESS);
			expect(newOrders.length).to.be.greaterThan(0);

			newOrders = [];
			result = await OrderController.createNewOrder({
				pair: PAIR.BTC_USD,
				order_type: ORDER_TYPE.MARKET_ORDER,
				datetime: new Date(),
				size: 1000,
				limit_price: 2000,
				entry_price: 1500,
				exit_price: 1000,
				stop_price: 1000,
				maker_only: false,
				side: ORDER_SIDE.LONG,
				leverage: 50
			}, token);
			expect(result._meta._statusCode).to.be.eq(RESULT_CODE.SUCCESS);
			expect(newOrders.length).to.be.greaterThan(0);

			result = await OrderController.createNewOrder({
				pair: PAIR.BTC_USD,
				order_type: ORDER_TYPE.MARKET_ORDER,
				datetime: new Date(),
				size: 500,
				limit_price: 2000,
				entry_price: 1500,
				exit_price: 1000,
				stop_price: 1000,
				maker_only: true,
				side: ORDER_SIDE.LONG,
				leverage: 50
			}, token);
			expect(result._meta._statusCode).to.be.eq(RESULT_CODE.SUCCESS);
			expect(result._payload.openPositon).to.not.be.eq(undefined);
			expect(typeof result._payload.openPositon.id).to.be.eq("string");
		});

		it('Should cancel an open order', async function(){
			this.timeout(15000);
			let token: string;

			let signIn = await AuthController.signIn({
				email: testData.email,
				password: testData.password
			});

			expect(signIn._meta._statusCode).to.be.eq(RESULT_CODE.SUCCESS);

			token = signIn._payload.authToken;

			let oldFunds = (await UserController.fetchAccount({
				fields:['id'],
				relations:[CN_USER_INCLUDE_REL.funds]
			}, token))._payload.funds.btc_ammount;

			let result = await OrderController.createNewOrder({
				pair: PAIR.BTC_USD,
				order_type: ORDER_TYPE.LIMIT,
				datetime: new Date(),
				size: 100,
				limit_price: 4000,
				entry_price: 5000,
				exit_price: 6000,
				stop_price: 6000,
				maker_only: false,
				side: ORDER_SIDE.LONG,
				leverage: 0
			}, token);
			expect(result._meta._statusCode).to.be.eq(RESULT_CODE.SUCCESS);

			await new Promise((accept)=>{
				setTimeout(()=>{
					accept();
				}, 10000);
			});

			let cancelResult = await OrderController.cancelOpenOrder({
				orderId: result._payload.record.id
			}, token);
			expect(cancelResult._meta._statusCode).to.be.eq(RESULT_CODE.SUCCESS);

			let newFunds = (await UserController.fetchAccount({
				fields:['id'],
				relations:[CN_USER_INCLUDE_REL.funds]
			}, token))._payload.funds.btc_ammount;
			expect(newFunds).to.be.eq(oldFunds);
			//result._payload.record.id
		});

		it('Should fetch the open order and limit them to 1', async function () {
			let token: string;
			let signIn = await AuthController.signIn({
				email: testData.email,
				password: testData.password
			});
			expect(signIn._meta._statusCode).to.be.eq(RESULT_CODE.SUCCESS);
			token = signIn._payload.authToken;

			let openOrders = await OrderController.fetchOpenOrders({
				skip: 0,
				limit: 0,
				orderBy: CN_OPEN_ORDER.createdAt,
				order: QUERY_ORDER_DIR.ASC,
				includedRel:[
					CN_OPEN_ORDER_INCLUDE_REL.price_copy,
					CN_OPEN_ORDER_INCLUDE_REL.openPosition,
					CN_OPEN_ORDER_INCLUDE_REL.user
				]
			}, token);

			expect(openOrders._meta._statusCode).to.be.eq(RESULT_CODE.SUCCESS);
			expect(openOrders._payload.records.length).to.be.greaterThan(0);
		});

		it('Should test the open orders update', async function(){
			let token: string;
			let signIn = await AuthController.signIn({
				email: testData.email,
				password: testData.password
			});
			expect(signIn._meta._statusCode).to.be.eq(RESULT_CODE.SUCCESS);
			token = signIn._payload.authToken;

			let openOrderCreationResult = await OrderController.createNewOrder({
				pair: PAIR.BTC_USD,
				order_type: ORDER_TYPE.MARKET_ORDER,
				datetime: null,
				size: 3000,
				limit_price: 4000,
				entry_price: 5000,
				exit_price: 6000,
				stop_price: 6000,
				maker_only: false,
				side: ORDER_SIDE.LONG,
				leverage: 2
			}, "");
			expect(openOrderCreationResult._meta._statusCode).to.be.eq(RESULT_CODE.INVALID_TOKEN);

			let openOrders = await OrderController.fetchOpenOrders({
				skip: 0,
				limit: 0,
				orderBy: CN_OPEN_ORDER.createdAt,
				order: QUERY_ORDER_DIR.ASC,
				includedRel:[
					CN_OPEN_ORDER_INCLUDE_REL.price_copy,
					CN_OPEN_ORDER_INCLUDE_REL.openPosition,
					CN_OPEN_ORDER_INCLUDE_REL.user
				]
			}, token);
			expect(openOrders._meta._statusCode).to.be.eq(RESULT_CODE.SUCCESS);
			expect(openOrders._payload.records.length).to.be.greaterThan(0);

			let editedOrder = await OrderController.updateOpenOrder({
				field:{
					stop_price: 4000,
					exit_price: 3000
				},orderId: openOrders._payload.records[0].id
			}, token);

			expect(editedOrder._meta._statusCode).to.be.eq(RESULT_CODE.SUCCESS);
			expect(editedOrder._payload.newRecord).to.not.be.eq(null);
			expect(editedOrder._payload.newRecord.exit_price).to.be.eq(3000);
			expect(editedOrder._payload.newRecord.stop_price).to.be.eq(4000);
			expect(editedOrder._payload.oldRecord.exit_price).to.be.eq(openOrders._payload.records[0].exit_price);
		});

		it('Should test the cancel open order functionality', async function(){
			this.timeout(5000);
			console.log(`Should test the cancel open order functionality -- 1`);

			let token: string;
			let signIn = await AuthController.signIn({
				email: testData.email,
				password: testData.password
			});
			expect(signIn._meta._statusCode).to.be.eq(RESULT_CODE.SUCCESS);
			token = signIn._payload.authToken;

			let result = await OrderController.createNewOrder({
				pair: PAIR.BTC_USD,
				order_type: ORDER_TYPE.LIMIT,
				datetime: null,
				size: 3000,
				limit_price: 4000,
				entry_price: 5000,
				exit_price: 6000,
				stop_price: 6000,
				maker_only: false,
				side: ORDER_SIDE.SHORT,
				leverage: 2
			}, token);
			expect(result._meta._statusCode).to.be.eq(RESULT_CODE.SUCCESS);
			

			console.log(`Should test the cancel open order functionality -- 2`);

			console.log(`Should test the cancel open order functionality -- 3`);
			let userWithFunds = await UserController.fetchAccount({
				fields:['id'],
				relations:[CN_USER_INCLUDE_REL.funds]
			}, token);
			expect(userWithFunds._meta._statusCode).to.be.eq(RESULT_CODE.SUCCESS);
			let cancelResult = await OrderController.cancelOpenOrder({
				orderId: result._payload.record.id
			}, token);
			
			console.log(`Should test the cancel open order functionality -- 4`);
			userWithFunds = await UserController.fetchAccount({
				fields:['id'],
				relations:[CN_USER_INCLUDE_REL.funds]
			}, token);
			expect(userWithFunds._meta._statusCode).to.be.eq(RESULT_CODE.SUCCESS);
			expect(userWithFunds._payload.funds.btc_ammount).to.be.eq(cancelResult._payload.funds.btc_ammount);

			console.log(`Should test the cancel open order functionality -- 5`);
			let openOrders = await OrderController.fetchOpenOrders({
				skip: 0,
				limit: 0,
				orderBy: CN_OPEN_ORDER.createdAt,
				order: QUERY_ORDER_DIR.ASC,
				includedRel:[
					CN_OPEN_ORDER_INCLUDE_REL.price_copy,
					CN_OPEN_ORDER_INCLUDE_REL.openPosition,
					CN_OPEN_ORDER_INCLUDE_REL.user
				],
				exact:{
					id: result._payload.record.id
				}
			}, token);
			expect(openOrders._meta._statusCode).to.be.eq(RESULT_CODE.SUCCESS);
			expect(openOrders._payload.records.length).to.be.eq(0);
			console.log(`Should test the cancel open order functionality -- 6`);
		});

		it('Should test the open positions fetch', async function(){
			let token: string;
			let signIn = await AuthController.signIn({
				email: testData.email,
				password: testData.password
			});
			expect(signIn._meta._statusCode).to.be.eq(RESULT_CODE.SUCCESS);
			token = signIn._payload.authToken;

			let result = await OrderController.createNewOrder({
				pair: PAIR.BTC_USD,
				order_type: ORDER_TYPE.MARKET_ORDER,
				datetime: null,
				size: 500,
				limit_price: 2000,
				entry_price: 1500,
				exit_price: 1000,
				stop_price: 1000,
				maker_only: true,
				side: ORDER_SIDE.LONG,
				leverage: 50
			}, token);
			expect(result._meta._statusCode).to.be.eq(RESULT_CODE.SUCCESS);

			let openPositions = await OrderController.fetchOpenPositions({
				order: QUERY_ORDER_DIR.ASC,
				orderBy: CN_OPEN_POSITION.createdAt,
				skip: 0,
				limit: 0
			}, token);
			expect(openPositions._meta._statusCode).to.be.eq(RESULT_CODE.SUCCESS);
			expect(openPositions._payload.records.length).to.be.greaterThan(0);
			
		});

		it('Should edit the open positions', async function(){
			let token: string;
			let signIn = await AuthController.signIn({
				email: testData.email,
				password: testData.password
			});
			expect(signIn._meta._statusCode).to.be.eq(RESULT_CODE.SUCCESS);
			token = signIn._payload.authToken;

			let openPositions = await OrderController.fetchOpenPositions({
				order: QUERY_ORDER_DIR.ASC,
				orderBy: CN_OPEN_POSITION.createdAt,
				skip: 0,
				limit: 0,
				lesserThan:{
					createdAt: new Date()
				}
			}, token);

			expect(openPositions._meta._statusCode).to.be.eq(RESULT_CODE.SUCCESS);
			expect(openPositions._payload.records.length).to.be.greaterThan(0);

			const editingPosition:IOpenPosition = openPositions._payload.records[0];

			let newUpdateResult = await OrderController.updateOpenPosition({
				field:{
					stop_price: 6000,
					exit_price: 3000
				},
				positionId: editingPosition.id
			}, token);
			expect(newUpdateResult._meta._statusCode).to.be.eq(RESULT_CODE.SUCCESS);
			expect(newUpdateResult._payload.oldRecord.stop_price).to.be.eq(editingPosition.stop_price);
			expect(newUpdateResult._payload.newRecord.exit_price).to.be.eq(3000);
			expect(newUpdateResult._payload.newRecord.stop_price).to.be.eq(6000);
		});

		it('Should close open position at market price', async function(){
			let token: string;
			let signIn = await AuthController.signIn({
				email: testData.email,
				password: testData.password
			});
			expect(signIn._meta._statusCode).to.be.eq(RESULT_CODE.SUCCESS);
			token = signIn._payload.authToken;

			let openPositions = await OrderController.fetchOpenPositions({
				order: QUERY_ORDER_DIR.ASC,
				orderBy: CN_OPEN_POSITION.createdAt,
				skip: 0,
				limit: 0,
				lesserThan:{
					createdAt: new Date()
				}
			}, token);

			let closingPosition = openPositions._payload.records[0];
			let closedPosition: IOpenPosition = null;
			OrderController.listenOpenPositionClosedAMP(signIn._payload.id, (order)=>{
				closedPosition = order;
			})

			let newUpdateResult = await OrderController.closeOpenPositionAtMarketPrice({
				positionId: closingPosition.id
			}, token);
			expect(newUpdateResult._meta._statusCode).to.be.eq(RESULT_CODE.SUCCESS);
			expect(typeof newUpdateResult._payload.historyId).to.be.eq("string");
			expect(closedPosition).to.not.be.eq(null);
		});

		it('Should fetch positions history', async function(){
			let token: string;
			let signIn = await AuthController.signIn({
				email: testData.email,
				password: testData.password
			});
			expect(signIn._meta._statusCode).to.be.eq(RESULT_CODE.SUCCESS);
			token = signIn._payload.authToken;

			let positionHistoryFetchResponse = await OrderController.fetchPositionHistory({
				order: QUERY_ORDER_DIR.ASC,
				orderBy: CN_POSITION_HISTORY.createdAt,
				skip: 0,
				limit: 0,
				lesserThan:{
					createdAt: new Date()
				}
			}, token);

			expect(positionHistoryFetchResponse._meta._statusCode).to.be.eq(RESULT_CODE.SUCCESS);
			expect(positionHistoryFetchResponse._payload.records.length).to.be.greaterThan(0);
		});

		it('Shold test the order listeners...', async function(){
			this.timeout(200000);
			let token: string;
			let signIn = await AuthController.signIn({
				email: testData.email,
				password: testData.password
			});
			expect(signIn._meta._statusCode).to.be.eq(RESULT_CODE.SUCCESS);
			token = signIn._payload.authToken;

			//Open Order Listeners
			let OpenOrdersList:IOpenOrder[] = [];
			let cancellOOrders:IOpenOrder[] = [];
			let removedOOrders:IOpenOrder[] = [];
			OrderController.listenNewOrderAdded(signIn._payload.id, (order)=>{
				OpenOrdersList.push(order);
			});
			OrderController.listenOpenOrderCancelled(signIn._payload.id, (order)=>{
				cancellOOrders.push(order);
			});
			OrderController.listenOpenOrderRemoved(signIn._payload.id, (order)=>{
				removedOOrders.push(order);
			});

			let newOpenOrderResponse = await OrderController.createNewOrder({
				pair: PAIR.BTC_USD,
				order_type: ORDER_TYPE.MARKET_ORDER,
				datetime: null,
				size: 500,
				limit_price: 2000,
				entry_price: 1500,
				exit_price: 1000,
				stop_price: 1000,
				maker_only: false,
				side: ORDER_SIDE.LONG,
				leverage: 50
			}, token);
			expect(newOpenOrderResponse._meta._statusCode).to.be.eq(RESULT_CODE.SUCCESS);
			expect(OpenOrdersList.length).to.be.eq(1);

			let openOrderRemoveResult = await OrderController.cancelOpenOrder({
				orderId: OpenOrdersList[0].id
			}, token);
			OpenOrdersList = OpenOrdersList.splice(0, 1);
			expect(openOrderRemoveResult._meta._statusCode).to.be.eq(RESULT_CODE.SUCCESS);
			expect(cancellOOrders.length).to.be.greaterThan(0);
			expect(removedOOrders.length).to.be.greaterThan(0);

			// Open Positions Listeners
			let openPositionsList:IOpenPosition[] = [];

			OrderController.listenNewOpenPositionAdded(signIn._payload.id, (order)=>{
				openPositionsList.push(order);
			});
			
			newOpenOrderResponse = await OrderController.createNewOrder({
				pair: PAIR.BTC_USD,
				order_type: ORDER_TYPE.MARKET_ORDER,
				datetime: null,
				size: 500,
				limit_price: 2000,
				entry_price: 1500,
				exit_price: 1000,
				stop_price: 1000,
				maker_only: true,
				side: ORDER_SIDE.LONG,
				leverage: 50
			}, token);
			expect(newOpenOrderResponse._meta._statusCode).to.be.eq(RESULT_CODE.SUCCESS);

			await new Promise((accept)=>{
				setTimeout(()=>{
					accept();
				},15000);
			});
			expect(openPositionsList.length).to.be.greaterThan(0);

			openPositionsList = (await OrderController.fetchOpenPositions({order: QUERY_ORDER_DIR.ASC,
				orderBy: CN_OPEN_POSITION.createdAt,
				skip: 0,
				limit: 0,
				lesserThan:{
					createdAt: new Date()
				}
			}, token))._payload.records;

			let openPositionsRemoved:IOpenPosition[] = [];
			let openPositionsClosed:IOpenPosition[] = [];
			
			OrderController.listenOpenPositionRemoved(signIn._payload.id, (order)=>{
				openPositionsRemoved.push(order);
			});

			OrderController.listenOpenPositionClosedAMP(signIn._payload.id, (order)=>{
				openPositionsClosed.push(order);
			});
			
			let closeResult = await OrderController.closeOpenPositionAtMarketPrice({
				positionId: openPositionsList[0].id
			}, token);
			expect(closeResult._meta._statusCode).to.be.eq(RESULT_CODE.SUCCESS);
			expect(openPositionsClosed.length).to.be.greaterThan(0);
			expect(openPositionsRemoved.length).to.be.greaterThan(0);
		});

	});

	describe('It should test the deposit functionality', () => {
		it('Should test the main functionality --> Deposit into an account', async function(){
			let token: string;
			let signIn = await AuthController.signIn({
				email: testData.email,
				password: testData.password
			});
			expect(signIn._meta._statusCode).to.be.eq(RESULT_CODE.SUCCESS);
			token = signIn._payload.authToken;

			let funds = (await UserController.fetchAccount({
				fields:['id'],
				relations:[CN_USER_INCLUDE_REL.funds]
			}, token))._payload.funds;

			console.log("Current funds: ",funds);
			let oldAmmount = funds.btc_ammount;
			console.log("oldAmmount: ",oldAmmount);
			let newDeposits:IDeposit[] = [];
			let newFunds:IFunds;
			DepositController.listenNewDepositAdded(signIn._payload.id, (deposit)=>{
				newDeposits.push(deposit);
			});
			FundsController.listenFundsUpdated(signIn._payload.id, function(updatedFunds){
				newFunds = updatedFunds;
			});

			let creationResponse = await DepositController.createNewDeposit({
				btc_ammount: 3,
				btc_address: "asldjaksdklajsdklajslkdjaklsdj"
			}, token);
			expect(creationResponse._meta._statusCode).to.be.eq(RESULT_CODE.SUCCESS);
			expect(creationResponse._payload.newFunds.btc_ammount).to.be.eq(Utils.Instance.normalizeBitcoinAmmount(oldAmmount+3));
			expect(newFunds.btc_ammount).to.be.eq(Utils.Instance.normalizeBitcoinAmmount(oldAmmount+3));
			expect(newDeposits.length).to.be.eq(1);

			funds = (await UserController.fetchAccount({
				fields:['id'],
				relations:[CN_USER_INCLUDE_REL.funds]
			}, token))._payload.funds;
			expect(funds.btc_ammount).to.be.eq(Utils.Instance.normalizeBitcoinAmmount(oldAmmount+3));

			console.log(`\n\n\nnewFunds: \n\n`,newFunds);
		});
	});
	
});