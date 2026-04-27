<!-- badges: start -->

[![CodeQL](https://github.com/mong/mongts/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/mong/mongts/actions/workflows/codeql-analysis.yml)
[![Deploy app to Azure](https://github.com/mong/mongts/actions/workflows/azure_deploy.yml/badge.svg)](https://github.com/mong/mongts/actions/workflows/azure_deploy.yml)
[![Node.js CI](https://github.com/mong/mongts/actions/workflows/node.js.yml/badge.svg)](https://github.com/mong/mongts/actions/workflows/node.js.yml)
[![Codecov test coverage](https://codecov.io/gh/mong/mongts/branch/develop/graph/badge.svg)](https://codecov.io/gh/mong/mongts?branch=develop)
[![GitHub open issues](https://img.shields.io/github/issues/mong/mongts.svg)](https://github.com/mong/mongts/issues)
[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)

<!-- badges: end -->

This is the [Next.js](https://nextjs.org/) app behind [apps.skde.no](https://apps.skde.no/) and the API.

## Development

There is two long-lived branches in this repository: `main` and `develop`. All changes to `main` will update [apps.skde.no](https://apps.skde.no/) and [verify.skde.no](https://verify.skde.no/). All changes to `develop` will update [test.skde.no](https://test.skde.no/).

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

You need an SSH key in order to clone the repository. Follow the directions [here](https://docs.github.com/en/authentication/connecting-to-github-with-ssh) for making a new key and adding it to your Github account.

Install the [nvm package](https://github.com/nvm-sh/nvm) by running the command `wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.4/install.sh | bash`. Then run `nvm install 24` to update to the current node version.

Install [yarn](https://yarnpkg.com/getting-started/install) by running the command `npm install -g corepack`

Run the development server:

```bash
nvm use # To pick (and install) correct (major) version of node
corepack enable # To enable yarn > v1
yarn install
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Build static page and run it locally

In production we build static html files that we serve in an S3 bucket on AWS. To reproduce this locally you can

```bash
export NEXT_PUBLIC_API_HOST="https://prod-api.skde.org" # Our API in production
yarn install
yarn export
npx serve apps/skde/out
```

### Commit without `--no-verify`

This repository is set up with a hook that will run linting on staged files when you commit. You will therefore often end up with the following error:

```
$ git commit -m "some message"
✔ Preparing lint-staged...
⚠ Running tasks for staged files...
  ❯ .lintstagedrc — 1 file
    ↓ *.+(js|ts|tsx) — no files
    ❯ **/*.+(js|jsx|ts|tsx|json|html|yml|yaml|css|md) — 1 file
      ✖ prettier --write [EACCES]
↓ Skipped because of errors from tasks.
✔ Reverting to original state because of errors...
✔ Cleaning up temporary files...

✖ prettier --write failed without output (EACCES).
husky - pre-commit script failed (code 1)
```

It might help running `npx husky` (or `yarn prepare`).

---

### Conventional Commits

Conventional Commits is a specification for adding human and machine readable meaning to commit messages

It is a prerequisite for automatic CHANGELOG and releases with [Release Please](https://github.com/marketplace/actions/release-please-action).

It works by scanning the commit history to figure out if a new release should be created and which changes it should include since the previous release. For this to work commit messages must follow [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) and is enforced by `husky` and [commitlint](https://commitlint.js.org/).

We **highly** recommend using squash-merges when merging pull requests. A linear git history makes it much easier to:

- **Follow history** — commits are sorted by merge date and are not interleaved between pull requests
- **Find and revert bugs** — `git bisect` is useful for tracking down which change introduced a bug
- **Control the changelog** — commit messages that only make sense within a PR's context (e.g. a fix for a bug introduced earlier in the same PR) will not pollute the release notes
- **Keep a clean main branch** — with red/green development, merge commits can leave points in history where tests do not pass

#### Basic syntax

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### Allowed types

`build`, `chore`, `ci`, `docs`, `feat`, `fix`, `perf`, `refactor`, `revert`, `style`, `test`

**Tip:** Write commit messages as if pre worded with "This will..." — e.g. `feat(button): add loading state to landing page` would be "This will add loading state to landing page"

#### Version bumps by commit message

| Commit type                                | Version bump            | Example                             |
| ------------------------------------------ | ----------------------- | ----------------------------------- |
| `fix: ...`                                 | Patch (`1.0.6 → 1.0.7`) | `fix: correct button border radius` |
| `feat: ...`                                | Minor (`1.0.6 → 1.1.0`) | `feat(button): add loading state`   |
| `feat!: ...` or `BREAKING CHANGE:` in body | Major (`1.0.6 → 2.0.0`) | `feat!: drop React 18 support`      |

---

### Releases

Releases are automated via a [Release Please](https://github.com/googleapis/release-please) GitHub Action. When commits are merged to `main`, it opens a PR with a version bump and an updated **CHANGELOG.md**. The version bump follows SemVer and is determined automatically from the commit types in the commit history.

> **Note:** The PR can be closed if you want to delay the release to add more changes later.

When a commit or merge is done on the main branch, the release-please action-workflow is run and a new release is created along with any [other features](https://github.com/googleapis/release-please/blob/main/docs/manifest-releaser.md) defined in the release-please manifest.

Current and previous releases: [github.com/mong/material-ui/releases](https://github.com/mong/material-ui/releases)

#### Manually trigger a release or override the version

If the repo is `private` this will requires a `GITHUB_TOKEN` with **`write:packages`** scope (and `delete:packages` to delete versions).

Push an empty commit to `main` with `Release-As: x.x.x` in the commit body. Additional changelog entries can be appended as extra `-m` arguments:

```bash
# Minimal
git commit --allow-empty -m "chore: release 2.0.0" -m "Release-As: 2.0.0"

# With extra changelog entries not already in the commit history
git commit --allow-empty -m "chore: release 2.0.0" -m "Release-As: 2.0.0" -m "feat: add i18n support" -m "docs: update README.md"
```
