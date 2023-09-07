<!-- badges: start -->

[![CodeQL](https://github.com/mong/mongts/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/mong/mongts/actions/workflows/codeql-analysis.yml)
[![Deploy app to AWS](https://github.com/mong/mongts/actions/workflows/aws_deploy.yml/badge.svg)](https://github.com/mong/mongts/actions/workflows/aws_deploy.yml)
[![Node.js CI](https://github.com/mong/mongts/actions/workflows/node.js.yml/badge.svg)](https://github.com/mong/mongts/actions/workflows/node.js.yml)
[![Codecov test coverage](https://codecov.io/gh/mong/mongts/branch/develop/graph/badge.svg)](https://codecov.io/gh/mong/mongts?branch=develop)
[![GitHub open issues](https://img.shields.io/github/issues/mong/mongts.svg)](https://github.com/mong/mongts/issues)
[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)

<!-- badges: end -->

This is the [Next.js](https://nextjs.org/) app behind [www.skde.no](https://www.skde.no/) and the API.

## Development

There is two long-lived branches in this repository: `main` and `develop`. All changes to `main` will update [www.skde.no](https://www.skde.no/) and [verify.skde.no](https://verify.skde.no/). All changes to `develop` will update [test.skde.no](https://test.skde.no/).

New features and changes goes into the `develop` branch through a _Pull Request_ (PR). Before these changes go into the `main` branch, the webpage [test.skde.no](https://test.skde.no/) has to be checked for errors.

The `develop` branch will then be merged into the `main` branch with

```bash
git checkout main
git fetch origin develop:develop
git merge develop
git push
```

Changes directly commited to the `main` branch (for instance new _News_ posts) have to be merged into the `develop` branch:

```bash
git checkout develop
git fetch origin main:main
git merge main
git push
```

### Run and develop it locally

Run the development server:

```bash
nvm use
yarn install
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Build static page and run it locally

In production we build static html files that we serve in an S3 bucket on AWS. To reproduce this locally you can

```bash
export NEXT_PUBLIC_API_HOST="https://prod-mong-api.skde.org" # Our API in production
yarn install
yarn export
npx serve apps/skde/out
```

### Run CMS locally

Start up `decap-server`:

```bash
yarn run cms
```

Run the SKDE web site (in another terminal):

```bash
yarn run dev
```

Open the admin page: http://localhost:3000/helseatlas/admin
