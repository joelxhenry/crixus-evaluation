
## Getting Started

First, install all packages and dependencies:
```bash
npm install
```
Run the development server:
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
Before migrating update the DATABASE_URL environment variable
To migrate the database schema run the following:
```bash
npm run prisma:migrate dev
```







