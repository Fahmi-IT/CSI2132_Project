const { createPool } = require("mysql");

const pool = createPool({
  host: "localhost",
  user: "root",
  password: "password",
  connectionLimit: 10,
});
