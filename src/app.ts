import express, { Application, Request, Response, NextFunction } from "express";
import { GraphQLServer } from "graphql-yoga";
import "reflect-metadata";

import path from "path";
import bodyParser from "body-parser";
import cors from "cors";

import { buildSchema } from "type-graphql";

// import schema from "./schemas/schema";
import ProjectResolver from "./resolvers/ProjectResolver";
import TaskResolver from "./resolvers/TaskResolver";
const app: Application = express();
const port = process.env.PORT || 5000;

const publicPath = path.join(__dirname, "../client/dist");
app.use(express.static(publicPath));
//bodyparser middleware
app.use(bodyParser.json());
app.use(cors({ origin: "*" }));
async function bootstrap() {
  const schema = await buildSchema({
    resolvers: [ProjectResolver, TaskResolver],
    emitSchemaFile: true
  });
  const server = new GraphQLServer({
    schema
  });

  server.start(() => console.log("GraphQl Yoga  is running on http://localhost:4000"));
}
bootstrap();
app.get("/", (req: Request, res: Response) => {
  res.sendFile(path.join(publicPath, "index.html"));
});

app.listen(port, () => {
  console.log("App listening on port 5000");
});
