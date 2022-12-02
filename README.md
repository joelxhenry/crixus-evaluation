
## Getting Started


To run development sever run:
```bash
npm run dev
```
The database was configured to execute on a postgresql database provider, however this can be easily configured by updating the prisma/prisma.schema file
```bash
datasource db {
  provider = 'postgresql'|'sqlserver'|'mysql'|'mongodb'|'cockroachdb'
  ...
}
```
Before migrating update the DATABASE_URL environment variable,
to migrate the database schema run:
```bash
npm run prisma:migrate dev
```







