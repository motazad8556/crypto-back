import "reflect-metadata";
import Initializer from './_init';

Initializer.init()
.then(()=>{
	console.log("Server initialized correctly...");
})
.catch((err:Error)=>{
	console.log("\n\n\nThere has been an error initializing the server...\n\n\n");
	console.log(err);
});