# api

API brukt av [www.skde.no](https://www.skde.no/) for å få tak i kvalitetsregister-data.

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

## Kjøre Dockerfile lokalt

```sh
yarn install
yarn build
docker build -t api .
docker run -e ORIGIN="somestring" -p 3030:80 api # Kjører ikke hvis ORIGIN ikke defineres som en miljøvariabel
```
