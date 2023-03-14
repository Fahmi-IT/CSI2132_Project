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
hotel_id CHAR(5) NOT NULL,
name VARCHAR(30) NOT NULL,
address VARCHAR(50) NOT NULL UNIQUE,
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
hotel_id CHAR(5) NOT NULL,
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

/*
DROP TABLE hotel_chain;
DROP TABLE hotel;
DROP TABLE phone_numbers;
DROP TABLE contact_email_addresses;
DROP TABLE employee;
DROP TABLE customer;
DROP TABLE room;
DROP TABLE booking;
DROP TABLE renting;
*/

-- Inserting values into tables

-- Insert into hotel_chain
INSERT INTO hotel_chain VALUES ('Comfy Resort Corporation', 8, '23 Cronic Depression St, Ottawa, ON'),
							('Paradise Beach Inc', 8, '43 Trace Road, Ottawa, ON'),
                            ('Cosmopolitan Ltd', 8, 'Forest Hill Garden, Toronto, ON'),
                            ('Ocean River Corporation', 9, '40 Colten Union, Vancouver, BC'),
                            ('Green Palm Inc', 10, '32 Winifred Lodge, Montreal, QC');
                            
INSERT INTO hotel VALUES ('00001', 'Comfy Block 1', '22 Richmond St, Ottawa ON', 3.5, 'ComfyBlock1@gmail.com', '647-333-2314', 5, 'Richard Moon'),
						('00002', 'Comfy Block 2', '23 Richmond St, Ottawa ON', 3.8, 'ComfyBlock2@gmail.com', '647-131-2433', 5, 'James Rob'),
                        ('00003', 'Comfy Block 3', '24 Richmond St, Ottawa ON', 4.1, 'ComfyBlock3@gmail.com', '647-023-4951', 5, 'Stephanie Adn'),
                        ('00004', 'Comfy Hill 1', '43 Bonne Ave, Ottawa ON', 2.9, 'ComfyHill1@gmail.com', '647-224-0927', 5, 'John Won'),
                        ('00005', 'Comfy Hill 2', '44 Bonne Ave, Ottawa ON', 3.1, 'ComfyHill2@gmail.com', '252-341-3242', 5, 'Victor Ed'),
                        ('00006', 'Comfy Hill 3', '45 Bonne Ave, Ottawa ON', 1.9, 'ComfyHill3@gmail.com', '344-756-863', 5, 'Arjun Rin'),
                        ('00007', 'Comfy Hill 4', '46 Bonne Ave, Ottawa ON', 2.3, 'ComfyHill4@gmail.com', '111-111-2342', 5, 'Chota Yen'),
                        ('00008', 'Comfy Hill 5', '47 Bonne Ave, Ottawa ON', 2.8, 'ComfyHill5@gmail.com', '234-341-3321', 5, 'William Lin');
                       
INSERT INTO hotel VALUES ('00009', 'Paradise Block 1', '32 Houston Rd, Ottawa ON', 4.8, 'ParadiseBlock1@gmail.com', '641-690-3125', 5, 'John Liu'),
						('00010', 'Paradise Block 2', '33 Houston Rd, Ottawa ON', 4.1, 'ParadiseBlock2@gmail.com', '244-773-0131', 5, 'Alice Parker'),
                        ('00011', 'Paradise Block 3', '34 Houston Rd, Ottawa ON', 4.0, 'ParadiseBlock3@gmail.com', '521-294-4531', 5, 'James Smith'),
                        ('00012', 'Paradise Block 4', '35 Houston Rd, Ottawa ON', 4.8, 'ParadiseBlock4@gmail.com', '241-522-4235', 5, 'Jimmy Dao'),
                        ('00013', 'Paradise Block 5', '36 Houston Rd, Ottawa ON', 4.4, 'ParadiseBlock5@gmail.com', '352-642-2349', 5, 'Ron Fredrick'),
                        ('00014', 'Paradise Hill 1', '10 Sandy Hill Ave, Ottawa ON', 3.9, 'ParadiseHill1@gmail.com', '128-335-1418', 5, 'Victoria Son'),
                        ('00015', 'Paradise Hill 2', '11 Sandy Hill Ave, Ottawa ON', 4.0, 'ParadiseHill2@gmail.com', '293-121-2777', 5, 'Wilson Seu'),
                        ('00016', 'Paradise Hill 3', '12 Sandy Hill Ave, Ottawa ON', 4.1, 'ParadiseHill3@gmail.com', '238-326-1928', 5, 'Xin Drew');

