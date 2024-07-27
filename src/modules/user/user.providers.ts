import { DataSource, Repository } from 'typeorm';
import { User } from './user.entity';

export const userProviders = [
  {
    provide: User,
    useFactory: <Entity>(dataSource: DataSource): Repository<Entity> =>
      dataSource.getRepository<Entity>(User),
    inject: [DataSource],
  },
];
