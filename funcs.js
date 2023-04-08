const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'Gr8Expectat1ons',
  port: 5432,
});

const getRooms = () => {
    return new Promise(function(resolve, reject) {
      pool.query('SELECT * FROM room', (error, results) => {
        if (error) {
          reject(error)
        }
        resolve(results.rows);
      })
    }) 
  }
  const getHotels = () => {
    return new Promise(function(resolve, reject) {
      pool.query('SELECT * FROM hotel', (error, results) => {
        if (error) {
          reject(error)
        }
        resolve(results.rows);
      })
    }) 
  }
  const getHotelChains = () => {
    return new Promise(function(resolve, reject) {
      pool.query('SELECT * FROM hotel_chain', (error, results) => {
        if (error) {
          reject(error)
        }
        resolve(results.rows);
      })
    }) 
  }
  const getBookings = () => {
    return new Promise(function(resolve, reject) {
      pool.query('SELECT * FROM booking', (error, results) => {
        if (error) {
          reject(error)
        }
        resolve(results.rows);
      })
    }) 
  }
  const getCustomers = () => {
    return new Promise(function(resolve, reject) {
      pool.query('SELECT * FROM customer', (error, results) => {
        if (error) {
          reject(error)
        }
        resolve(results.rows);
      })
    }) 
  }

  module.exports = {
    getRooms,
    getHotels,
    getHotelChains, 
    getBookings,
    getCustomers,
  }