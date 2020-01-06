import {schema, Type, Database} from 'lovefield';
import { TABLE_NAME, TABLE_FIELD_AUTH, TABLE_FIELD_USER, TABLE_FIELD_CHECK } from '../enums/tables';


export class DatabaseManager {
	public static Instance = new DatabaseManager();

	private _builder: schema.Builder;
	private _db: Database;

	public get builder(){
		return this._builder;
	}

	public get db(){
		return this._db;
	}


	private constructor(){
	}

	async init(){
		await this.setUpDatabase();
	}

	async setUpDatabase(){
		this._builder = schema.create('main', 5);
		this._builder.createTable(TABLE_NAME.AUTH)
		.addColumn(TABLE_FIELD_AUTH.id, Type.NUMBER)
		.addColumn(TABLE_FIELD_AUTH.jwt, Type.STRING)
		.addPrimaryKey([TABLE_FIELD_AUTH.id]);


		this._builder.createTable(TABLE_NAME.INI_CHECK)
		.addColumn(TABLE_FIELD_CHECK.loaded, Type.BOOLEAN)
		.addColumn(TABLE_FIELD_AUTH.id, Type.INTEGER)
		.addPrimaryKey([TABLE_FIELD_AUTH.id]);

		this._builder.createTable(TABLE_NAME.USER)
		.addColumn(TABLE_FIELD_USER.id, Type.NUMBER)		
		.addColumn(TABLE_FIELD_USER.createdAt, Type.DATE_TIME)
		.addColumn(TABLE_FIELD_USER.updatedAt, Type.DATE_TIME)
		.addColumn(TABLE_FIELD_USER.firstName, Type.STRING)
		.addColumn(TABLE_FIELD_USER.lastName, Type.STRING)
		.addColumn(TABLE_FIELD_USER.username, Type.STRING)
		.addColumn(TABLE_FIELD_USER.email, Type.STRING)
		.addColumn(TABLE_FIELD_USER.country, Type.STRING)
		.addColumn(TABLE_FIELD_USER.photo, Type.STRING)
		.addNullable([
			TABLE_FIELD_USER.firstName,
			TABLE_FIELD_USER.lastName,
			TABLE_FIELD_USER.username,
			TABLE_FIELD_USER.country,
			TABLE_FIELD_USER.photo,
		])
		.addPrimaryKey([TABLE_FIELD_USER.id]);

		this._db = await this._builder.connect();

		await new Promise(async (accept)=>{
			try{
				let item = this._db.getSchema().table(TABLE_NAME.INI_CHECK);
				let select = this._db.select().from(item).where(item[TABLE_FIELD_CHECK.loaded].isNotNull());
				let rec = await select.exec();
				accept();
			}catch(e){
				accept();
			}
		});
	}


}

export default DatabaseManager.Instance;