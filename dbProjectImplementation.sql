/* CSI2132 Course Project | Database Implementation in SQL | University of Ottawa
-- Group 1: Fahmi Ahmed (300250180), Rahul Atre (300250370), Dana Shayakhmetova (300255907)
-- This File is a List of DDLs that Create our Database Functionality 
-- Data of Submission: 11/04/2023
*/

/*------------------------------------------------------CREATE TABLES------------------------------------------------------*/

-- Schema for Hotel Chain
CREATE TABLE hotel_chain (
name VARCHAR(30) NOT NULL,
number_of_hotels INTEGER NOT NULL CHECK (number_of_hotels > 0),
central_office_address VARCHAR(50) NOT NULL UNIQUE, 
PRIMARY KEY (name)
);

-- Schema for multivalued-attribute phone_number
CREATE TABLE phone_numbers (
name VARCHAR(30) NOT NULL,
phone_number CHAR(12) NOT NULL UNIQUE,
FOREIGN KEY(name) REFERENCES hotel_chain(name) ON DELETE CASCADE ON UPDATE CASCADE
 );
 
-- Schema for multivalued-attribute contact_email_address
CREATE TABLE contact_email_addresses (
name VARCHAR(30) NOT NULL,
contact_email_address VARCHAR(30) NOT NULL UNIQUE,  
FOREIGN KEY(name) REFERENCES hotel_chain(name) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Schema for Hotel
CREATE TABLE hotel (
hotel_ID CHAR(5) NOT NULL,
name VARCHAR(30) NOT NULL,
address VARCHAR(50) NOT NULL UNIQUE,
star_rating NUMERIC(2,1) CHECK (star_rating BETWEEN 0 AND 5),
contact_email VARCHAR(30) NOT NULL UNIQUE,
phone_number CHAR(12) NOT NULL UNIQUE,
number_of_rooms INTEGER NOT NULL CHECK (number_of_rooms > 0),
manager VARCHAR(15) UNIQUE NOT NULL,
PRIMARY KEY (hotel_ID),
FOREIGN KEY(name) REFERENCES hotel_chain(name) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Schema for Employee
CREATE TABLE employee (
SSN CHAR(11) NOT NULL, 
address VARCHAR(50) NOT NULL,
full_name VARCHAR(40) NOT NULL,
position VARCHAR(25) NOT NULL,
hotel_ID CHAR(5) NOT NULL,
PRIMARY KEY(SSN),
FOREIGN KEY(hotel_ID) REFERENCES hotel(hotel_ID) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Schema for Customer
CREATE TABLE customer (
customer_ID INT NOT NULL AUTO_INCREMENT, -- Storage of SSN is temporary | When a Customer signs up -> generate a customer_ID 
SSN CHAR(9) NOT NULL, 
address VARCHAR(30) NOT NULL,
full_name VARCHAR(40) NOT NULL, 
date_of_registration DATE NOT NULL,
PRIMARY KEY(customer_ID)
);

-- Schema for Room 
CREATE TABLE room (
room_number INTEGER NOT NULL CHECK (room_number > 0),
price_per_night NUMERIC(5,2) NOT NULL CHECK (price_per_night > 0),
amenities VARCHAR(100) NOT NULL,
capacity INTEGER NOT NULL CHECK (capacity > 0),
view BOOLEAN NOT NULL,
extendable BOOLEAN NOT NULL,
problems VARCHAR(50),
hotel_ID CHAR(5) NOT NULL,
PRIMARY KEY(room_number),
FOREIGN KEY(hotel_ID) REFERENCES hotel(hotel_ID) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Schema for Booking
CREATE TABLE booking (
booking_ID CHAR(10) NOT NULL,
room_number INTEGER NOT NULL,
start_date DATE NOT NULL,
end_date DATE NOT NULL,
customer_ID INT NOT NULL,
PRIMARY KEY(booking_id),
FOREIGN KEY(room_number) REFERENCES room(room_number) ON DELETE CASCADE ON UPDATE CASCADE, 
FOREIGN KEY(customer_ID) REFERENCES customer(customer_ID) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Schema for Renting
CREATE TABLE renting (
room_number INTEGER NOT NULL,
check_in_date DATE NOT NULL,
check_out_date DATE NOT NULL,
booking_ID CHAR(10) NOT NULL,
customer_ID INT NOT NULL,
FOREIGN KEY(room_number) REFERENCES room(room_number) ON DELETE CASCADE ON UPDATE CASCADE,
FOREIGN KEY(booking_ID) REFERENCES booking(booking_ID) ON DELETE CASCADE ON UPDATE CASCADE,
FOREIGN KEY(customer_ID) REFERENCES customer(customer_ID) ON DELETE CASCADE ON UPDATE CASCADE
);


/*------------------------------------------------------INSERT DATA INTO TABLES------------------------------------------------------*/

-- Insert into hotel_chain
INSERT INTO hotel_chain VALUES ('Comfy Resort Corporation', 8, '23 Cronic Depression St, Ottawa ON'),
							('Paradise Beach Inc', 8, '43 Trace Road, Ottawa ON'),
                            ('Cosmopolitan Ltd', 8, 'Forest Hill Garden, Toronto ON'),
                            ('Ocean River Corporation', 9, '40 Colten Union, Vancouver BC'),
                            ('Green Palm Inc', 10, '32 Winifred Lodge, Montreal QC');

-- Insert into hotel                           
INSERT INTO hotel VALUES ('00001', 'Comfy Resort Corporation', '22 Richmond St, Ottawa ON', 3.5, 'ComfyBlock1@gmail.com', '647-333-2314', 5, 'Richard Moon'),
						('00002', 'Comfy Resort Corporation', '23 Richmond St, Ottawa ON', 3.8, 'ComfyBlock2@gmail.com', '647-131-2433', 5, 'James Rob'),
                        ('00003', 'Comfy Resort Corporation', '24 Richmond St, Ottawa ON', 4.1, 'ComfyBlock3@gmail.com', '647-023-4951', 5, 'Stephanie Adn'),
                        ('00004', 'Comfy Resort Corporation', '43 Bonne Ave, Ottawa ON', 2.9, 'ComfyHill1@gmail.com', '647-224-0927', 5, 'John Won'),
                        ('00005', 'Comfy Resort Corporation', '44 Bonne Ave, Ottawa ON', 3.1, 'ComfyHill2@gmail.com', '252-341-3242', 5, 'Victor Ed'),
                        ('00006', 'Comfy Resort Corporation', '45 Bonne Ave, Ottawa ON', 1.9, 'ComfyHill3@gmail.com', '344-756-863', 5, 'Arjun Rin'),
                        ('00007', 'Comfy Resort Corporation', '46 Bonne Ave, Ottawa ON', 2.3, 'ComfyHill4@gmail.com', '111-111-2342', 5, 'Chota Yen'),
                        ('00008', 'Comfy Resort Corporation', '47 Bonne Ave, Ottawa ON', 2.8, 'ComfyHill5@gmail.com', '234-341-3321', 5, 'William Lin');
                       
INSERT INTO hotel VALUES ('00009', 'Paradise Beach Inc', '32 Houston Rd, Ottawa ON', 4.8, 'ParadiseBlock1@gmail.com', '641-690-3125', 5, 'John Liu'),
						('00010', 'Paradise Beach Inc', '33 Houston Rd, Ottawa ON', 4.1, 'ParadiseBlock2@gmail.com', '244-773-0131', 5, 'Alice Parker'),
                        ('00011', 'Paradise Beach Inc', '34 Houston Rd, Ottawa ON', 4.0, 'ParadiseBlock3@gmail.com', '521-294-4531', 5, 'James Smith'),
                        ('00012', 'Paradise Beach Inc', '35 Houston Rd, Ottawa ON', 4.8, 'ParadiseBlock4@gmail.com', '241-522-4235', 5, 'Jimmy Dao'),
                        ('00013', 'Paradise Beach Inc', '36 Houston Rd, Ottawa ON', 4.4, 'ParadiseBlock5@gmail.com', '352-642-2349', 5, 'Ron Fredrick'),
                        ('00014', 'Paradise Beach Inc', '10 Sandy Hill Ave, Ottawa ON', 3.9, 'ParadiseHill1@gmail.com', '128-335-1418', 5, 'Victoria Son'),
                        ('00015', 'Paradise Beach Inc', '11 Sandy Hill Ave, Ottawa ON', 4.0, 'ParadiseHill2@gmail.com', '293-121-2777', 5, 'Wilson Seu'),
                        ('00016', 'Paradise Beach Inc', '12 Sandy Hill Ave, Ottawa ON', 4.1, 'ParadiseHill3@gmail.com', '238-326-1928', 5, 'Xin Drew');

INSERT INTO hotel VALUES ('00017', 'Cosmopolitan Ltd', '22 Lake View St, Toronto ON', 4.5, 'CosmopolitanInn1@gmail.com', '647-931-3291', 5, 'Alison Ray'),
						('00018', 'Cosmopolitan Ltd', '23 Lake View St, Toronto ON', 4.5, 'CosmopolitanInn2@gmail.com', '931-482-4442', 5, 'Brendon Liu'),
                        ('00019', 'Cosmopolitan Ltd', '24 Lake View St, Toronto ON', 4.6, 'CosmopolitanInn3@gmail.com', '492-402-9371', 5, 'Susan Ann'),
                        ('00020', 'Cosmopolitan Ltd', '25 Lake View St, Toronto ON', 4.2, 'CosmopolitanInn4@gmail.com', '410-414-4333', 5, 'Oman Son'),
                        ('00021', 'Cosmopolitan Ltd', '26 Lake View St, Toronto ON', 3.9, 'CosmopolitanInn5@gmail.com', '422-333-4919', 5, 'Kristina Sven'),
                        ('00022', 'Cosmopolitan Ltd', '27 Lake View St, Toronto ON', 4.1, 'CosmopolitanInn6@gmail.com', '239-222-6666', 5, 'Sophia James'),
                        ('00023', 'Cosmopolitan Ltd', '28 Lake View St, Toronto ON', 4.2, 'CosmopolitanInn7@gmail.com', '123-456-7890', 5, 'Winston Fred'),
                        ('00024', 'Cosmopolitan Ltd', '29 Lake View St, Toronto ON', 4.1, 'CosmopolitanInn8@gmail.com', '136-232-1232', 5, 'Miraya Park');

INSERT INTO hotel VALUES ('00025', 'Ocean River Corporation', '11 Colten Union, Vancouver BC', 2.2, 'OceanLouge1@gmail.com', '647-333-2927', 5, 'Ray Jin'),
						('00026', 'Ocean River Corporation', '12 Colten Union, Vancouver BC', 2.5, 'OceanLouge2@gmail.com', '189-131-2433', 5, 'Jay Singh'),
                        ('00027', 'Ocean River Corporation', '13 Colten Union, Vancouver BC', 2.8, 'OceanResort1@gmail.com', '332-383-1833', 5, 'Tanya Lan'),
                        ('00028', 'Ocean River Corporation', '14 Colten Union, Vancouver BC', 2.4, 'OceanResort2@gmail.com', '572-248-3333', 5, 'John Lin Shin'),
                        ('00029', 'Ocean River Corporation', '15 Colten Union, Vancouver BC', 2.7, 'OceanResort3@gmail.com', '174-385-4953', 5, 'Ali Paul'),
                        ('00030', 'Ocean River Corporation', '16 Colten Union, Vancouver BC', 3.1, 'OceanBeach1@gmail.com', '111-237-3843', 5, 'Donald Duck'),
                        ('00031', 'Ocean River Corporation', '17 Colten Union, Vancouver BC', 3.3, 'OceanBeach2@gmail.com', '193-453-0000', 5, 'Katherine Wills'),
                        ('00032', 'Ocean River Corporation', '18 Colten Union, Vancouver BC', 3.7, 'OceanBeach3@gmail.com', '248-384-1832', 5, 'Porter Gibbs');                        

INSERT INTO hotel VALUES ('00033', 'Green Palm Inc', '60 Winifred Road, Montreal QC', 3.3, 'GreenPalm1@gmail.com', '234-454-2913', 5, 'Lucas Klein'),
						('00034', 'Green Palm Inc', '61 Winifred Road, Montreal QC', 3.5, 'GreenPalm2@gmail.com', '234-234-234', 5, 'Antony Nelson'),
                        ('00035', 'Green Palm Inc', '62 Winifred Road, Montreal QC', 3.1, 'GreenPalm3@gmail.com', '235-345-2321', 5, 'Cindy Petty'),
                        ('00036', 'Green Palm Inc', '63 Winifred Road, Montreal QC', 3.1, 'GreenPalm4@gmail.com', '283-123-2222', 5, 'Alexa Burch'),
                        ('00037', 'Green Palm Inc', '64 Winifred Road, Montreal QC', 3.2, 'GreenPalm5@gmail.com', '234-324-8166', 5, 'John Dennis'),
                        ('00038', 'Green Palm Inc', '65 Winifred Road, Montreal QC', 3.7, 'GreenPalm6@gmail.com', '647-349-3299', 5, 'Blake Landry'),
                        ('00039', 'Green Palm Inc', '66 Winifred Road, Montreal QC', 3.9, 'GreenPalm7@gmail.com', '182-437-2732', 5, 'Clarissa Blair'),
                        ('00040', 'Green Palm Inc', '67 Winifred Road, Montreal QC', 3.2, 'GreenPalm8@gmail.com', '123-324-2348', 5, 'Deshwan Wheeler');
                    
                    
-- Insert into multi-valued attributes phone_numbers & contact_email_addresses
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
                                
                                
-- Insert Employee Data
-- Hotel Chain #1 Employees
INSERT INTO employee VALUES ('547-99-7550', '12 Rose Garden, Ottawa ON', 'Richard Moon', 'Manager', '00001'), 
							('039-72-8581', '12 Bank Street, Ottawa ON', 'Kin Ge', 'Housekeeping & Service', '00001'), 
                            ('004-13-9177', '33 Village Area, Ottawa ON', 'James Rob', 'Manager', '00002'), 
                            ('444-27-9532', '23 England Bridge st, Ottawa ON', 'Aryan Khan', 'Housekeeping & Service', '00002'), 
                            ('451-01-3591', '74 Hugh River Rd, Ottawa ON', 'Stephanie Adn', 'Manager', '00003'), 
                            ('352-23-2349', '74 Hugh River Rd, Ottawa ON', 'Arjun Shah', 'Housekeeping & Service', '00003'), 
                            ('321-69-1249', 'Village Area, Ottawa ON', 'John Won', 'Manager', '00004'), 
                            ('731-29-4317', '33 Village Area, Ottawa ON', 'Raghav Binu', 'Housekeeping & Service', '00004'), 
                            ('102-39-6141', '74 Hugh River Rd, Ottawa ON', 'Victor Ed', 'Manager', '00005'), 
                            ('382-49-5572', '33 Village Area, Ottawa ON', 'Ananya Singh', 'Housekeeping & Service', '00005'), 
                            ('401-79-1043', '76 Hugh River Rd, Ottawa ON', 'Arjun Rin', 'Manager', '00006'), 
                            ('529-12-2911', '45 Village Area, Ottawa ON', 'Aman Kun', 'Housekeeping & Service', '00006'), 
                            ('631-24-4274', '11 Bank Street, Ottawa ON', 'Chota Yen', 'Manager', '00007'), 
                            ('777-91-5701', '21 Bank Street, Ottawa ON', 'Shanaya Pathak', 'Housekeeping & Service', '00007'), 
                            ('988-03-5671', '99 Breezy Garden, Ottawa ON', 'William Lin', 'Manager', '00008'), 
                            ('999-25-3501', '32 Local Garden, Ottawa ON', 'Ron Smith', 'Housekeeping & Service', '00008');
                            
-- Hotel Chain #2 Employees                            
INSERT INTO employee VALUES ('457-11-3471', '13 Rose Garden, Ottawa ON', 'John Liu', 'Manager', '00009'), 
							('329-52-3429', '21 Bank Street, Ottawa ON', 'Jay Park', 'Housekeeping & Service', '00009'), 
                            ('567-23-4353', 'Village Area, Ottawa ON', 'Alice Parker', 'Manager', '00010'), 
                            ('352-75-5551', 'England Bridge st, Ottawa ON', 'Victoria Smith', 'Housekeeping & Service', '00010'), 
                            ('357-45-5559', 'Hugh River Rd, Ottawa ON', 'James Smith', 'Manager', '00011'), 
                            ('193-74-2149', '11 Bank Street, Ottawa ON', 'Nadine Rin', 'Housekeeping & Service', '00011'), 
                            ('429-23-3591', 'Village Area, Ottawa ON', 'Jimmy Dao', 'Manager', '00012'), 
                            ('327-55-3698', '2 Sunrise Apt, Ottawa ON', 'Bill Gates', 'Housekeeping & Service', '00012'), 
                            ('568-66-6713', 'Breezy Wood Blv, Ottawa ON', 'Ron Fredrick', 'Manager', '00013'), 
                            ('102-77-3103', 'Firestone Valley, Ottawa ON', 'Stan Lee', 'Housekeeping & Service', '00013'), 
                            ('222-23-8841', '12 Bank Street, Ottawa ON', 'Victoria Son', 'Manager', '00014'), 
                            ('359-25-5286', 'Village Area, Ottawa ON', 'Jennifer Lee', 'Housekeeping & Service', '00014'), 
                            ('357-31-4306', '9 Bank Street, Ottawa ON', 'Wilson Seu', 'Manager', '00015'), 
                            ('981-75-4729', '12 Bank Street, Ottawa ON', 'Bruce Lin Mei', 'Housekeeping & Service', '00015'), 
                            ('781-65-4638', '10 Breezy Garden, Ottawa ON', 'Xin Drew', 'Manager', '00016'), 
                            ('800-76-5265', '13 Local Garden, Ottawa ON', 'John John', 'Housekeeping & Service', '00016');
                            
                            
-- Hotel Chain #3 Employees                            
INSERT INTO employee VALUES ('442-52-4323', '42 Rose Garden, Toronto ON', 'Alison Ray', 'Manager', '00017'), 
							('974-88-6532', '34 Bank Street, Toronto ON', 'Brent Tim', 'Housekeeping & Service', '00017'), 
                            ('001-34-6488', '65 Village Area, Toronto ON', 'Brendon Liu', 'Manager', '00018'), 
                            ('572-54-5421', '57 England Block st, Toronto ON', 'Rodrick Burton', 'Housekeeping & Service', '00018'), 
                            ('456-32-2344', '1 Hugh River Rd, Toronto ON', 'Susan Ann', 'Manager', '00019'), 
                            ('458-55-7654', '23 Bank Street, Toronto ON', 'Darnell Serrano', 'Housekeeping & Service', '00019'), 
                            ('528-82-5432', 'Village Area, Toronto ON', 'Oman Son', 'Manager', '00020'), 
                            ('948-76-3621', '27 Sunrise Apt, Toronto ON', 'Frankie Mendoza', 'Housekeeping & Service', '00020'), 
                            ('342-65-9932', '1 Breezy Wood Blv, Toronto ON', 'Kristina Sven', 'Manager', '00021'), 
                            ('352-22-9999', '1 Firestone Valley, Toronto ON', 'Angelia Benton', 'Housekeeping & Service', '00021'), 
                            ('356-45-9163', '65 Bank Street, Toronto ON', 'Sophia James', 'Manager', '00022'), 
                            ('291-54-2347', 'Village Town, Toronto ON', 'Lorraine Morton', 'Housekeeping & Service', '00022'), 
                            ('423-23-7421', '94 Bank Street, Toronto ON', 'Winston Fred', 'Manager', '00023'), 
                            ('395-65-7772', '42 Bank Street, Toronto ON', 'Antoine Rhodes', 'Housekeeping & Service', '00023'), 
                            ('952-67-4521', '45 Breezy Garden, Toronto ON', 'Miraya Park', 'Manager', '00024'), 
                            ('214-72-6431', '65 Local Garden, Toronto ON', 'Ashley Sosa', 'Housekeeping & Service', '00024');
				
-- Hotel Chain #4 Employees                            
INSERT INTO employee VALUES ('534-11-6020', '43 Rose Garden, Vancouver BC', 'Ray Jin', 'Manager', '00025'), 
							('645-12-6609', '54 Bank Street, Vancouver BC', 'Wilber Chandler', 'Housekeeping & Service', '00025'), 
                            ('435-13-8293', '23 Village Area, Vancouver BC', 'Jay Singh', 'Manager', '00026'), 
                            ('765-14-3530', '75 England Bridge st, Vancouver BC', 'Jerome Mcdowell', 'Housekeeping & Service', '00026'), 
                            ('666-15-2846', '23 Hugh River Rd, Vancouver BC', 'Tanya Lan', 'Manager', '00027'), 
                            ('345-16-2871', '53 Bank Street, Vancouver BC', 'Mauricio Henry', 'Housekeeping & Service', '00027'), 
                            ('464-63-0643', '32 Village Area, Vancouver BC', 'John Lin Shin', 'Manager', '00028'), 
                            ('401-54-2705', '32 Sunrise Apt, Vancouver BC', 'Reva Forbes', 'Housekeeping & Service', '00028'), 
                            ('481-56-6159', '43 Breezy Wood Blv, Vancouver BC', 'Ali Paul', 'Manager', '00029'), 
                            ('452-01-8224', '11 Firestone Valley, Vancouver BC', 'Blanca Chavez', 'Housekeeping & Service', '00029'), 
                            ('001-55-9171', '95 Bank Street, Vancouver BC', 'Donald Duck', 'Manager', '00030'), 
                            ('384-19-6990', '86 Village Area, Vancouver BC', 'Brock Jordan', 'Housekeeping & Service', '00030'), 
                            ('305-38-3124', '55 Bank Street, Vancouver BC', 'Katherine Wills', 'Manager', '00031'), 
                            ('604-71-5809', '66 Bank Street, Vancouver BC', 'Odell Gonzales', 'Housekeeping & Service', '00031'), 
                            ('311-51-6185', '22 Breezy Garden, Vancouver BC', 'Porter Gibbs', 'Manager', '00032'), 
                            ('801-42-0011', '1 Local Garden, Vancouver BC', 'Emile Hendricks', 'Housekeeping & Service', '00032');
                            
-- Hotel Chain #5 Employees                            
INSERT INTO employee VALUES ('345-12-4357', '53 Rose Garden, Montreal QC', 'Lucas Klein', 'Manager', '00033'), 
							('361-23-2048', '64 Bank Street, Montreal QC', 'Mason Liu', 'Housekeeping & Service', '00033'), 
                            ('453-53-5732', '34 Village Area, Montreal QC', 'Antony Nelson', 'Manager', '00034'), 
                            ('462-32-4572', '23 England Bridge st, Montreal QC', 'Cecelia Shelton', 'Housekeeping & Service', '00034'), 
                            ('342-43-0173', '64 Hugh River Rd, Montreal QC', 'Cindy Petty', 'Manager', '00035'), 
                            ('972-53-4720', '64 Bank Street, Montreal QC', 'Lori Valentine', 'Housekeeping & Service', '00035'), 
                            ('852-32-0473', '23 Village Area, Montreal QC', 'Alexa Burch', 'Manager', '00036'), 
                            ('576-42-1731', '54 Sunrise Apt, Montreal QC', 'Jan Beltran', 'Housekeeping & Service', '00036'), 
                            ('438-64-3621', '23 Breezy Wood Blv, Montreal QC', 'John Dennis', 'Manager', '00037'), 
                            ('264-75-5343', 'Firestone River, Montreal QC', 'Herb Hartman', 'Housekeeping & Service', '00037'), 
                            ('453-89-6437', '69 Bank Street, Montreal QC', 'Blake Landry', 'Manager', '00038'), 
                            ('138-75-5183', 'Village Area, Montreal QC', 'Dalton Ben', 'Housekeeping & Service', '00038'), 
                            ('573-63-4372', '94 Bank Street, Montreal QC', 'Clarissa Blair', 'Manager', '00039'), 
                            ('475-87-6803', '19 Bank Street, Montreal QC', 'Noble Patterson', 'Housekeeping & Service', '00039'), 
                            ('239-52-5439', '21 Breezy Garden, Montreal QC', 'Deshwan Wheeler', 'Manager', '00040'), 
                            ('573-41-4320', '53 Local Garden, Montreal QC', 'Barney Sanders', 'Housekeeping & Service', '00040');
							
                                
                                
-- First Hotel Chain                                
INSERT INTO room VALUES (0001, 69.99, '2-Bed, Bathroom, TV, Alarm, Desk w/ Chair, Lamp, WIFI, Fitness', 2, true, false, null, '00001'),
						(0002, 120.99, '2-Bed, Bathroom, Toiletries, TV, Alarm, Desk w/ Chair, Lamp, AC/Heating, Fridge, WIFI, Fitness, Pool', 2, true, true, null, '00001'),
						(0003, 200.99, '3-Bed, Bathroom, Toiletries, TV, Alarm, Desk w/ Chair, Lamp, AC/Heating, Fridge, WIFI, Fitness, Pool', 3, true, true, 'Hot Water Not Working', '00001'),
                        (0004, 150.99, '3-Bed, Bathroom, Toiletries, TV, Lamp, AC/Heating, Fridge, WIFI, Fitness', 3, true, true, null, '00001'),
                        (0005, 300.99, '4-Bed, Toiletries, TV, Alarm, Desk w/ Chair, Lamp, AC/Heating, Fridge, WIFI, Fitness, Pool', 4, true, true, null, '00001'),
                        (0101, 69.99, '2-Bed, Bathroom, TV, Alarm, Desk w/ Chair, Lamp, WIFI, Fitness', 2, true, true, null, '00002'),
						(0102, 120.99, '2-Bed, Bathroom, Toiletries, TV, Alarm, Desk w/ Chair, Lamp, AC/Heating, Fridge, WIFI, Fitness, Pool', 2, true, true, null, '00002'),
						(0103, 200.99, '3-Bed, Bathroom, Toiletries, TV, Alarm, Desk w/ Chair, Lamp, AC/Heating, Fridge, WIFI, Fitness, Pool', 3, false, true, null, '00002'),
                        (0104, 150.99, '3-Bed, Bathroom, Toiletries, TV, Lamp, AC/Heating, Fridge, WIFI, Fitness', 3, true, true, null, '00002'),
                        (0105, 300.99, '4-Bed, Toiletries, TV, Alarm, Desk w/ Chair, Lamp, AC/Heating, Fridge, WIFI, Fitness, Pool', 4, true, true, null, '00002'),
                        (0201, 69.99, '2-Bed, Bathroom, TV, Alarm, Desk w/ Chair, Lamp, WIFI, Fitness', 2, true, true, null, '00003'),
						(0202, 120.99, '2-Bed, Bathroom, Toiletries, TV, Alarm, Desk w/ Chair, Lamp, AC/Heating, Fridge, WIFI, Fitness, Pool', 2, true, true, null, '00003'),
						(0203, 200.99, '3-Bed, Bathroom, Toiletries, TV, Alarm, Desk w/ Chair, Lamp, AC/Heating, Fridge, WIFI, Fitness, Pool', 3, true, true, null, '00003'),
                        (0204, 150.99, '3-Bed, Bathroom, Toiletries, TV, Lamp, AC/Heating, Fridge, WIFI, Fitness', 3, true, true, null, '00003'),
                        (0205, 300.99, '4-Bed, Toiletries, TV, Alarm, Desk w/ Chair, Lamp, AC/Heating, Fridge, WIFI, Fitness, Pool', 4, true, true, null, '00003'),
                        (0301, 69.99, '2-Bed, Bathroom, TV, Alarm, Desk w/ Chair, Lamp, WIFI, Fitness', 2, false, true, null, '00004'),
						(0302, 120.99, '2-Bed, Bathroom, Toiletries, TV, Alarm, Desk w/ Chair, Lamp, AC/Heating, Fridge, WIFI, Fitness, Pool', 2, true, true, null, '00004'),
						(0303, 200.99, '3-Bed, Bathroom, Toiletries, TV, Alarm, Desk w/ Chair, Lamp, AC/Heating, Fridge, WIFI, Fitness, Pool', 3, true, false, null, '00004'),
                        (0304, 150.99, '3-Bed, Bathroom, Toiletries, TV, Lamp, AC/Heating, Fridge, WIFI, Fitness', 3, true, true, null, '00004'),
                        (0305, 300.99, '4-Bed, Toiletries, TV, Alarm, Desk w/ Chair, Lamp, AC/Heating, Fridge, WIFI, Fitness, Pool', 4, true, true, null, '00004'),
                        (0401, 69.99, '2-Bed, Bathroom, TV, Alarm, Desk w/ Chair, Lamp, WIFI, Fitness', 2, true, true, null, '00005'),
						(0402, 120.99, '2-Bed, Bathroom, Toiletries, TV, Alarm, Desk w/ Chair, Lamp, AC/Heating, Fridge, WIFI, Fitness, Pool', 2, true, true, null, '00005'),
						(0403, 200.99, '3-Bed, Bathroom, Toiletries, TV, Alarm, Desk w/ Chair, Lamp, AC/Heating, Fridge, WIFI, Fitness, Pool', 3, true, false, null, '00005'),
                        (0404, 150.99, '3-Bed, Bathroom, Toiletries, TV, Lamp, AC/Heating, Fridge, WIFI, Fitness', 3, true, true, null, '00005'),
                        (0405, 300.99, '4-Bed, Toiletries, TV, Alarm, Desk w/ Chair, Lamp, AC/Heating, Fridge, WIFI, Fitness, Pool', 4, true, true, null, '00005'),
                        (0501, 69.99, '2-Bed, Bathroom, TV, Alarm, Desk w/ Chair, Lamp, WIFI, Fitness', 2, true, true, null, '00006'),
						(0502, 120.99, '2-Bed, Bathroom, Toiletries, TV, Alarm, Desk w/ Chair, Lamp, AC/Heating, Fridge, WIFI, Fitness, Pool', 2, true, true, null, '00006'),
						(0503, 200.99, '3-Bed, Bathroom, Toiletries, TV, Alarm, Desk w/ Chair, Lamp, AC/Heating, Fridge, WIFI, Fitness, Pool', 3, false, true, null, '00006'),
                        (0504, 150.99, '3-Bed, Bathroom, Toiletries, TV, Lamp, AC/Heating, Fridge, WIFI, Fitness', 3, true, true, null, '00006'),
                        (0505, 300.99, '4-Bed, Toiletries, TV, Alarm, Desk w/ Chair, Lamp, AC/Heating, Fridge, WIFI, Fitness, Pool', 4, true, true, null, '00006'),
                        (0601, 69.99, '2-Bed, Bathroom, TV, Alarm, Desk w/ Chair, Lamp, WIFI, Fitness', 2, true, true, null, '00007'),
						(0602, 120.99, '2-Bed, Bathroom, Toiletries, TV, Alarm, Desk w/ Chair, Lamp, AC/Heating, Fridge, WIFI, Fitness, Pool', 2, true, true, null, '00007'),
						(0603, 200.99, '3-Bed, Bathroom, Toiletries, TV, Alarm, Desk w/ Chair, Lamp, AC/Heating, Fridge, WIFI, Fitness, Pool', 3, true, true, null, '00007'),
                        (0604, 150.99, '3-Bed, Bathroom, Toiletries, TV, Lamp, AC/Heating, Fridge, WIFI, Fitness', 3, true, true, null, '00007'),
                        (0605, 300.99, '4-Bed, Toiletries, TV, Alarm, Desk w/ Chair, Lamp, AC/Heating, Fridge, WIFI, Fitness, Pool', 4, true, true, null, '00007'),
                        (0701, 69.99, '2-Bed, Bathroom, TV, Alarm, Desk w/ Chair, Lamp, WIFI, Fitness', 2, true, true, null, '00008'),
						(0702, 120.99, '2-Bed, Bathroom, Toiletries, TV, Alarm, Desk w/ Chair, Lamp, AC/Heating, Fridge, WIFI, Fitness, Pool', 2, true, true, 'TV connection issues', '00008'),
						(0703, 200.99, '3-Bed, Bathroom, Toiletries, TV, Alarm, Desk w/ Chair, Lamp, AC/Heating, Fridge, WIFI, Fitness, Pool', 3, true, true, null, '00008'),
                        (0704, 150.99, '3-Bed, Bathroom, Toiletries, TV, Lamp, AC/Heating, Fridge, WIFI, Fitness', 3, false, true, null, '00008'),
                        (0705, 300.99, '4-Bed, Toiletries, TV, Alarm, Desk w/ Chair, Lamp, AC/Heating, Fridge, WIFI, Fitness, Pool', 4, true, true, null, '00008');
                        
                        
                        
-- Second Hotel Chain                                
INSERT INTO room VALUES (1001, 69.99, '2-Bed, Bathroom, TV, Alarm, Desk w/ Chair, Lamp, WIFI, Fitness', 2, true, true, null, '00009'),
						(1002, 120.99, '2-Bed, Bathroom, Toiletries, TV, Alarm, Desk w/ Chair, Lamp, AC/Heating, Fridge, WIFI, Fitness, Pool', 2, true, true, null, '00009'),
						(1003, 200.99, '3-Bed, Bathroom, Toiletries, TV, Alarm, Desk w/ Chair, Lamp, AC/Heating, Fridge, WIFI, Fitness, Pool', 3, true, true, 'Lamp Battery Run Out', '00009'),
                        (1004, 150.99, '3-Bed, Bathroom, Toiletries, TV, Lamp, AC/Heating, Fridge, WIFI, Fitness', 3, true, true, null, '00009'),
                        (1005, 300.99, '4-Bed, Toiletries, TV, Alarm, Desk w/ Chair, Lamp, AC/Heating, Fridge, WIFI, Fitness, Pool', 4, true, true, null, '00009'),
                        (1101, 69.99, '2-Bed, Bathroom, TV, Alarm, Desk w/ Chair, Lamp, WIFI, Fitness', 2, true, true, null, '00010'),
						(1102, 120.99, '2-Bed, Bathroom, Toiletries, TV, Alarm, Desk w/ Chair, Lamp, AC/Heating, Fridge, WIFI, Fitness, Pool', 2, true, true, null, '00010'),
						(1103, 200.99, '3-Bed, Bathroom, Toiletries, TV, Alarm, Desk w/ Chair, Lamp, AC/Heating, Fridge, WIFI, Fitness, Pool', 3, true, true, null, '00010'),
                        (1104, 150.99, '3-Bed, Bathroom, Toiletries, TV, Lamp, AC/Heating, Fridge, WIFI, Fitness', 3, true, true, null, '00010'),
                        (1105, 300.99, '4-Bed, Toiletries, TV, Alarm, Desk w/ Chair, Lamp, AC/Heating, Fridge, WIFI, Fitness, Pool', 4, true, true, null, '00010'),
                        (1201, 69.99, '2-Bed, Bathroom, TV, Alarm, Desk w/ Chair, Lamp, WIFI, Fitness', 2, true, true, null, '00011'),
						(1202, 120.99, '2-Bed, Bathroom, Toiletries, TV, Alarm, Desk w/ Chair, Lamp, AC/Heating, Fridge, WIFI, Fitness, Pool', 2, false, true, null, '00011'),
						(1203, 200.99, '3-Bed, Bathroom, Toiletries, TV, Alarm, Desk w/ Chair, Lamp, AC/Heating, Fridge, WIFI, Fitness, Pool', 3, true, true, null, '00011'),
                        (1204, 150.99, '3-Bed, Bathroom, Toiletries, TV, Lamp, AC/Heating, Fridge, WIFI, Fitness', 3, true, true, null, '00011'),
                        (1205, 300.99, '4-Bed, Toiletries, TV, Alarm, Desk w/ Chair, Lamp, AC/Heating, Fridge, WIFI, Fitness, Pool', 4, true, true, null, '00011'),
                        (1301, 69.99, '2-Bed, Bathroom, TV, Alarm, Desk w/ Chair, Lamp, WIFI, Fitness', 2, false, true, null, '00012'),
						(1302, 120.99, '2-Bed, Bathroom, Toiletries, TV, Alarm, Desk w/ Chair, Lamp, AC/Heating, Fridge, WIFI, Fitness, Pool', 2, true, true, null, '00012'),
						(1303, 200.99, '3-Bed, Bathroom, Toiletries, TV, Alarm, Desk w/ Chair, Lamp, AC/Heating, Fridge, WIFI, Fitness, Pool', 3, true, true, null, '00012'),
                        (1304, 150.99, '3-Bed, Bathroom, Toiletries, TV, Lamp, AC/Heating, Fridge, WIFI, Fitness', 3, true, true, null, '00012'),
                        (1305, 300.99, '4-Bed, Toiletries, TV, Alarm, Desk w/ Chair, Lamp, AC/Heating, Fridge, WIFI, Fitness, Pool', 4, true, true, null, '00012'),
                        (1401, 69.99, '2-Bed, Bathroom, TV, Alarm, Desk w/ Chair, Lamp, WIFI, Fitness', 2, true, false, null, '00013'),
						(1402, 120.99, '2-Bed, Bathroom, Toiletries, TV, Alarm, Desk w/ Chair, Lamp, AC/Heating, Fridge, WIFI, Fitness, Pool', 2, true, true, null, '00013'),
						(1403, 200.99, '3-Bed, Bathroom, Toiletries, TV, Alarm, Desk w/ Chair, Lamp, AC/Heating, Fridge, WIFI, Fitness, Pool', 3, true, true, null, '00013'),
                        (1404, 150.99, '3-Bed, Bathroom, Toiletries, TV, Lamp, AC/Heating, Fridge, WIFI, Fitness', 3, true, true, null, '00013'),
                        (1405, 300.99, '4-Bed, Toiletries, TV, Alarm, Desk w/ Chair, Lamp, AC/Heating, Fridge, WIFI, Fitness, Pool', 4, true, true, null, '00013'),
                        (1501, 69.99, '2-Bed, Bathroom, TV, Alarm, Desk w/ Chair, Lamp, WIFI, Fitness', 2, true, false, null, '00014'),
						(1502, 120.99, '2-Bed, Bathroom, Toiletries, TV, Alarm, Desk w/ Chair, Lamp, AC/Heating, Fridge, WIFI, Fitness, Pool', 2, false, true, null, '00014'),
						(1503, 200.99, '3-Bed, Bathroom, Toiletries, TV, Alarm, Desk w/ Chair, Lamp, AC/Heating, Fridge, WIFI, Fitness, Pool', 3, true, true, null, '00014'),
                        (1504, 150.99, '3-Bed, Bathroom, Toiletries, TV, Lamp, AC/Heating, Fridge, WIFI, Fitness', 3, true, true, null, '00014'),
                        (1505, 300.99, '4-Bed, Toiletries, TV, Alarm, Desk w/ Chair, Lamp, AC/Heating, Fridge, WIFI, Fitness, Pool', 4, true, true, null, '00014'),
                        (1601, 69.99, '2-Bed, Bathroom, TV, Alarm, Desk w/ Chair, Lamp, WIFI, Fitness', 2, true, true, null, '00015'),
						(1602, 120.99, '2-Bed, Bathroom, Toiletries, TV, Alarm, Desk w/ Chair, Lamp, AC/Heating, Fridge, WIFI, Fitness, Pool', 2, true, true, null, '00015'),
						(1603, 200.99, '3-Bed, Bathroom, Toiletries, TV, Alarm, Desk w/ Chair, Lamp, AC/Heating, Fridge, WIFI, Fitness, Pool', 3, true, true, null, '00015'),
                        (1604, 150.99, '3-Bed, Bathroom, Toiletries, TV, Lamp, AC/Heating, Fridge, WIFI, Fitness', 3, true, true, null, '00015'),
                        (1605, 300.99, '4-Bed, Toiletries, TV, Alarm, Desk w/ Chair, Lamp, AC/Heating, Fridge, WIFI, Fitness, Pool', 4, true, true, null, '00015'),
                        (1701, 69.99, '2-Bed, Bathroom, TV, Alarm, Desk w/ Chair, Lamp, WIFI, Fitness', 2, true, true, null, '00016'),
						(1702, 120.99, '2-Bed, Bathroom, Toiletries, TV, Alarm, Desk w/ Chair, Lamp, AC/Heating, Fridge, WIFI, Fitness, Pool', 2, true, true, null, '00016'),
						(1703, 200.99, '3-Bed, Bathroom, Toiletries, TV, Alarm, Desk w/ Chair, Lamp, AC/Heating, Fridge, WIFI, Fitness, Pool', 3, false, true, null, '00016'),
                        (1704, 150.99, '3-Bed, Bathroom, Toiletries, TV, Lamp, AC/Heating, Fridge, WIFI, Fitness', 3, true, true, null, '00016'),
                        (1705, 300.99, '4-Bed, Toiletries, TV, Alarm, Desk w/ Chair, Lamp, AC/Heating, Fridge, WIFI, Fitness, Pool', 4, true, true, 'Wifi Issues', '00016');
                        
                        
                        
-- Third Hotel Chain                                
INSERT INTO room VALUES (2001, 69.99, '2-Bed, Bathroom, TV, Alarm, Desk w/ Chair, Lamp, WIFI, Fitness', 2, true, true, null, '00017'),
						(2002, 120.99, '2-Bed, Bathroom, Toiletries, TV, Alarm, Desk w/ Chair, Lamp, AC/Heating, Fridge, WIFI, Fitness, Pool', 2, true, true, null, '00017'),
						(2003, 200.99, '3-Bed, Bathroom, Toiletries, TV, Alarm, Desk w/ Chair, Lamp, AC/Heating, Fridge, WIFI, Fitness, Pool', 3, true, true, null, '00017'),
                        (2004, 150.99, '3-Bed, Bathroom, Toiletries, TV, Lamp, AC/Heating, Fridge, WIFI, Fitness', 3, false, true, null, '00017'),
                        (2005, 300.99, '4-Bed, Toiletries, TV, Alarm, Desk w/ Chair, Lamp, AC/Heating, Fridge, WIFI, Fitness, Pool', 4, true, true, null, '00017'),
                        (2101, 69.99, '2-Bed, Bathroom, TV, Alarm, Desk w/ Chair, Lamp, WIFI, Fitness', 2, true, true, null, '00018'),
						(2102, 120.99, '2-Bed, Bathroom, Toiletries, TV, Alarm, Desk w/ Chair, Lamp, AC/Heating, Fridge, WIFI, Fitness, Pool', 2, true, true, null, '00018'),
						(2103, 200.99, '3-Bed, Bathroom, Toiletries, TV, Alarm, Desk w/ Chair, Lamp, AC/Heating, Fridge, WIFI, Fitness, Pool', 3, true, false, null, '00018'),
                        (2104, 150.99, '3-Bed, Bathroom, Toiletries, TV, Lamp, AC/Heating, Fridge, WIFI, Fitness', 3, true, true, null, '00018'),
                        (2105, 300.99, '4-Bed, Toiletries, TV, Alarm, Desk w/ Chair, Lamp, AC/Heating, Fridge, WIFI, Fitness, Pool', 4, true, true, null, '00018'),
                        (2201, 69.99, '2-Bed, Bathroom, TV, Alarm, Desk w/ Chair, Lamp, WIFI, Fitness', 2, true, false, null, '00019'),
						(2202, 120.99, '2-Bed, Bathroom, Toiletries, TV, Alarm, Desk w/ Chair, Lamp, AC/Heating, Fridge, WIFI, Fitness, Pool', 2, true, true, null, '00019'),
						(2203, 200.99, '3-Bed, Bathroom, Toiletries, TV, Alarm, Desk w/ Chair, Lamp, AC/Heating, Fridge, WIFI, Fitness, Pool', 3, false, true, null, '00019'),
                        (2204, 150.99, '3-Bed, Bathroom, Toiletries, TV, Lamp, AC/Heating, Fridge, WIFI, Fitness', 3, true, true, null, '00019'),
                        (2205, 300.99, '4-Bed, Toiletries, TV, Alarm, Desk w/ Chair, Lamp, AC/Heating, Fridge, WIFI, Fitness, Pool', 4, true, true, null, '00019'),
                        (2301, 69.99, '2-Bed, Bathroom, TV, Alarm, Desk w/ Chair, Lamp, WIFI, Fitness', 2, true, true, null, '00020'),
						(2302, 120.99, '2-Bed, Bathroom, Toiletries, TV, Alarm, Desk w/ Chair, Lamp, AC/Heating, Fridge, WIFI, Fitness, Pool', 2, true, true, 'Soap Shortage', '00020'),
						(2303, 200.99, '3-Bed, Bathroom, Toiletries, TV, Alarm, Desk w/ Chair, Lamp, AC/Heating, Fridge, WIFI, Fitness, Pool', 3, true, false, null, '00020'),
                        (2304, 150.99, '3-Bed, Bathroom, Toiletries, TV, Lamp, AC/Heating, Fridge, WIFI, Fitness', 3, true, true, null, '00020'),
                        (2305, 300.99, '4-Bed, Toiletries, TV, Alarm, Desk w/ Chair, Lamp, AC/Heating, Fridge, WIFI, Fitness, Pool', 4, true, true, null, '00020'),
                        (2401, 69.99, '2-Bed, Bathroom, TV, Alarm, Desk w/ Chair, Lamp, WIFI, Fitness', 2, true, true, null, '00021'),
						(2402, 120.99, '2-Bed, Bathroom, Toiletries, TV, Alarm, Desk w/ Chair, Lamp, AC/Heating, Fridge, WIFI, Fitness, Pool', 2, true, true, null, '00021'),
						(2403, 200.99, '3-Bed, Bathroom, Toiletries, TV, Alarm, Desk w/ Chair, Lamp, AC/Heating, Fridge, WIFI, Fitness, Pool', 3, true, true, null, '00021'),
                        (2404, 150.99, '3-Bed, Bathroom, Toiletries, TV, Lamp, AC/Heating, Fridge, WIFI, Fitness', 3, true, true, null, '00021'),
                        (2405, 300.99, '4-Bed, Toiletries, TV, Alarm, Desk w/ Chair, Lamp, AC/Heating, Fridge, WIFI, Fitness, Pool', 4, true, true, null, '00021'),
                        (2501, 69.99, '2-Bed, Bathroom, TV, Alarm, Desk w/ Chair, Lamp, WIFI, Fitness', 2, true, true, null, '00022'),
						(2502, 120.99, '2-Bed, Bathroom, Toiletries, TV, Alarm, Desk w/ Chair, Lamp, AC/Heating, Fridge, WIFI, Fitness, Pool', 2, true, true, null, '00022'),
						(2503, 200.99, '3-Bed, Bathroom, Toiletries, TV, Alarm, Desk w/ Chair, Lamp, AC/Heating, Fridge, WIFI, Fitness, Pool', 3, true, true, null, '00022'),
                        (2504, 150.99, '3-Bed, Bathroom, Toiletries, TV, Lamp, AC/Heating, Fridge, WIFI, Fitness', 3, true, true, null, '00022'),
                        (2505, 300.99, '4-Bed, Toiletries, TV, Alarm, Desk w/ Chair, Lamp, AC/Heating, Fridge, WIFI, Fitness, Pool', 4, true, true, null, '00022'),
                        (2601, 69.99, '2-Bed, Bathroom, TV, Alarm, Desk w/ Chair, Lamp, WIFI, Fitness', 2, true, true, null, '00023'),
						(2602, 120.99, '2-Bed, Bathroom, Toiletries, TV, Alarm, Desk w/ Chair, Lamp, AC/Heating, Fridge, WIFI, Fitness, Pool', 2, true, true, null, '00023'),
						(2603, 200.99, '3-Bed, Bathroom, Toiletries, TV, Alarm, Desk w/ Chair, Lamp, AC/Heating, Fridge, WIFI, Fitness, Pool', 3, true, true, null, '00023'),
                        (2604, 150.99, '3-Bed, Bathroom, Toiletries, TV, Lamp, AC/Heating, Fridge, WIFI, Fitness', 3, true, false, null, '00023'),
                        (2605, 300.99, '4-Bed, Toiletries, TV, Alarm, Desk w/ Chair, Lamp, AC/Heating, Fridge, WIFI, Fitness, Pool', 4, true, true, null, '00023'),
                        (2701, 69.99, '2-Bed, Bathroom, TV, Alarm, Desk w/ Chair, Lamp, WIFI, Fitness', 2, false, true, null, '00024'),
						(2702, 120.99, '2-Bed, Bathroom, Toiletries, TV, Alarm, Desk w/ Chair, Lamp, AC/Heating, Fridge, WIFI, Fitness, Pool', 2, true, true, null, '00024'),
						(2703, 200.99, '3-Bed, Bathroom, Toiletries, TV, Alarm, Desk w/ Chair, Lamp, AC/Heating, Fridge, WIFI, Fitness, Pool', 3, true, true, 'Pool Drainage Issue', '00024'),
                        (2704, 150.99, '3-Bed, Bathroom, Toiletries, TV, Lamp, AC/Heating, Fridge, WIFI, Fitness', 3, false, true, null, '00024'),
                        (2705, 300.99, '4-Bed, Toiletries, TV, Alarm, Desk w/ Chair, Lamp, AC/Heating, Fridge, WIFI, Fitness, Pool', 4, true, true, null, '00024');
                        
                        
                        
-- Fourth Hotel Chain                                
INSERT INTO room VALUES (3001, 69.99, '2-Bed, Bathroom, TV, Alarm, Desk w/ Chair, Lamp, WIFI, Fitness', 2, true, true, null, '00025'),
						(3002, 120.99, '2-Bed, Bathroom, Toiletries, TV, Alarm, Desk w/ Chair, Lamp, AC/Heating, Fridge, WIFI, Fitness, Pool', 2, true, true, null, '00025'),
						(3003, 200.99, '3-Bed, Bathroom, Toiletries, TV, Alarm, Desk w/ Chair, Lamp, AC/Heating, Fridge, WIFI, Fitness, Pool', 3, true, true, null, '00025'),
                        (3004, 150.99, '3-Bed, Bathroom, Toiletries, TV, Lamp, AC/Heating, Fridge, WIFI, Fitness', 3, true, true, null, '00025'),
                        (3005, 300.99, '4-Bed, Toiletries, TV, Alarm, Desk w/ Chair, Lamp, AC/Heating, Fridge, WIFI, Fitness, Pool', 4, true, true, null, '00025'),
                        (3101, 69.99, '2-Bed, Bathroom, TV, Alarm, Desk w/ Chair, Lamp, WIFI, Fitness', 2, true, false, null, '00026'),
						(3102, 120.99, '2-Bed, Bathroom, Toiletries, TV, Alarm, Desk w/ Chair, Lamp, AC/Heating, Fridge, WIFI, Fitness, Pool', 2, true, true, null, '00026'),
						(3103, 200.99, '3-Bed, Bathroom, Toiletries, TV, Alarm, Desk w/ Chair, Lamp, AC/Heating, Fridge, WIFI, Fitness, Pool', 3, true, true, null, '00026'),
                        (3104, 150.99, '3-Bed, Bathroom, Toiletries, TV, Lamp, AC/Heating, Fridge, WIFI, Fitness', 3, true, true, null, '00026'),
                        (3105, 300.99, '4-Bed, Toiletries, TV, Alarm, Desk w/ Chair, Lamp, AC/Heating, Fridge, WIFI, Fitness, Pool', 4, true, true, null, '00026'),
                        (3201, 69.99, '2-Bed, Bathroom, TV, Alarm, Desk w/ Chair, Lamp, WIFI, Fitness', 2, true, true, null, '00027'),
						(3202, 120.99, '2-Bed, Bathroom, Toiletries, TV, Alarm, Desk w/ Chair, Lamp, AC/Heating, Fridge, WIFI, Fitness, Pool', 2, true, true, null, '00027'),
						(3203, 200.99, '3-Bed, Bathroom, Toiletries, TV, Alarm, Desk w/ Chair, Lamp, AC/Heating, Fridge, WIFI, Fitness, Pool', 3, true, true, null, '00027'),
                        (3204, 150.99, '3-Bed, Bathroom, Toiletries, TV, Lamp, AC/Heating, Fridge, WIFI, Fitness', 3, true, true, null, '00027'),
                        (3205, 300.99, '4-Bed, Toiletries, TV, Alarm, Desk w/ Chair, Lamp, AC/Heating, Fridge, WIFI, Fitness, Pool', 4, true, true, null, '00027'),
                        (3301, 69.99, '2-Bed, Bathroom, TV, Alarm, Desk w/ Chair, Lamp, WIFI, Fitness', 2, false, true, null, '00028'),
						(3302, 120.99, '2-Bed, Bathroom, Toiletries, TV, Alarm, Desk w/ Chair, Lamp, AC/Heating, Fridge, WIFI, Fitness, Pool', 2, true, true, null, '00028'),
						(3303, 200.99, '3-Bed, Bathroom, Toiletries, TV, Alarm, Desk w/ Chair, Lamp, AC/Heating, Fridge, WIFI, Fitness, Pool', 3, true, true, null, '00028'),
                        (3304, 150.99, '3-Bed, Bathroom, Toiletries, TV, Lamp, AC/Heating, Fridge, WIFI, Fitness', 3, true, true, null, '00028'),
                        (3305, 300.99, '4-Bed, Toiletries, TV, Alarm, Desk w/ Chair, Lamp, AC/Heating, Fridge, WIFI, Fitness, Pool', 4, true, true, null, '00028'),
                        (3401, 69.99, '2-Bed, Bathroom, TV, Alarm, Desk w/ Chair, Lamp, WIFI, Fitness', 2, true, true, null, '00029'),
						(3402, 120.99, '2-Bed, Bathroom, Toiletries, TV, Alarm, Desk w/ Chair, Lamp, AC/Heating, Fridge, WIFI, Fitness, Pool', 2, true, true, null, '00029'),
						(3403, 200.99, '3-Bed, Bathroom, Toiletries, TV, Alarm, Desk w/ Chair, Lamp, AC/Heating, Fridge, WIFI, Fitness, Pool', 3, true, true, null, '00029'),
                        (3404, 150.99, '3-Bed, Bathroom, Toiletries, TV, Lamp, AC/Heating, Fridge, WIFI, Fitness', 3, true, true, null, '00029'),
                        (3405, 300.99, '4-Bed, Toiletries, TV, Alarm, Desk w/ Chair, Lamp, AC/Heating, Fridge, WIFI, Fitness, Pool', 4, true, true, null, '00029'),
                        (3501, 69.99, '2-Bed, Bathroom, TV, Alarm, Desk w/ Chair, Lamp, WIFI, Fitness', 2, true, true, null, '00030'),
						(3502, 120.99, '2-Bed, Bathroom, Toiletries, TV, Alarm, Desk w/ Chair, Lamp, AC/Heating, Fridge, WIFI, Fitness, Pool', 2, true, false, null, '00030'),
						(3503, 200.99, '3-Bed, Bathroom, Toiletries, TV, Alarm, Desk w/ Chair, Lamp, AC/Heating, Fridge, WIFI, Fitness, Pool', 3, true, true, null, '00030'),
                        (3504, 150.99, '3-Bed, Bathroom, Toiletries, TV, Lamp, AC/Heating, Fridge, WIFI, Fitness', 3, true, true, null, '00030'),
                        (3505, 300.99, '4-Bed, Toiletries, TV, Alarm, Desk w/ Chair, Lamp, AC/Heating, Fridge, WIFI, Fitness, Pool', 4, true, true, null, '00030'),
                        (3601, 69.99, '2-Bed, Bathroom, TV, Alarm, Desk w/ Chair, Lamp, WIFI, Fitness', 2, true, false, null, '00031'),
						(3602, 120.99, '2-Bed, Bathroom, Toiletries, TV, Alarm, Desk w/ Chair, Lamp, AC/Heating, Fridge, WIFI, Fitness, Pool', 2, true, false, null, '00031'),
						(3603, 200.99, '3-Bed, Bathroom, Toiletries, TV, Alarm, Desk w/ Chair, Lamp, AC/Heating, Fridge, WIFI, Fitness, Pool', 3, true, true, 'Fridge Door Stuck', '00031'),
                        (3604, 150.99, '3-Bed, Bathroom, Toiletries, TV, Lamp, AC/Heating, Fridge, WIFI, Fitness', 3, true, true, null, '00031'),
                        (3605, 300.99, '4-Bed, Toiletries, TV, Alarm, Desk w/ Chair, Lamp, AC/Heating, Fridge, WIFI, Fitness, Pool', 4, true, true, null, '00031'),
                        (3701, 69.99, '2-Bed, Bathroom, TV, Alarm, Desk w/ Chair, Lamp, WIFI, Fitness', 2, true, true, null, '00032'),
						(3702, 120.99, '2-Bed, Bathroom, Toiletries, TV, Alarm, Desk w/ Chair, Lamp, AC/Heating, Fridge, WIFI, Fitness, Pool', 2, false, true, null, '00032'),
						(3703, 200.99, '3-Bed, Bathroom, Toiletries, TV, Alarm, Desk w/ Chair, Lamp, AC/Heating, Fridge, WIFI, Fitness, Pool', 3, true, true, null, '00032'),
                        (3704, 150.99, '3-Bed, Bathroom, Toiletries, TV, Lamp, AC/Heating, Fridge, WIFI, Fitness', 3, true, true, null, '00032'),
                        (3705, 300.99, '4-Bed, Toiletries, TV, Alarm, Desk w/ Chair, Lamp, AC/Heating, Fridge, WIFI, Fitness, Pool', 4, true, true, null, '00032');
                        
                        
                        
-- Fifth Hotel Chain                                
INSERT INTO room VALUES (4001, 69.99, '2-Bed, Bathroom, TV, Alarm, Desk w/ Chair, Lamp, WIFI, Fitness', 2, true, false, null, '00033'),
						(4002, 120.99, '2-Bed, Bathroom, Toiletries, TV, Alarm, Desk w/ Chair, Lamp, AC/Heating, Fridge, WIFI, Fitness, Pool', 2, true, true, null, '00033'),
						(4003, 200.99, '3-Bed, Bathroom, Toiletries, TV, Alarm, Desk w/ Chair, Lamp, AC/Heating, Fridge, WIFI, Fitness, Pool', 3, true, true, null, '00033'),
                        (4004, 150.99, '3-Bed, Bathroom, Toiletries, TV, Lamp, AC/Heating, Fridge, WIFI, Fitness', 3, true, false, null, '00033'),
                        (4005, 300.99, '4-Bed, Toiletries, TV, Alarm, Desk w/ Chair, Lamp, AC/Heating, Fridge, WIFI, Fitness, Pool', 4, true, true, null, '00033'),
                        (4101, 69.99, '2-Bed, Bathroom, TV, Alarm, Desk w/ Chair, Lamp, WIFI, Fitness', 2, false, true, null, '00034'),
						(4102, 120.99, '2-Bed, Bathroom, Toiletries, TV, Alarm, Desk w/ Chair, Lamp, AC/Heating, Fridge, WIFI, Fitness, Pool', 2, true, true, null, '00034'),
						(4103, 200.99, '3-Bed, Bathroom, Toiletries, TV, Alarm, Desk w/ Chair, Lamp, AC/Heating, Fridge, WIFI, Fitness, Pool', 3, true, true, null, '00034'),
                        (4104, 150.99, '3-Bed, Bathroom, Toiletries, TV, Lamp, AC/Heating, Fridge, WIFI, Fitness', 3, true, true, null, '00034'),
                        (4105, 300.99, '4-Bed, Toiletries, TV, Alarm, Desk w/ Chair, Lamp, AC/Heating, Fridge, WIFI, Fitness, Pool', 4, true, true, null, '00034'),
                        (4201, 69.99, '2-Bed, Bathroom, TV, Alarm, Desk w/ Chair, Lamp, WIFI, Fitness', 2, true, false, null, '00035'),
						(4202, 120.99, '2-Bed, Bathroom, Toiletries, TV, Alarm, Desk w/ Chair, Lamp, AC/Heating, Fridge, WIFI, Fitness, Pool', 2, true, true, null, '00035'),
						(4203, 200.99, '3-Bed, Bathroom, Toiletries, TV, Alarm, Desk w/ Chair, Lamp, AC/Heating, Fridge, WIFI, Fitness, Pool', 3, true, true, null, '00035'),
                        (4204, 150.99, '3-Bed, Bathroom, Toiletries, TV, Lamp, AC/Heating, Fridge, WIFI, Fitness', 3, true, true, null, '00035'),
                        (4205, 300.99, '4-Bed, Toiletries, TV, Alarm, Desk w/ Chair, Lamp, AC/Heating, Fridge, WIFI, Fitness, Pool', 4, true, true, null, '00035'),
                        (4301, 69.99, '2-Bed, Bathroom, TV, Alarm, Desk w/ Chair, Lamp, WIFI, Fitness', 2, false, true, null, '00036'),
						(4302, 120.99, '2-Bed, Bathroom, Toiletries, TV, Alarm, Desk w/ Chair, Lamp, AC/Heating, Fridge, WIFI, Fitness, Pool', 2, true, true, null, '00036'),
						(4303, 200.99, '3-Bed, Bathroom, Toiletries, TV, Alarm, Desk w/ Chair, Lamp, AC/Heating, Fridge, WIFI, Fitness, Pool', 3, true, true, null, '00036'),
                        (4304, 150.99, '3-Bed, Bathroom, Toiletries, TV, Lamp, AC/Heating, Fridge, WIFI, Fitness', 3, true, true, null, '00036'),
                        (4305, 300.99, '4-Bed, Toiletries, TV, Alarm, Desk w/ Chair, Lamp, AC/Heating, Fridge, WIFI, Fitness, Pool', 4, true, true, null, '00036'),
                        (4401, 69.99, '2-Bed, Bathroom, TV, Alarm, Desk w/ Chair, Lamp, WIFI, Fitness', 2, true, true, null, '00037'),
						(4402, 120.99, '2-Bed, Bathroom, Toiletries, TV, Alarm, Desk w/ Chair, Lamp, AC/Heating, Fridge, WIFI, Fitness, Pool', 2, true, true, null, '00037'),
						(4403, 200.99, '3-Bed, Bathroom, Toiletries, TV, Alarm, Desk w/ Chair, Lamp, AC/Heating, Fridge, WIFI, Fitness, Pool', 3, true, true, null, '00037'),
                        (4404, 150.99, '3-Bed, Bathroom, Toiletries, TV, Lamp, AC/Heating, Fridge, WIFI, Fitness', 3, true, true, null, '00037'),
                        (4405, 300.99, '4-Bed, Toiletries, TV, Alarm, Desk w/ Chair, Lamp, AC/Heating, Fridge, WIFI, Fitness, Pool', 4, true, true, null, '00037'),
                        (4501, 69.99, '2-Bed, Bathroom, TV, Alarm, Desk w/ Chair, Lamp, WIFI, Fitness', 2, false, true, null, '00038'),
						(4502, 120.99, '2-Bed, Bathroom, Toiletries, TV, Alarm, Desk w/ Chair, Lamp, AC/Heating, Fridge, WIFI, Fitness, Pool', 2, true, true, null, '00038'),
						(4503, 200.99, '3-Bed, Bathroom, Toiletries, TV, Alarm, Desk w/ Chair, Lamp, AC/Heating, Fridge, WIFI, Fitness, Pool', 3, true, true, null, '00038'),
                        (4504, 150.99, '3-Bed, Bathroom, Toiletries, TV, Lamp, AC/Heating, Fridge, WIFI, Fitness', 3, true, true, null, '00038'),
                        (4505, 300.99, '4-Bed, Toiletries, TV, Alarm, Desk w/ Chair, Lamp, AC/Heating, Fridge, WIFI, Fitness, Pool', 4, true, true, null, '00038'),
                        (4601, 69.99, '2-Bed, Bathroom, TV, Alarm, Desk w/ Chair, Lamp, WIFI, Fitness', 2, true, false, null, '00039'),
						(4602, 120.99, '2-Bed, Bathroom, Toiletries, TV, Alarm, Desk w/ Chair, Lamp, AC/Heating, Fridge, WIFI, Fitness, Pool', 2, true, true, 'WIFI issues', '00039'),
						(4603, 200.99, '3-Bed, Bathroom, Toiletries, TV, Alarm, Desk w/ Chair, Lamp, AC/Heating, Fridge, WIFI, Fitness, Pool', 3, true, true, null, '00039'),
                        (4604, 150.99, '3-Bed, Bathroom, Toiletries, TV, Lamp, AC/Heating, Fridge, WIFI, Fitness', 3, true, true, null, '00039'),
                        (4605, 300.99, '4-Bed, Toiletries, TV, Alarm, Desk w/ Chair, Lamp, AC/Heating, Fridge, WIFI, Fitness, Pool', 4, true, true, null, '00039'),
                        (4701, 69.99, '2-Bed, Bathroom, TV, Alarm, Desk w/ Chair, Lamp, WIFI, Fitness', 2, true, true, null, '00040'),
						(4702, 120.99, '2-Bed, Bathroom, Toiletries, TV, Alarm, Desk w/ Chair, Lamp, AC/Heating, Fridge, WIFI, Fitness, Pool', 2, true, true, null, '00040'),
						(4703, 200.99, '3-Bed, Bathroom, Toiletries, TV, Alarm, Desk w/ Chair, Lamp, AC/Heating, Fridge, WIFI, Fitness, Pool', 3, true, true, null, '00040'),
                        (4704, 150.99, '3-Bed, Bathroom, Toiletries, TV, Lamp, AC/Heating, Fridge, WIFI, Fitness', 3, false, true, null, '00040'),
                        (4705, 300.99, '4-Bed, Toiletries, TV, Alarm, Desk w/ Chair, Lamp, AC/Heating, Fridge, WIFI, Fitness, Pool', 4, true, true, null, '00040');


/*----------------------------------------------------------------------EXAMPLE QUERIES----------------------------------------------------------------------*/

-- Hotels that have a rating of 4 or higher
SELECT * FROM hotel WHERE star_rating >= 4;


-- Show all rooms from every hotel_chain that have a view, that are extendable, and have no problems
SELECT price_per_night, amenities, capacity FROM room WHERE view = true AND extendable = true AND problems IS NULL;


-- All Employees that work at Paradise Beach Hotel Chain
SELECT full_name, position FROM employee WHERE hotel_ID IN (
	SELECT hotel_ID FROM hotel WHERE name = 'Paradise Beach Inc'
);


-- All rooms that provide AC/Heating functionality that are in Ottawa
SELECT * FROM room WHERE amenities LIKE '%AC/Heating%' 
AND hotel_ID IN (
	SELECT hotel_ID FROM hotel WHERE address LIKE '%Ottawa%'
)
ORDER BY room_number;

/*--------------------------------------------------------------------------------------------------------------------------------------------------------------*/

-- SQL Commands to DROP Database Tables (If Required)
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
