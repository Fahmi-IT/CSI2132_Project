CREATE OR REPLACE FUNCTION decrement_numRooms()
RETURNS TRIGGER AS
$$
BEGIN
	UPDATE hotel SET number_of_rooms = number_of_rooms - 1 WHERE hotel_id = OLD.hotel_id;
	RETURN OLD;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER decrement_numRooms
AFTER DELETE ON room
FOR EACH ROW
EXECUTE FUNCTION decrement_numRooms();

CREATE OR REPLACE FUNCTION increment_numRooms()
RETURNS TRIGGER AS
$$
BEGIN
	UPDATE hotel SET number_of_rooms = number_of_rooms + 1 WHERE hotel_id = NEW.hotel_id;
	RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER increment_numRooms
AFTER INSERT ON room
FOR EACH ROW
EXECUTE FUNCTION increment_numRooms();

CREATE OR REPLACE FUNCTION decrement_numHotels()
RETURNS TRIGGER AS
$$
BEGIN
	UPDATE hotel_chain SET number_of_hotels = number_of_hotels - 1 WHERE name = OLD.name;
	RETURN OLD;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER decrement_numHotels
AFTER DELETE ON hotel
FOR EACH ROW
EXECUTE FUNCTION decrement_numHotels();

CREATE OR REPLACE FUNCTION increment_numHotels()
RETURNS TRIGGER AS
$$
BEGIN
	UPDATE hotel_chain SET number_of_hotels = number_of_hotels + 1 WHERE name = NEW.name;
	RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER increment_numHotels
AFTER INSERT ON hotel
FOR EACH ROW
EXECUTE FUNCTION increment_numHotels();
