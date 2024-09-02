## Description

Star wars api based on NestJS + AWS

## Project setup

```bash
$ git clone https://github.com/Mavannkas/star-wars.git
$ cd star-wars
$ npm install
```

## Environment variables

Create a .env based on .env.template and sam-env.json based on sam-env.template.json

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## AWS sam

To start local api

```bash
$ npm run sam:local
```

To build api to AWS
```bash
$ npm run sam:build
```

To deploy api to AWS
```bash
$ npm run sam:deploy
```
## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
