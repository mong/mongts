import crypto from "node:crypto";
import compression from "compression";
import cors from "cors";
import express, {
  type Request,
  type RequestHandler,
  type Response,
} from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import { parse } from "qs";
import registerDataRouter from "./routes/data";
//router
import registerInfoRouter from "./routes/info";

const PORT = process.env.PORT ?? 4000;

const app = express();

// Required for migrating from Express 4 to 5
app.set("query parser", (str: string) => parse(str, { arrayLimit: 100 }));

// biome-ignore lint: ignored to pass ci checks, but should be fixed properly in the future
const maxRequests = parseInt(process.env.RATELIMIT ?? "1000");
const rateLimiter = rateLimit({
  windowMs: 30 * 1000, // 30 seconds
  // biome-ignore lint: ignored to pass ci checks, but should be fixed properly in the future
  max: isNaN(maxRequests) ? 1000 : maxRequests, // Limit each IP to 1000 requests per `window` (here, per 30 seconds) as default
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

app.use(rateLimiter);

// Adds a nonce to response for use on inline scripts
// biome-ignore lint: ignored to pass ci checks, but should be fixed properly in the future
app.use((req, res, next) => {
  res.locals.nonce = crypto.randomBytes(16).toString("hex");
  next();
});

app.use(
  helmet({
    crossOriginOpenerPolicy: false,
    contentSecurityPolicy: {
      useDefaults: true,
      directives: {
        // @ts-expect-error res is of class ServerResponse from http module not express Response. Havent found a way to extend ServerResponse
        // biome-ignore lint: ignored to pass ci checks, but should be fixed properly in the future
        "script-src": ["'self'", (req, res) => `'nonce-${res.locals.nonce}'`],
      },
    },
  }),
);
app.use(cors());
// biome-ignore lint: ignored to pass ci checks, but should be fixed properly in the future
(app as any).use(
  compression({
    level: 6,
  }),
);
app.use(express.json());

const BROWSER_MAX_AGE = process.env.BROWSER_MAX_AGE ?? 60 * 60;
const CDN_MAX_AGE = process.env.CDN_MAX_AGE ?? 60 * 60 * 24;
// biome-ignore lint: ignored to pass ci checks, but should be fixed properly in the future
const cache: RequestHandler = (req, res, next) => {
  res.set(
    "cache-control",
    `public, max-age=${BROWSER_MAX_AGE}, s-maxage=${CDN_MAX_AGE}`,
  );
  next();
};
// Routes
app.use("/data", cache, registerDataRouter);
app.use("/info", cache, registerInfoRouter);

// biome-ignore lint: ignored to pass ci checks, but should be fixed properly in the future
app.get("/", (req: Request, res: Response): unknown =>
  res.json({ status: "OK", version: process.env.VERSION ?? "local" }),
);

app.listen(PORT, () => {
  // biome-ignore lint: ignored to pass ci checks, but should be replace by a enviroment check if needed in development.
  console.log(`API listening at http://localhost:${PORT}`);
});
