## Requirements

- JDK 18
- Node.js 16 / npm 7+
- Postgres 12

Make sure `JAVA_HOME` env variable points to correct JDK location

## Setting the database

- Create postgres user `root` with password `root`. Or change user credentials in `src/main/resources/application.properties` (do not commit your credentials)
- Create database `qaguru`

## Running backend

```shell
./mvnw spring-boot:run
```

## Running frontend

```shell
cd frontend
npm run dev
```

## Running husky (frontend)

```shell
cd frontend
yarn run husky
```
