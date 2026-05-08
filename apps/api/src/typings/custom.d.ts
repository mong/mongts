// biome-ignore lint: no-unused-vars -- reason: global replace, please state reason here
import { Express } from "express-serve-static-core";

declare module "express-serve-static-core" {
	interface Response {
		locals: {
			nonce: string;
		};
	}
}
