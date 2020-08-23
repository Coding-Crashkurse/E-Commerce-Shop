# E-Commerce-Shop

Example of a VueJS Frontend backed up by a Python based Flask REST-Api
This is on purpose a basic example with a few items to set the focus on the technological aspects of combining VueJS with Flask.

## Installation

To be able to use this Repository, you need to setup a SQL Database like PostgreSQL or MySQL. I use a PostgreSQL Database running on a remote machine on Digital Ocean. You can also use a database locally installed.

```
git clone https://github.com/Data-Mastery/E-Commerce-Shop.git
cd E-Commerce-Shop/
pipenv install # Installs packages from pipenv file
pipenv shell # Enter virtual environment
python app.py #Start API (development) server
```

After starting the API Server, you can start the Vue App in development mode.

```
cd ./frontend
npm run serve
```

Open browser on http://localhost:8080
