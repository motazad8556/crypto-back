import {environment as prod_environment} from "./environment.prod";

const exchange_envs = true;

const test_environment = {
	production: true,
	EXPRESS_HOST: "https://mighty-forest-81407.herokuapp.com",
   	EXPRESS_PORT: 8080,
   	SOCKET_HOST: "https://mighty-forest-81407.herokuapp.com",
   	SOCKET_PORT: 8080,
   	SOCKET_TIMEOUT_MILLIS: 8000
};

export const environment = exchange_envs ? prod_environment : test_environment;
