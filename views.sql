/* CSI2132 Course Project | View Implementation in SQL | University of Ottawa
-- Group 1: Fahmi Ahmed (300250180), Rahul Atre (300250370), Dana Shayakhmetova (300255907)
-- This File contains the SQL Code for Views 
-- Data of Submission: 11/04/2023
*/

-- View 1: Number of Available Rooms Per Area (Assume area refers to looking at same address {e.g. city})
CREATE VIEW available_rooms_per_area AS
SELECT h.address, COUNT(*) AS available_rooms
FROM hotel h JOIN room r ON h.hotel_ID = r.hotel_ID
GROUP BY address;


-- View 2: Capacity of All Rooms of a Specific Hotel
CREATE VIEW capacity_of_all_rooms AS
SELECT h.name as hotel_name, r.room_number, r.capacity AS total_capacity_of_room
FROM hotel h JOIN room r ON h.hotel_ID = r.hotel_ID
WHERE h.hotel_ID='00001';