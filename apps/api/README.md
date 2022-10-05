# mong-api

The API used by [qmongjs](https://github.com/mong/qmongjs) to get data.

## Kjøre lokalt

Starte mysql for at mong-api skal få tak i data (for mer informasjon, se [her](https://mong.github.io/#/utvikling?id=kj%c3%b8re-database-lokalt)):

```sh
sudo systemctl start mysqld
```

Starte opp `mong-api`:

```sh
yarn install
yarn start # start opp api på http://localhost:4000, som qmongjs kan bruke
```
