## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```


### FOR TYPEORM
- syncronize must be set to false
- ts-node must be installed


### ormconfig.json
```json
{
    "type": "postgres",
    "host": "localhost",
    "port": 5432,
    "username": "cezarmocanu",
    "password": "123456",
    "database": "authorization",
    "migrationsTableName": "migrations",
    "entities": ["dist/**/*.entity.{ts,js}"],
    "migrations": ["dist/migrations/*.{ts,js}"],
    "cli": {
        "migrationsDir": "src/migrations",
        "entitiesDir": "src/**"
    }
}
```

```json
...pacakge.json scripts
"typeorm": "node --require ./node_modules/ts-node/register ./node_modules/typeorm/cli.js",
"orm:run": "npm run build && npm run typeorm migration:run",
"orm:generate": "npm run build && npm run typeorm migration:generate -- -n ",
"orm:create": "npm run build && npm run typeorm migration:create -- -n ",
"orm:r": "npm run build && npm run typeorm migration:run",
"orm:g": "npm run build && npm run typeorm migration:generate -- -n ",
"orm:c": "npm run build && npm run typeorm migration:create -- -n "
```

#### Example
npm run migration:generate -- createUserEntity