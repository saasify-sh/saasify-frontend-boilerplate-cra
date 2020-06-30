<p align="center">
  <a href="https://saasify.sh" title="Saasify">
    <img src="https://raw.githubusercontent.com/saasify-sh/saasify/master/logo-vert-white@4x.png" alt="Saasify Logo" width="256" />
  </a>
</p>

[![Build Status](https://travis-ci.com/saasify-sh/saasify-frontend-boilerplate-cra.svg?branch=master)](https://travis-ci.com/saasify-sh/saasify-frontend-boilerplate-cra) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

# Saasify Frontend Boilerplate

> CRA frontend boilerplate for [Saasify](https://saasify.sh) products.

## Overview

If you're just getting started with Saasify, we recommend using the built-in "SaaS-in-a-box" frontend. It's less customizable, but it's also much quicker to get off the ground.

Once you're ready for more customization, this boilerplate gives you have full control over your product's frontend.

Some common use cases include:

- Customizing your product's landing page and marketing.
- Deploying your product's webapp to be hosted on a custom domain.
- Adding custom UX to the webapp once a user is signed up.

Note that if you decide to customize your product's frontend using this boilerplate, your product will still be integrated with Saasify in order to handle user accounts, subscription billing, and Saasify's API proxy that sits in front of your product's backend.

## Architecture

This **React** webapp uses a slightly customized version of [create-react-app](https://create-react-app.dev).

The main libraries it uses include:

- [react-saasify](https://github.com/saasify-sh/saasify/tree/master/packages/react-saasify) - Provides reusable SaaS components that are linked to your Saasify project.
- [antd](https://3x.ant.design/docs/react/introduce) - Ant Design v3.
- [react-router](https://reacttraining.com/react-router/web/guides/quick-start) - React Router v5.
- [mobx](https://mobx.js.org) - Simple state management for React.

In general, these libraries shouldn't prevent you from using other options. They're just used to construct the "SaaS chrome" for the website. You have full control over the contents of that website and are free to use whatever NPM or React libraries you'd like.

## Getting Started

In order to connect this template to your Saasify project, change `$SAASIFY_DEPLOYMENT_ID` in `package.json` to the ID of your Saasify deployment.

Once you've updated this ID, run `yarn update-deployment` (or `npm run update-deployment`).

This will download the latest version of your Saasify project's config and store it as [src/lib/deployment.json](./src/lib/deployment.json).

Every time you want to update this project with your latest Saasify deployment, just re-run this command to keep them in sync.

We recommend integrating this step into your build process, possibly via a `prebuild` npm script.

## Examples

Let's say that you have a Saasify project called `dev/hello-world` and your want to always use your latest published deployment.

You would update your package.json `scripts` to look like this:

```json
{
  "update-deployment": "saasify get dev/hello-world -o src/lib/deployment.json"
}
```

This will implicitly use `dev/hello-world@latest` which will always point to your **latest published deployment**.

If your want to instead use your most recent deployment while in development, your can set your deployment ID as follows:

```json
{
  "update-deployment": "saasify get dev/hello-world@dev -o src/lib/deployment.json"
}
```

Your could also use the `@c83487f1` syntax to specify a particular deployment. For example:

```json
{
  "update-deployment": "saasify get dev/hello-world@c83487f1 -o src/lib/deployment.json"
}
```

## Hosting

Aside from making sure that your Saasify deployment's config is up-to-date, this project is a pretty standard CRA webapp.

You can build your site statically via `yarn build` and deploy this static bundle (under `build/`) to Vercel, Netlify, GitHub Pages, S3, etc.

## Customizations

You'll likely want to start off by customizing [src/App.js](./src/App.js) which holds the application's root React component.

Some common changes you may want to consider:

- Remove the `Docs` page. This page is useful for API-first SaaS products, but if your product doesn't expose a public API, then we recommend removing it.
  - You'll also want to remove the links to `/docs` in the `App.js` config.
  - You can also remove these dependencies: `@saasify/redoc` and `swagger-ui-react`.
- Customize your support email via find & replace `support@reacher.email`.
- Customize the various CTAs from "Get Started" to a CTA more in line with your product's onboarding.
- By default, we include all third-party auth pages for Google, GitHub, Twitter, etc. Feel free to remove all of the auth pages you won't be using.
- It is very common to want to change the logged in user experience.
  - We recommend starting from [DashboardPage.js](./src/pages/DashboardPage/DashboardPage.js).
  - This is the default page where users are redirected after signup and checkout.
- Add custom `meta` tags and `title` to [index.html](./public/index.html).
- Change the default [favicon](./public).

## License

MIT © [Saasify](https://saasify.sh)
