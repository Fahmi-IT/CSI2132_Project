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
  const createRoom = (body) => {
    return new Promise(function(resolve, reject) {
      const { name, email } = body
      pool.query('', [name, email], (error, results) => {
        if (error) {
          reject(error)
        }
        resolve(`A new Room has been added added: ${results.rows[0]}`)
      })
    })
  }
  const deleteRoom = () => {
    return new Promise(function(resolve, reject) {
      const id = parseInt(request.params.id)
      pool.query('', [id], (error, results) => {
        if (error) {
          reject(error)
        }
        resolve(`Room deleted with ID: ${Room_ID}`)
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
  
  module.exports = {
    getRooms,
    createRoom,
    deleteRoom,
    getHotels,
    getHotelChains, 
    getBookings, 
  }