INSERT INTO hotel VALUES ('00017', 'Cosmopolitan Inn 1', '22 Lake View St, Toronto ON', 4.5, 'CosmopolitanInn1@gmail.com', '647-931-3291', 5, 'Alison Ray'),
						('00018', 'Cosmopolitan Inn 2', '23 Lake View St, Toronto ON', 4.5, 'CosmopolitanInn2@gmail.com', '931-482-4442', 5, 'Brendon Liu'),
                        ('00019', 'Cosmopolitan Inn 3', '24 Lake View St, Toronto ON', 4.6, 'CosmopolitanInn3@gmail.com', '492-402-9371', 5, 'Susan Ann'),
                        ('00020', 'Cosmopolitan Inn 4', '25 Lake View St, Toronto ON', 4.2, 'CosmopolitanInn4@gmail.com', '410-414-4333', 5, 'Oman Son'),
                        ('00021', 'Cosmopolitan Inn 5', '26 Lake View St, Toronto ON', 3.9, 'CosmopolitanInn5@gmail.com', '422-333-4919', 5, 'Kristina Sven'),
                        ('00022', 'Cosmopolitan Inn 6', '27 Lake View St, Toronto ON', 4.1, 'CosmopolitanInn6@gmail.com', '239-222-6666', 5, 'Sophia James'),
                        ('00023', 'Cosmopolitan Inn 7', '28 Lake View St, Toronto ON', 4.2, 'CosmopolitanInn7@gmail.com', '123-456-7890', 5, 'Winston Fred'),
                        ('00024', 'Cosmopolitan Inn 8', '29 Lake View St, Toronto ON', 4.1, 'CosmopolitanInn8@gmail.com', '136-232-1232', 5, 'Miraya Park');


INSERT INTO hotel VALUES ('00025', 'Ocean Louge 1', '11 Colten Union, Vancouver BC', 2.2, 'OceanLouge1@gmail.com', '647-333-2314', 5, 'Ray Jin'),
						('00026', 'Ocean Louge 2', '12 Colten Union, Vancouver BC', 2.5, 'OceanLouge2@gmail.com', '647-131-2433', 5, 'Jay Singh'),
                        ('00027', 'Ocean Resort 1', '13 Colten Union, Vancouver BC', 2.8, 'OceanResort1@gmail.com', '332-383-1833', 5, 'Tanya Lan'),
                        ('00028', 'Ocean Resort 2', '14 Colten Union, Vancouver BC', 2.4, 'OceanResort2@gmail.com', '572-248-3333', 5, 'John Won'),
                        ('00029', 'Ocean Resort 3', '15 Colten Union, Vancouver BC', 2.7, 'OceanResort3@gmail.com', '174-385-4953', 5, 'Ali Paul'),
                        ('00030', 'Ocean Beach 1', '16 Colten Union, Vancouver BC', 3.1, 'OceanBeach1@gmail.com', '111-237-3843', 5, 'Donald Duck'),
                        ('00031', 'Ocean Beach 2', '17 Colten Union, Vancouver BC', 3.3, 'OceanBeach2@gmail.com', '193-453-0000', 5, 'Katherine Wills'),
                        ('00032', 'Ocean Beach 3', '18 Colten Union, Vancouver BC', 3.7, 'OceanBeach3@gmail.com', '248-384-1832', 5, 'Porter Gibbs'),
                        ('00033', 'Ocean Beach 4', '19 Colten Union, Vancouver BC', 3.0, 'OceanBeach4@gmail.com', '824-111-2321', 5, 'Zion Davenport');
                        

