# api

The API used by [www.skde.no/kvalitetsregistre](https://www.skde.no/kvalitetsregistre/alle/sykehus/) to get data.

## Kjøre lokalt

Starte mysql for at api skal få tak i data (for mer informasjon, se [her](https://mong.github.io/#/utvikling?id=kj%c3%b8re-database-lokalt)):

```sh
sudo systemctl start mysqld
```

Starte opp `api`:

```sh
yarn install
yarn start # start opp api på http://localhost:4000, som qmongjs kan bruke
```
