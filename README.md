# Choose My Recipes

## Description

When planning meals for the week we struggle to think of what to cook despite having a regular staple of meals that we cook all the time. I've alwyas wanted to have a list of them so that we can either choose one at random or based on specific ingredients that we have in the house already.

We also often end up with surplus ingredients because, for example, courgettes come in in packs of two and a recipe only needs one so it would be good to suggest two meals that include courgettes. Or whatever is in season.

# Todo
## Stage 1
- [ ] List of meals with:
  -  Title
  -  Recipe link / location (ie. book)
  -  Ingredients list (with autocomplete when adding editing meals)
  -  Child friendly boolean
  -  Approx. cooking time
- [ ] Select a recipe at random
- [ ] Select a recipe based on ingredients

## Stage 2
- User accounts

## Stage 3
- React Native app



---

# Development

This is a node js project that runs MYSQL database with Docker and Prisma JS, [check out the Prisma docs here](https://www.prisma.io/docs/)
## Setup
Start the database
`docker-compose up`

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


## TODO:
- Set up auth: [Passwordless Authentication and Authorization](https://www.prisma.io/blog/backend-prisma-typescript-orm-with-postgresql-auth-mngp1ps7kip4)
