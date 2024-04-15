import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import express from "express";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import db from "./lib/datasource";
import { CountryResolver } from "./resolvers/CountryResolver";

async function main() {
  const app = express();
  await db.initialize();

  const schema = await buildSchema({
    resolvers: [CountryResolver],
  });

  const server = new ApolloServer({ schema });

  await server.start();
  const expressMW = expressMiddleware(server);
  app.use(express.json(), expressMW);
  const PORT = 4000;
  app.listen(PORT, () =>
    console.info(`Server is running, GraphQL Playground available at ${PORT}`)
  );
}

main().catch((err) => {
  console.error(err);
});
