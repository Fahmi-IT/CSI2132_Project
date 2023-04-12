const { Client } = require("pg");
const express = require("express");

const app = express();
const port = 3000;

const client = new Client({
  host: "localhost",
  user: "postgres",
  port: 5432,
  password: "Gr8Expectat1ons",
  database: "postgres",
});

client.connect();
