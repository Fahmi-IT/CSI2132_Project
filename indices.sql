/* CSI2132 Course Project | SQL INDEXES | University of Ottawa
-- Group 1: Fahmi Ahmed (300250180), Rahul Atre (300250370), Dana Shayakhmetova (300255907)
-- This File implements three indexes on the relations of our database
-- Data of Submission: 11/04/2023
*/


CREATE INDEX booking_ID ON Booking(booking_ID);

CREATE INDEX duration_of_stay ON  Booking(start_date,end_date);

CREATE INDEX amenities ON  Room(amenities);

/*--------------------------------Data for Testing Purposes--------------------------------*/

-- INSERT INTO hotel_chain VALUES ('Comfy Resort Corporation', 8, 'Depression,Ottawa');

-- INSERT INTO hotel VALUES ('00001', 'Comfy Resort Corporation', '22 Richmond St, Ottawa ON', 0, 'ComfyBlock1@gmail.com', '647-333-2314', 5, 'Richard Moon');

-- INSERT INTO Room VALUES
-- (1, 1.22, "Wifi", 2, False, True, "None",'00001'),
-- (2, 2, "Parking", 3, False, False, "None",'00001'),
-- (3, 3, "Wifi and Parking", 4, False, True, "None",'00001');

-- INSERT INTO Customer VALUES (123456789, "sparks st", "Peter Parker", '2023-03-31');

-- INSERT INTO Booking VALUES 
-- (12345, 1, '2023-03-31', '2023-04-12', 123456789),
-- (12346, 2, '2023-04-30', '2023-05-12', 123456789),
-- (12347, 3, '2023-05-31', '2023-06-12', 123456789);


-- Testing duration of stay index  
-- SELECT * FROM Booking WHERE start_date <= '2023-03-31' AND end_date >= '2023-04-12';


-- Testing duration of amenities index 
-- SELECT * FROM Room WHERE amenities LIKE '%WiFi%';

-- Testing duration of booking index 
-- SELECT * FROM Booking WHERE booking_ID = 12345;

