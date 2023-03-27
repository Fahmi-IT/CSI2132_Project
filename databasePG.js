const {Client} = require('pg')

const client = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "Gr8Expectat1ons",
    database: "postgres"
})

client.connect();

client.query('SELECT * FROM hotel_chain', (err, res) => {
    if (!err) {
        console.log(res.rows);
    } else {
        console.log(err.message);
    }
    client.end;
})