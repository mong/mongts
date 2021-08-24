This is the [Next.js](https://nextjs.org/) app behind [www.skde.no](https://www.skde.no/) front page and news section, while the repository [mong/qmongjs](https://github.com/mong/qmongjs) is behind the subpage [www.skde.no/kvalitetsregistre](https://www.skde.no/kvalitetsregistre/alle/sykehus).

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

Changes directly commited to the `main` branch (for instance new *News* posts) have to be merged into the `develop` branch:

```bash
git checkout develop
git fetch origin main:main
git merge --no-ff main
git push
```

### Run and develop it locally

Run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.
