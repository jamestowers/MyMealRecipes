# Project Starter: API

This is a node js project tht runs MYSQL database with Docker and Prisma JS, [check out the Prisma docs here](https://www.prisma.io/docs/)

## Setup
Start the database
`docker-compose up`

---

## Installation
### Install dependencies
`npm run install`

### Generate API client
`npm run prisma:generate`

### Run database migrations
`npm run prisma:migrate`

---
## Start the server
`npm run dev`

---
## Reset the database
>  This is destrcutive and will wipe all data in the database!

`npm run prisma:DANGER:reset`
