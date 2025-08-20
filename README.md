# Nebula

## Purpose

This project is intended to be a Typescript based REST API template for any services that we may be creating.

## Prerequisites

- Node
- Yarn
- A PSQL Database

## Setup

1. Create a `.env` file with the required fields as shown in the `.env.example`.
2. Ensure you run `yarn`

## Technologies

### Fastify

REST API Framework

### Drizzle

ORM and Database Manager

- Creating a Migration
  Make sure your new table is exported from the `schema.ts` file in the database folder.

```sh
npx drizzle-kit generate
```

- Applying the Migration

```sh
npx drizzle-kit migrate
```
