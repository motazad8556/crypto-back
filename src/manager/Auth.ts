import * as bcrypt from 'bcrypt';
import UserController from '../controller/User';
import * as jwt from 'jsonwebtoken';
import { IToken } from '../_client/interfaces/auth';
import AuthController from '../controller/Auth';

export class AuthManager {
	private static _instance: AuthManager = new AuthManager();
	private constructor(){}

	public static get Instance(){
		return this._instance;
	}

	private get JWTKEY(){
		return process.env.JWT_KEY || "S^YkxBroDSQ62er$";
	}

	hashPassword(password:string, salt: string){
		return bcrypt.hashSync(password, salt);
	}

	async hasSamePassword(userID: string | number, password: string){
		let user = await UserController.one({
			where:{
				id: userID
			},
			relations:['auth']
		});
		if(user){
			return bcrypt.compareSync(password, user.auth.hash);
		}else{
			throw "USER DOESN'T EXIST..."
		}
	}

	async changeUserPassword(userID: number, newPassword: string){
		let user = await UserController.one({
			where:{
				id: userID
			},
			relations:['auth']
		});
		user.auth.hash = await this.hashPassword(newPassword, user.auth.salt);
		await AuthController.save(user.auth);
	}

	async getJWToken(email:string){
		let user = await UserController.one({
			where:{
				email:email
			}
		});

		let tokenPayload:IToken = {
			user: user.toJson()
		};
		
		return jwt.sign(tokenPayload, this.JWTKEY,{
			expiresIn: '60d'
		});
	}

	genSalt(){
		return bcrypt.genSaltSync(10, 'b');
	}

	async hasValidToken(token:string): Promise<boolean>{
		return await new Promise((accept)=>{
			jwt.verify(token, this.JWTKEY, function(err, token){
				if(err){
					accept(false);
				}else{
					accept(true);
				}
			});
		});
	}

	async parseToken(token:string): Promise<null | IToken>{
		return await new Promise((accept)=>{
			jwt.verify(token, this.JWTKEY, function(err, token){
				if(err){
					accept(null);
				}else{
					accept(<IToken>token);
				}
			});
		});
	}
	
}

export default AuthManager.Instance;