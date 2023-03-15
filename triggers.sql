CREATE OR REPLACE FUNCTION decrease_Hotel_Count() /*Decreases number_of_hotels attribute in hotel_chain*/
	RETURNS TRIGGER AS							  /*depending on the number of hotels deleted/dropped*/
$$
DECLARE
	deleted_count integer; --declares intermediate variable to be used
BEGIN
	SELECT count(*) FROM old INTO deleted_count; --stores number of deleted rows
	UPDATE hotel_chain SET number_of_hotels = number_of_hotels - deleted_count WHERE old.name = hotel_chain.name;
	RETURN NULL;
END;
$$
LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION decrease_Room_Count() /*Decreases number_ofrooms attribute in hotel*/
	RETURNS TRIGGER AS							 /*depending on the number of rooms deleted/dropped*/
$$
DECLARE
	deleted_count integer; --declares intermediate variable to be used
BEGIN
	SELECT count(*) FROM old INTO deleted_count; --stores number of deleted  rows
	UPDATE hotel SET number_of_rooms = number_of_rooms - deleted_count WHERE old.hotel_ID = hotel.hotel_ID;
	RETURN NULL;
END;
$$
LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION increase_Hotel_Count()
RETURNS TRIGGER AS $$
BEGIN
	UPDATE hotel_chain
	SET number_of_hotels = number_of_hotels + New.num_elements_added
	WHERE hotel_chain.name = NEW.name;
	RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION increase_Room_Count()
RETURNS TRIGGER AS $$
BEGIN
	UPDATE hotel
	SET number_of_rooms = number_of_rooms + New.num_elements_added
	WHERE hotel.hotel_id = NEW.hotel_id;
	RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER decrease_Hotel_Count --trigger on hotel deletion
AFTER DELETE ON hotel
FOR EACH ROW
EXECUTE PROCEDURE decrease_Hotel_Count(); --executes function

CREATE TRIGGER decrease_Room_Count --trigger on room deletion
AFTER DELETE ON room
FOR EACH ROW
EXECUTE PROCEDURE decrease_Room_Count(); --executes function

CREATE TRIGGER increase_Hotel_Count
AFTER INSERT ON hotel
FOR EACH ROW
EXECUTE PROCEDURE increase_Hotel_Count();

CREATE TRIGGER increase_Room_Count
AFTER INSERT ON room
FOR EACH ROW
EXECUTE PROCEDURE increase_Room_Count();
