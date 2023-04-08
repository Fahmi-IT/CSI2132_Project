const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'Gr8Expectat1ons',
  port: 5432,
});

const path = require('path')
const express = require('express')
const app = express()

const funcs = require('./funcs')

const PORT = process.env.PORT || 3001

app.use(express.static(path.resolve(__dirname, '../client/build')))
app.use(express.json())
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
  next();
});

app.get('/', (req, res) => {
  funcs.getRooms()
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.get('/hotel', (req, res) => {
  funcs.getHotels()
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.get('/hotel_chain', (req, res) => {
  funcs.getHotelChains()
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.get('/bookings', (req, res) => {
  funcs.getBookings()
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.get('/getCustomers', (req, res) => {
  funcs.getCustomers()
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`)
})
