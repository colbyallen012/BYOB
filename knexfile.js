module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/nflarrests',
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds'
    },
    useNullAsDefault: true
  }

};
