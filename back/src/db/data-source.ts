import { DataSource } from 'typeorm';
import { config } from 'dotenv';

config();

const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [`dist/**/*.entity.js`],
  migrations: [__dirname + '/migrations/**/*.ts'],
  metadataTableName: 'migrations',
  synchronize: false,
});

export default AppDataSource;