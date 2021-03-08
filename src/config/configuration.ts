export default () => ({
    port: parseInt(process.env.PORT) || 3000,
    database: {
      host: process.env.SQL_HOST,
      port: parseInt(process.env.SQL_PORT) || 3306,
      db: process.env.SQL_DB,
      user: process.env.SQL_USER,
      password: process.env.SQL_PASS,
    }
  });