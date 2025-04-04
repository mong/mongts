// Update with your config settings.

import { Knex } from "knex";

const connections: { [env: string]: Knex.Config } = {
  test: {
    client: "sqlite3",
    connection: {
      filename: "./dev.sqlite3",
    },
  },
  development: {
    client: "mysql2",
    connection: {
      host: "127.0.0.1",
      port: Number(process.env.DB_PORT) || 3306,
      user: "imongr",
      password: "imongr",
      database: "imongr",
    },
  },
  production: {
    client: "mysql2",
    connection: {
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      user: process.env.DB_USR,
      password: process.env.DB_PWD,
    },
    pool: {
      min: 2,
      max: 10,
    },
  },
};

export default connections;
