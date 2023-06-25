# Ignite BookWise

![About this project](/public/About.jpg)

## Description

This repository contains the code for the Ignite BookWise project. BookWise is a web application built with [Next.js](https://nextjs.org/) framework, designed to provide an intuitive and interactive book management experience.

## Environment Variables

Before running the application, make sure to set up the environment variables. Copy the `.env.example` file to `.env` and fill in the required values. For OAuth login to work properly, provide valid environment variables for the corresponding OAuth providers. Refer to the documentation for [Google OAuth2](https://developers.google.com/identity/protocols/oauth2) and [Github OAuth2](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps) to obtain the necessary credentials.

## Running Locally

### Seeding the Database

To seed the database, run the following command:

```bash
  npx prisma db seed
```

### Running in Development Mode

To run the application in development mode, use the following command:

```bash
  npx npm run dev
```

## To do

- [ ] Switch from SQLite to PostgreSQL.
- [ ] Investigate and consider utilizing a SQL serverless free tier, such as Vercel Prostigres;
- [ ] Deploy the application to Vercel with CI/CD configuration

## Areas of Study

The project provides an opportunity to explore and learn various technologies and libraries, including:

- Testing methodologies.
- Internationalization (i18n) integration with NextJS.
- [T3 Stack](https://create.t3.gg/).
- Comparison of different databases.
- NextJS App vs Page router.

Feel free to dive into these areas to expand your knowledge and understanding of these technologies.
