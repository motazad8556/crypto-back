import { USED_COUNTRIES } from "../_client/enums/Country";

export class SyntaxValidator {
	private static _instance: SyntaxValidator = new SyntaxValidator();

	private constructor(){
	}

	public static get Instance(){
		return this._instance;
	}

	hasValidEmail(email:string){
		return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		.test(email)
	}

	hasValidPassword(pass:string){
		return pass && pass.length < 60;
	}

	hasValidFirstName(name:string){
		return /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{1,20}$/.test(name);
	}

	hasValidLastName(name:string){
		return /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{1,20}$/.test(name);
	}

	hasValidBase64Image(image:string){
		if(!image){
			return true;
		}
		//return /^[\s\S]{1,1024*}$/.test(image);
		return (image.length < (1024*1024)+(.20*(1024*1024)));
	}

	hasValidCountry(country:string){
		return country &&
		/^[a-zA-Z]{3}$/.test(country) &&
		USED_COUNTRIES.find((el)=>{
			return el.code === country;
		}) !== null;
	}
}

export default SyntaxValidator.Instance;