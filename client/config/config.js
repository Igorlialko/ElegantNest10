module.exports = {
  development: {
    username: 'default',
    password: 'ILmFZy8qMl2P',
    database: 'verceldb',
    host: 'ep-dark-bread-26237154-pooler.eu-central-1.postgres.vercel-storage.com',
    dialect: "postgres",
    "ssl":true,
    "dialectOptions":{
      "ssl":{
        "require":true
      }
    }
  },
  test: {
    username: 'default',
    password: 'ILmFZy8qMl2P',
    database: 'verceldb',
    host: 'ep-dark-bread-26237154-pooler.eu-central-1.postgres.vercel-storage.com',
    dialect: "postgres",
  },
  production: {
    username: 'default',
    password: 'ILmFZy8qMl2P',
    database: 'verceldb',
    host: 'ep-dark-bread-26237154-pooler.eu-central-1.postgres.vercel-storage.com',
    dialect: "postgres",
  }
}