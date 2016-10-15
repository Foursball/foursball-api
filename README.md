# Foursball REST API

[![Build Status](https://travis-ci.org/Foursball/foursball-api.svg?branch=master)](https://travis-ci.org/Foursball/foursball-api)
[![Docker Pulls](https://img.shields.io/docker/pulls/foursball/foursball-api.svg)](https://hub.docker.com/r/foursball/foursball-api/)

Rest API for Foursball

## Running

Clone and run with the following commands:

```bash
npm install -g sails
git clone https://github.com/Foursball/foursball-api.git
cd foursball-api
sails lift
```

Then navigate to <http://127.0.0.1:1337>. **NOTE:** Please read the OAuth section below to configure the authentication providers.

## OAuth

This app uses OAuth for authentication. Any combination of GitHub, Google, and Twitter can be used, but the OAuth application properties must be passed in. Create a [Google app](https://cloud.google.com/console#/project), [GitHub app](https://github.com/settings/applications/new), and/or [Twitter app](https://apps.twitter.com/app/new). Make sure to use the full URL you will use to run this app during configuration.

Once the apps have been created you need to pass in the Client ID and Client Secret variables as the following environment variables:

- **GitHub** - GITHUB_ID, GITHUB_SECRET
- **Google** - GOOGLE_ID, GOOGLE_SECRET
- **Twitter** - TWITTER_KEY, TWITTER_SECRET

Finally, pass in the **SERVER_URL** variable as the full URL of your application.

### Local Dev

For easier local dev you can copy /config/oauth.js to /config/local.js (which is under .gitignore) and replace the OAuth variables with you application credentials. This removes the need to run the app with the OAuth environment variables every time.

## Running in Docker

Docker is the easiest way to run the **Foursball REST API**. Run with `docker run -d -p 80:80 foursball/foursball-api`. The OAuth environment variables are ommited from the `docker run` command, so add them in once you have followed the above instructions (e.g. `docker run -d -e GITHUB_ID=[my-id] -e GITHUB_SECRET=[my-secret] -e SERVER_URL=http://127.0.0.1 -p 80:80 foursball-api`).

## Running with MySQL

The default database is on disk, so it is recommended to run the **Foursball REST API** with a MySQL DB in production. Use the following environment variables:

- MYSQL_HOST (MySQL will be used as the datastore if this is supplied)
- MYSQL_USER (default: sails)
- MYSQL_PASSWORD (default: sails)
- MYSQL_DB (default: sails)

The easiest way to run a MySQL instance is to run it in Docker using the following command:

```bash
docker run -d -p 3306:3306 -e MYSQL_DATABASE=sails -e MYSQL_USER=sails -e MYSQL_PASSWORD=sails -e MYSQL_RANDOM_ROOT_PASSWORD=true mysql
```