INSERT INTO hotel VALUES ('00034', 'Green Palm Suite 1', '60 Winifred Road, Montreal, QC', 3.3, 'GreenPalm1@gmail.com', '234-454-2913', 5, 'Lucas Klein'),
						('00035', 'Green Palm Suite 2', '61 Winifred Road, Montreal, QC', 3.5, 'GreenPalm2@gmail.com', '234-234-234', 5, 'Antony Nelson'),
                        ('00036', 'Green Palm Suite 3', '62 Winifred Road, Montreal, QC', 3.1, 'GreenPalm3@gmail.com', '235-345-2321', 5, 'Cindy Petty'),
                        ('00037', 'Green Palm Suite 4', '63 Winifred Road, Montreal, QC', 3.1, 'GreenPalm4@gmail.com', '283-123-2222', 5, 'Alexa Burch'),
                        ('00038', 'Green Palm Suite 5', '64 Winifred Road, Montreal, QC', 3.2, 'GreenPalm5@gmail.com', '234-324-8166', 5, 'John Dennis'),
                        ('00039', 'Green Palm Suite 6', '65 Winifred Road, Montreal, QC', 3.7, 'GreenPalm6@gmail.com', '647-349-3299', 5, 'Blake Landry'),
                        ('00040', 'Green Palm Suite 7', '66 Winifred Road, Montreal, QC', 3.9, 'GreenPalm7@gmail.com', '182-437-2732', 5, 'Clarissa Blair'),
                        ('00041', 'Green Palm Suite 8', '67 Winifred Road, Montreal, QC', 3.2, 'GreenPalm8@gmail.com', '123-324-2348', 5, 'Deshwan Wheeler'),
                        ('00042', 'Green Palm Suite 9', '68 Winifred Road, Montreal, QC', 3.5, 'GreenPalm9@gmail.com', '543-234-0912', 5, 'Brett Lin'),
                        ('00043', 'Green Palm Suite 10', '69 Winifred Road, Montreal, QC', 3.4, 'GreenPalm10@gmail.com', '234-345-971', 5, 'Harmony Griffin');


INSERT INTO phone_numbers VALUES ('Comfy Resort Corporation', '412-325-324'), 
								('Comfy Resort Corporation', '416-234-6876'),
                                ('Paradise Beach Inc', '231-000-3100'),
                                ('Paradise Beach Inc', '211-321-3019'),
                                ('Cosmopolitan Ltd', '123-539-1432'),
                                ('Cosmopolitan Ltd', '923-534-1249'),
                                ('Ocean River Corporation', '123-243-1243'),
                                ('Ocean River Corporation', '543-283-6750'),
                                ('Green Palm Inc', '234-351-2359'),
                                ('Green Palm Inc', '206-123-3509');
                                
INSERT INTO contact_email_addresses VALUES ('Comfy Resort Corporation', 'ComfyResort1@gmail.com'), 
								('Comfy Resort Corporation', 'ComfyResort2gmail.com'),
                                ('Paradise Beach Inc', 'ParadiseBeach1@gmail.com'),
                                ('Paradise Beach Inc', 'ParadiseBeach2@gmail.com'),
                                ('Cosmopolitan Ltd', 'CosmopolitanLtd1@gmail.com'),
                                ('Cosmopolitan Ltd', 'CosmopolitanLtd2@gmail.com'),
                                ('Ocean River Corporation', 'OceanRiver1@gmail.com'),
                                ('Ocean River Corporation', 'OceanRiver2@gmail.com'),
                                ('Green Palm Inc', 'GreenPalm1@gmail.com'),
                                ('Green Palm Inc', 'GreenPalm2@gmail.com');
                                

