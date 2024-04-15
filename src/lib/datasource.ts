import * as dotenv from "dotenv";
import { DataSource } from "typeorm";

import Country from "../entity/Country";

dotenv.config();

const db = new DataSource({
  type: "sqlite",
  database: "country.sqlite",
  entities: [Country],
  synchronize: true,
});

export default db;
