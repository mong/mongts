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

### Authentication for github npm registry

The @mong/material-ui npm package is in a private repository, you need to authenitcate to install or upgrade it. To achieve this create a personal access token (classic) on github that has the **`read:packages`** scope and configure pnpm to use it.

See [Authenticating to GitHub Packages](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-npm-registry#authenticating-to-github-packages) for details.

#### Summary

1. Create a Personal Access Token (classic).
2. Go to [github.com/settings/tokens](https://github.com/settings/tokens).
3. Click **Generate new token (classic)**.
4. Give the token a descriptive name and select the **`read:packages`** scope.
5. Configure pnpm with youtoken to use GitHub Packages.

#### Configure pnpm for @mong packages
pnpm no longer accepts enviroment variable expansion for auth tokens, so to configure it for authentication you add a `.npmrc` file in you home folder or add the npm configuration to pnpm. **NB** the .npmrc file in the project root is for CI and does not contain a enviroment based token. CI grabs it from github-secrets

```ini
#### .npmrc
@mong:registry=https://npm.pkg.github.com
```

```ini
#### pnpm 
pnpm config set "//npm.pkg.github.com/:_authToken" "YOUR_AUTH_TOKEN (as plaintext)"
```

See [GitHub documentation on personal access tokens](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#creating-a-personal-access-token-classic) and [pnpm authentication settings](https://pnpm.io/npmrc) for more details.

> **Important:** Never commit your token to version control. Add it to pnpm or add a .npmrc file to your home folder. ![Uploading SkdeThemeProvider.svg…]()


### Run and develop it locally

You need an SSH key in order to clone the repository. Follow the directions [here](https://docs.github.com/en/authentication/connecting-to-github-with-ssh) for making a new key and adding it to your Github account.

Install the [nvm package](https://github.com/nvm-sh/nvm) by running the command `wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.4/install.sh | bash`. Then run `nvm install 24` to update to the current node version.

Make a classic Github token in order to get access to the component library. 

Run the development server:

```bash
nvm use # To pick (and install) correct (major) version of node
export NODE_AUTH_TOKEN=[your token]
export NEXT_PUBLIC_API_HOST="https://prod-api.skde.org" # Our API in production
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


### Build static page and run it locally

In production we build static html files that we serve in an S3 bucket on AWS. To reproduce this locally you can

```bash
export NEXT_PUBLIC_API_HOST="https://prod-api.skde.org" # Our API in production
pnpm install
pnpm export
npx serve apps/skde/out
```

### Build and run the API container

The Docker build needs the monorepo root as its context so it can copy
`apps/api/` and `packages/types/` before building the image.

It's importaint that these commands are run from the repository root, not from `apps/api/`.

Build and run api docker-container:
```bash
DOCKER_BUILDKIT=1 docker build -t api -f apps/api/Dockerfile .
docker run --rm -e ORIGIN="somestring" -p 3030:80 api
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

feat: ✨ A new feature for the application.
fix: 🐛 A bug fix that solves a problem.
docs: 📚 Changes only to documentation (like README files or guides).
style: 💄 Changes that do not affect code logic, like formatting, semicolons, or whitespace.
refactor: ♻️ A code change that improves structure but doesn't add a feature or fix a bug.
test: 🧪 Adding new tests or correcting existing ones.
chore: 🔧 Regular maintenance tasks that don't affect the app's code directly (e.g., updating dependencies, build process changes).
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
