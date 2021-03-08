import { ApolloServer, AuthenticationError } from "apollo-server-express";
import express, { Request, Response, request } from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import http from "http";
import cors from "cors";
import cookieParser from "cookie-parser";

import db, { PrismaClient } from "./db";
import typeDefs from "./schema";
import resolvers from "./resolvers";

dotenv.config();

const APP_HOST = "localhost";
const PORT = 5001;
const APP_URL = `${APP_HOST}:${PORT}`;

export interface IApolloExpressContext {
  req: Request & { userId?: string };
  res: Response;
  db: PrismaClient;
  connection: any;
  userId: number;
}

function authMiddleware() {
  // @ts-ignore
  return async function authMiddlewareHandler(req, res, next) {
    const token = req.cookies.token;

    if (token) {
      // @ts-ignore
      const { id } = jwt.verify(token, process.env.SECRET_KEY);
      if (!id) {
        throw new AuthenticationError(
          "Authentication token is invalid, please log in again"
        );
      }
      req.userId = id;
    }
    await next();
  };
}

const corsOptions = {
  origin: "http://localhost:5002",
  credentials: true,
};

const app = express();
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(authMiddleware());

const httpServer = http.createServer(app);

const context = ({ req, res, connection }: IApolloExpressContext) => {
  if (connection) {
    // check connection for metadata
    return connection.context;
  } else {
    const { userId, ...request } = req;
    return { req: request, res, userId, db };
  }
};

const server = new ApolloServer({
  typeDefs,
  // @ts-ignore
  resolvers,
  context,
});
server.applyMiddleware({ app, cors: false });

app.get("/", (req, res) => {
  res.send("Hello");
});

(async () => {
  httpServer.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`🚀 Server ready at http://${APP_URL}${server.graphqlPath}`);
    // eslint-disable-next-line no-console
    console.log(
      `🚀 Subscriptions ready at ws://${APP_URL}${server.subscriptionsPath}`
    );
  });
})();
