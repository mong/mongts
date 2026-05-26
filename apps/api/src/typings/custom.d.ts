// biome-ignore lint: ignored to pass ci checks, but should be fixed properly in the future
import { Express } from "express-serve-static-core";

declare module "express-serve-static-core" {
  interface Response {
    locals: {
      nonce: string;
    };
  }
}
