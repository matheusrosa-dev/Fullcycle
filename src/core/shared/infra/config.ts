import { config as readEnv } from "dotenv";
import { join } from "path";
import { SequelizeOptions } from "sequelize-typescript";

export class Config {
  static env: any = null;

  static db() {
    Config.readEnv();

    return {
      dialect: "sqlite" as SequelizeOptions["dialect"],
      storage: Config.env.DB_STORAGE,
      logging: Config.env.DB_LOGGING === "true",
    };
  }

  static readEnv() {
    if (Config.env) {
      return;
    }

    Config.env = readEnv({
      path: join(__dirname, `../../../../envs/.env.${process.env.NODE_ENV}`),
    }).parsed;
  }
}
