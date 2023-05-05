## Overview

This is a starter template using the following stack:


- Framework - [Next.js 13](https://nextjs.org/13)
- Language - [TypeScript](https://www.typescriptlang.org)
- Auth - [NextAuth.js](https://next-auth.js.org)
- Database - [Supabase](https://supabase.com)
- Deployment - [Vercel](https://vercel.com/docs/concepts/next.js/overview)
- Styling - [Tailwind CSS](https://tailwindcss.com)
- Components - [Tremor](https://www.tremor.so)
- Analytics - [Vercel Analytics](https://vercel.com/analytics)
- Linting - [ESLint](https://eslint.org)
- Formatting - [Prettier](https://prettier.io)

This template uses the new `app` directory in Next.js 13 (beta). This includes support for enhanced layouts, colocation of components, tests, and styles, component-level data fetching, and more.

## Getting Started

Run `yarn` to install dependencies.

Copy the `.env.example` file to `.env.local` and add the missing values

> TODO: Make this use AWS Secrets Manager 

Run `yarn dev` to start the development server.

---

## Development

Once you have the application running, you can start developing.
The application will be available locally at [http://localhost:3000](http://localhost:3000)

### Database
This is using Supabase for all database operations.
The database is configured to use the `postgres` database, and the `public` schema.
Read the [Supabase docs](https://supabase.io/docs) for more information.

### Authentication
This is using NextAuth.js for authentication via Auth0
The Supabase JWT is genereated from the Auth0 JWT
Read the [NextAuth.js docs](https://authjs.dev) for more information.

### Hierarchy
The application is structured in a way that makes it easy to understand and maintain.


#### Components
Components are located in the `components` directory. These are the building blocks of the application.
They should be as "dumb" as possible and not contain any logic, since their responsibility is 
to render the UI.

Some example components are:
- `Button`
- `Table`

Note that the table component is only responsible for rendering the table, and not fetching data from the database.

#### Modules
Modules are located in the `modules` directory. These are the business logic of the application, and should be responsible for
fetching data from the database, and passing it to the components.
If you need to fetch, transform, or pass data to a component, it should be in a module.

#### Lib
Libraries is located in the `lib` directory. These are the helper functions for the application, and datasources for re-use across different modules.
`supabase.ts` is the datasource for the Supabase database.
You can install the supabase cli locally and run `supabase gen types typescript --project-id [ProjectID] > lib/database.types.ts` to generate the types for the database.


### Pages & Routing
The application uses the Next.js "app" routing system.
This means that the `app` directory is used for all pages.

> To create a new page, add a new directory to the to `app` directory with the name of the desired route.
> If the route is `/about`, then the directory should be `app/about`.
>
> Inside the directory, create an `page.tsx` file. This is the page component.
> Page components are SSR rendered by default.

### Styling
This application uses Tailwind CSS for styling. The `tailwind.config.js` file is located in the root of the project if adjustments are needed.
