# Flapper

A freeform alternative to GraphQL for Gatsby.

The repository contains the development site (`/site`) that could automatically load packages (`packages`) thanks to [yarn workspaces](https://classic.yarnpkg.com/en/docs/workspaces/).

## Content

### Packages

|                                Package                                 | Summary                                                         |                                                                    Version                                                                     |
| :--------------------------------------------------------------------: | :-------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------: |
| [Gatsby Source Flapper Plugin](/packages/gatsby-source-flapper#readme) | plugin providing freeform alternative to Gatsby's GraphQL model | [![npm version](https://badge.fury.io/js/%40flapper%2Fgatsby-source-flapper.svg)](https://badge.fury.io/js/%40flapper%2Fgatsby-source-flapper) |

### Site

-   [Development Site](/site#readme) - Site using for development purposes and code examples showcasing packages possibilities

### Examples

Coming soon.

## Development

### Prerequisites

-   [Nodejs](https://nodejs.org/en/)
-   [Yarn](https://yarnpkg.com/) - **[npm](https://www.npmjs.com/) is not supported for development**, due to lack of workspaces support.

### Install

1. Install packages

    ```sh
    yarn # install all npm dependencies in the repository
    ```

2. Start watch mode packages

    ```sh
    yarn build # build all packages
    ```

3. Run development site

    ```sh
    yarn develop:site # run `gatsby develop` command in the development site
    ```

Now you are good to go. You could start browsing <http://localhost:8000> for development site and <http://localhost:8000/___graphql> for [GraphiQL explorer](https://github.com/graphql/graphiql/blob/master/packages/graphiql/README.md).

### Build

To build all of the packages as well as a development site, you could use one command.

```sh
yarn build # run build script in all packages as well as in the development site
```

-   Packages are using [ESLint](https://eslint.org/) with Typescript plugins for linting.

## Publishing

As a publishing framework, there is a [Lerna](https://github.com/lerna/lerna) framework set up. This package is using [Independent mode](https://github.com/lerna/lerna#independent-mode).

### How to publish new version

If you have the rights to publish packages, just use [`lerna`](https://github.com/lerna/lerna/tree/master/commands/publish#readme) and specify the version when prompted. All the changes made by lerna are automatically committed.

A typical scenario is when everything is ready and you want to publish the version, just use command.

```sh
npx lerna publish --tag-version-prefix=''
```

That should summarize the publish information and prompt you to define the version number and acknowledge the publish. Once everything is OK and you acknowledge the publish:

-   the new version is published to npm
-   `<YOUR VERSION>` is set to [`lerna.json`'s `version`](lerna.json)
-   commit with this change (and package.json files version changes) is pushed to the repository
-   commit also contains tag `<YOUR VERSION>` that could be used for creating GitHub release if you want

:bulb: If you want to test out the beta version first (which is recommended) use following command and if everything is OK, release another patch version as the final version.

```sh
npx lerna publish --tag-version-prefix='' --dist-tag=beta
```
