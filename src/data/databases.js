import { sqlData } from './db_sql';
import { nosqlData } from './db_nosql';
import { postgresData } from './db_postgres';
import { redisData } from './db_redis';

export const databasesData = [
  sqlData,
  nosqlData,
  postgresData,
  redisData
];
