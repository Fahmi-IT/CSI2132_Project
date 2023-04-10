//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// GENERAL STUFF
const express = require("express");
const mysql = require("mysql2");
const app = express();
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "DanaRoot5!",
  database: "MyLittleSchema",
});

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const cors = require("cors");
app.use(express.json());
app.use(cors());

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// INSERTING CUSTOMERS IE REGISTER PAGE
app.get("/getCustomers", (req, res) => {
  const sql = "SELECT * FROM customer";
  db.query(sql, (err, results) => {
    if (err) return res.json({ error: err.message });
    return res.json(results);
  });
});

app.post("/customers", (req, res) => {
  let customer = req.body;
  // customer.customer_ID = Math.floor(Math.random() * 10000);
  customer.date_of_registration = new Date();
  console.log(customer);
  const sql =
    "INSERT INTO customer (SSN, address, full_name, date_of_registration) VALUES (?, ?, ?, ?);";
  const values = [
    // customer.customer_ID,
    customer.SSN,
    customer.address,
    customer.full_name,
    customer.date_of_registration,
    // new Date().toJSON().slice(0, 19).replace("T", " "),
  ];

  db.query(sql, values, (err, results) => {
    if (err) return res.json({ error: err.message });
    return res.json(results);
  });
});

// CHECKING IF CUSTOMER EXISTS IE SIGN IN PAGE
app.post("/signIn", (req, res) => {
  let customer = req.body;
  console.log(customer);
  const sql =
    "SELECT COUNT(full_name) FROM customer WHERE SSN =" + customer.SSN;

  db.query(sql, (err, results) => {
    console.log("Query results:", results);
    const count = results[0]["COUNT(full_name)"];
    console.log("Count:", count);
    if (err) return res.json({ error: err.message });
    return res.json(results);
  });
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// CHECKING IF EMPLOYEE EXISTS IE SIGN IN PAGE
app.post("/signInEmp", (req, res) => {
  let customer = req.body;
  console.log(customer);
  const sql =
    "SELECT COUNT(full_name) FROM employee WHERE SSN =" + customer.SSN;

  db.query(sql, (err, results) => {
    console.log("Query results:", results);
    const count = results[0]["COUNT(full_name)"];
    console.log("Count:", count);
    if (err) return res.json({ error: err.message });
    return res.json(results);
  });
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// GRAB INFO ABOUT A CUSTOMER
app.post("/getCustomerSettings", (req, res) => {
  let customer2 = req.body;
  // console.log("The SSN of customer is " + customer2.SSN);
  const sql =
    "SELECT SSN, address, full_name, date_of_registration FROM customer WHERE SSN = " +
    customer2.SSN;
  db.query(sql, (err, results) => {
    if (err) return res.json({ error: err.message });
    console.log(results);
    return res.json(results);
  });
});

// GRAB INFO ABOUT A EMPLOYEE
app.post("/getEmployeeSettings", (req, res) => {
  let employee = req.body;
  const sql =
    "SELECT SSN, address, full_name, position, hotel_ID FROM employee WHERE SSN = " +
    employee.SSN;
  db.query(sql, (err, results) => {
    if (err) return res.json({ error: err.message });
    console.log(results);
    return res.json(results);
  });
});

app.get("/", (req, res) => {
  const sql = "SELECT * FROM room";
  db.query(sql, (err, results) => {
    if (err) return res.json({ error: err.message });
    return res.json(results);
  });
});

app.get("/hotel", (req, res) => {
  const sql = "SELECT * FROM hotel";
  db.query(sql, (err, results) => {
    if (err) return res.json({ error: err.message });
    return res.json(results);
  });
});

app.get("/hotel_chain", (req, res) => {
  const sql = "SELECT * FROM hotel_chain";
  db.query(sql, (err, results) => {
    if (err) return res.json({ error: err.message });
    return res.json(results);
  });
});

app.get("/bookings", (req, res) => {
  const sql = "SELECT * FROM booking";
  db.query(sql, (err, results) => {
    if (err) return res.json({ error: err.message });
    return res.json(results);
  });
});

// UPDATE INFO ABOUT EMPLOYEE
app.put("/updateEmployee", (req, res) => {
  let employee = req.body;
  console.log("here ya go " + employee.full_name);
  const sql =
    "UPDATE employee SET address = '" +
    employee.address +
    "', full_name = '" +
    employee.full_name +
    "', position = '" +
    employee.position +
    "' WHERE SSN = " +
    employee.SSN;
  db.query(sql, (err, results) => {
    if (err) return res.json({ error: err.message });
    console.log(results);
    return res.json(results);
  });
});

// UPDATE INFO ABOUT CUSTOMER
app.put("/updateCustomer", (req, res) => {
  let customer = req.body;
  console.log("here ya go " + customer.full_name);
  const sql =
    "UPDATE customer SET address = '" +
    customer.address +
    "', full_name = '" +
    customer.full_name +
    "' WHERE SSN = " +
    customer.SSN;
  db.query(sql, (err, results) => {
    if (err) return res.json({ error: err.message });
    console.log(results);
    return res.json(results);
  });
});

// GET A CUSTOMER'S BOOKINGS
app.post("/getCusBookings", (req, res) => {
  let customer2 = req.body;
  // console.log("The SSN of customer is " + customer2.SSN);
  const sql =
    "SELECT * FROM booking WHERE customer_ID = (SELECT customer_ID FROM customer WHERE SSN = " +
    customer2.SSN +
    ")";
  db.query(sql, (err, results) => {
    if (err) return res.json({ error: err.message });
    console.log(results);
    return res.json(results);
  });
});

// GET ALL BOOKINGS (EMPLOYEE)
app.get("/getBookings", (req, res) => {
  const sql = "SELECT * FROM booking";
  db.query(sql, (err, results) => {
    if (err) return res.json({ error: err.message });
    return res.json(results);
  });
});

app.get("/rentings", (req, res) => {
  const sql = "SELECT * FROM renting";
  db.query(sql, (err, results) => {
    if (err) return res.json({ error: err.message });
    return res.json(results);
  });
});

// MAKE A RENTING
app.post("/insertRenting", (req, res) => {
  let renting = req.body;
  console.log(renting.room_number);
  console.log(renting.check_in_date);
  console.log(renting.check_out_date);
  console.log(renting.booking_ID);
  console.log(renting.customer_ID);

  const sql =
    "INSERT INTO renting (room_number, check_in_date, check_out_date, booking_ID, customer_ID) VALUES (?, ?, ?, ?, ?);";
  const values = [
    renting.room_number,
    renting.check_in_date,
    renting.check_out_date,
    renting.booking_ID,
    renting.customer_ID,
  ];
  db.query(sql, values, (err, results) => {
    if (err) return res.json({ error: err.message });
    console.log(results);
    return res.json(results);
  });
});

app.post("/bookingsMake", (req, res) => {
  let booking = req.body;
  console.log(booking);
  const sql =
    "INSERT INTO booking (booking_ID, room_number, start_date, end_date, customer_ID) VALUES (?, ?, ?, ?, ?);";
  const values = [
    booking.booking_ID,
    booking.room_number,
    new Date(booking.start_date.toString()),
    new Date(booking.end_date.toString()),
    booking.customer_id,
  ];

  db.query(sql, values, (err, results) => {
    if (err) return res.json({ error: err.message });
    return res.json(results);
  });
});

// UPDATE HOTEL INFO
app.put("/updateHotel", (req, res) => {
  let hotelInfo = req.body;
  const sql =
    "UPDATE hotel SET address = '" +
    hotelInfo.address +
    "', star_rating = '" +
    hotelInfo.star_rating +
    "', contact_email = '" +
    hotelInfo.contact_email +
    "', number_of_rooms = '" +
    hotelInfo.number_of_rooms +
    "', manager = '" +
    hotelInfo.manager +
    "' WHERE hotel_ID = " +
    hotelInfo.hotel_ID;
  db.query(sql, (err, results) => {
    if (err) return res.json({ error: err.message });
    console.log(results);
    return res.json(results);
  });
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// GENERAL STUFF PT2
app.listen(3001, () => {
  console.log(`Server running on port 3001`);
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// WORKS but not as efficient as above
// Keep the below code
// app.post("/insert", (req, res) => {
//   const body = req.body;
//   body.customer_ID = Math.floor(Math.random() * 10000);
//   body.date_of_registration = new Date();
//   const sql = `INSERT INTO customer (customer_ID, SSN, address, full_name, date_of_registration) VALUES (?, ?, ?, ?, ?)`;
//   const values = [
//     body.customer_ID,
//     body.SSN,
//     body.address,
//     body.full_name,
//     body.date_of_registration,
//   ];

//   db.query(sql, values, (error, results) => {
//     if (error) {
//       console.log(body);
//       console.error("Error executing query: " + error.stack);
//       res.status(500).send("Error adding customer");
//       return;
//     }

//     console.log("Query results:", results);
//     res.status(200).send("Customer added successfully");
//   });
// });

// app.post("/check", (req, res) => {
//   const body = req.body;
//   const sql = `SELECT COUNT(full_name) FROM customer WHERE SSN = ` + body.SSN;

//   db.query(sql, (error, results) => {
//     if (error) {
//       console.log(body);
//       console.error("Error executing query: " + error.stack);
//       res.status(500).send("Error adding customer");
//       return;
//     }

//     console.log("Query results:", results);
//     const count = results[0]["COUNT(full_name)"];
//     console.log("Count:", count);
//     res.status(200).send("Customer existence checked successfully");
//   });
// });

// app.listen(3001, () => {
//   console.log("Server started on port 3001");
// });

// Testing routes
// app.get("/select", (req, res) => {
//   db.query("SELECT * from customer", (error, results) => {
//     if (error) {
//       console.error("Error executing query: " + error.stack);
//       res.status(500).send("Error adding customer");
//       return;
//     }
//     console.log("Query results:", results);
//     res.status(200).send("Customers viewed successfully");
//   });
// });

// app.get("/", (req, res) => {
//   res.send("hello from root");
// });
