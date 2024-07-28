import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'Jaspal@123',
  database: 'hackathon',
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/migrations/**/*.js'],
  migrationsTransactionMode: 'all',
  migrationsRun: false,
  synchronize: true,
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
