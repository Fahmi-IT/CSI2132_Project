-- Database Project Implementation
-- Group 1: Fahmi Ahmed, Rahul Atre, Dana Shayakhmetova

-- Schema for Hotel Chain
CREATE TABLE hotel_chain (
name VARCHAR(30) NOT NULL,
-- phone_number CHAR(12) NOT NULL UNIQUE => Multivalued table 
number_of_hotels INTEGER NOT NULL CHECK (number_of_hotels > 0),
central_office_address VARCHAR(30) NOT NULL UNIQUE, 
-- contact_email_address VARCHAR(30) NOT NULL UNIQUE, => Multivalued table 
PRIMARY KEY (name)
);

-- Schema for multivalued-attribute phone_number
CREATE TABLE phone_numbers (
name VARCHAR(30) NOT NULL,
phone_number CHAR(12) NOT NULL UNIQUE,
FOREIGN KEY(name) REFERENCES hotel_chain(name)
 );
 
-- Schema for multivalued-attribute contact_email_address
CREATE TABLE contact_email_addresses (
name VARCHAR(30) NOT NULL,
contact_email_address VARCHAR(30) NOT NULL UNIQUE,  
FOREIGN KEY(name) REFERENCES hotel_chain(name)
);

-- Schema for Hotel
CREATE TABLE hotel (
hotel_id VARCHAR(5) NOT NULL,
name VARCHAR(30) NOT NULL,
address VARCHAR(30) NOT NULL UNIQUE,
star_rating NUMERIC(1,1) CHECK (star_rating BETWEEN 0 AND 5),
contact_email VARCHAR(30) NOT NULL,
phone_number CHAR(12) NOT NULL UNIQUE,
number_of_rooms INTEGER NOT NULL CHECK (number_of_rooms > 0),
manager VARCHAR(15) UNIQUE NOT NULL,
PRIMARY KEY (hotel_id),
FOREIGN KEY(name) REFERENCES hotel_chain(name)
);

-- Schema for Employee
CREATE TABLE employee (
SSN CHAR(9) NOT NULL,
address VARCHAR(30) NOT NULL,
full_name VARCHAR(40) NOT NULL,
position VARCHAR(25) NOT NULL,
hotel_id VARCHAR(5) NOT NULL,
PRIMARY KEY(SSN),
FOREIGN KEY(hotel_id) REFERENCES hotel(hotel_id) 
);

-- Schema for Customer
CREATE TABLE customer (
customer_ID CHAR(9) NOT NULL,
address VARCHAR(30) NOT NULL,
full_name VARCHAR(40) NOT NULL, 
date_of_registration DATE NOT NULL,
PRIMARY KEY(customer_ID)
);

-- Schema for Booking
CREATE TABLE booking (
booking_ID CHAR(5) NOT NULL,
room_number INTEGER NOT NULL,
start_date DATE NOT NULL,
end_date DATE NOT NULL,
customer_ID CHAR(9) NOT NULL,
PRIMARY KEY(booking_id),
FOREIGN KEY(room_number) REFERENCES room(room_number),
FOREIGN KEY(customer_ID) REFERENCES customer(customer_ID)
);

-- Schema for Renting
CREATE TABLE renting (
room_number INTEGER NOT NULL,
check_in_date DATE NOT NULL,
check_out_date DATE NOT NULL,
booking_ID CHAR(5) NOT NULL,
customer_ID CHAR(9) NOT NULL,
FOREIGN KEY(room_number) REFERENCES room(room_number),
FOREIGN KEY(booking_id) REFERENCES booking(booking_id),
FOREIGN KEY(customer_ID) REFERENCES customer(customer_ID)
);

-- Schema for Room 
CREATE TABLE room (
room_number INTEGER NOT NULL CHECK (room_number > 0),
price_per_night NUMERIC(4,2) NOT NULL CHECK (price_per_night > 0),
amenities VARCHAR(40) NOT NULL,
capacity INTEGER NOT NULL CHECK (capacity > 0),
view BOOLEAN NOT NULL,
extendable BOOLEAN NOT NULL,
problems VARCHAR(40),
name VARCHAR(30) NOT NULL,
PRIMARY KEY(room_number),
FOREIGN KEY(name) REFERENCES hotel(name)
);



