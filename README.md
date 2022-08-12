<!-- badges: start -->

[![CodeQL](https://github.com/mong/mongts/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/mong/mongts/actions/workflows/codeql-analysis.yml)
[![Deploy app to AWS](https://github.com/mong/mongts/actions/workflows/aws_deploy.yml/badge.svg)](https://github.com/mong/mongts/actions/workflows/aws_deploy.yml)
[![Node.js CI](https://github.com/mong/mongts/actions/workflows/node.js.yml/badge.svg)](https://github.com/mong/mongts/actions/workflows/node.js.yml)
[![Codecov test coverage](https://codecov.io/gh/mong/mongts/branch/develop/graph/badge.svg)](https://codecov.io/gh/mong/mongts?branch=develop)
[![GitHub open issues](https://img.shields.io/github/issues/mong/mongts.svg)](https://github.com/mong/mongts/issues)
[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)

<!-- badges: end -->

This is the [Next.js](https://nextjs.org/) app behind [www.skde.no](https://www.skde.no/) front page.

The repository [mong/qmongjs](https://github.com/mong/qmongjs) is behind the subpage [www.skde.no/kvalitetsregistre](https://www.skde.no/kvalitetsregistre/alle/sykehus) and .

## Development

There is two long-lived branches in this repository: `main` and `develop`. All changes to `main` will update [www.skde.no](https://www.skde.no/) and [verify.skde.no](https://verify.skde.no/). All changes to `develop` will update [qa.skde.no](https://qa.skde.no/).

New features and changes goes into the `develop` branch through a _Pull Request_ (PR). Before these changes go into the `main` branch, the webpage [qa.skde.no](https://qa.skde.no/) has to be checked for errors.

The `develop` branch will then be merged into the `main` branch with

```bash
git checkout main
git fetch origin develop:develop
git merge --no-ff develop
git push
```

Changes directly commited to the `main` branch (for instance new _News_ posts) have to be merged into the `develop` branch:

```bash
git checkout develop
git fetch origin main:main
git merge main # with fast forward, if possible
git push
```

### Run and develop it locally

Run the development server:

```bash
yarn install
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Build static page and run it locally

In production we build static html files that we serve in an S3 bucket on AWS. To reproduce this locally you can

```bash
yarn export
npx serve out
```

If you want to mimic the full site you have to build [hamongts](https://github.com/mong/hamongts) and [qmongjs](https://github.com/mong/qmongjs) as well. The output from these builds have to be copied into `helseatlas` and `kvalitetsregistre` folders inside the `out` folder. In other words:

```bash
# build mongts
yarn install && yarn export
# build hamongts, which is also a nextjs-app
cd ../hamongts
yarn install && yarn export
cp -r out ../mongts/out/helseatlas
# build qmongjs, which is a create-react-app
cd ../qmongjs
yarn install && yarn build
cp -r build ../mongts/out/kvalitetsregistre
# go back and serve the full site
cd ../mongts
npx serve out
```

If the last step is not working, make sure you have the latest version of `serve` installed (it did not work with `serve` version `12.0.1`).

Be aware, the `helseatlas` and `kvalitetsregistre` folders will be overwritten the next time you do a `yarn export`.
