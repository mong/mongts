# api

The API used by [apps.skde.no/kvalitetsregistre](https://apps.skde.no/kvalitetsregistre/alle/sykehus/) to get data.

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

Dette gjøres på roten av repoet.

```sh
docker build -t api -f apps/api/Dockerfile .
docker run -e ORIGIN="somestring" -p 3030:80 api # Kjører ikke hvis ORIGIN ikke defineres som en miljøvariabel
```

Hvis man ønsker å teste spørring mot lokal database kan man enkelt gjøre det ved å bruke docker-compose-fila til imongr.
