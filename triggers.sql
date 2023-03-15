CREATE OR REPLACE FUNCTION update_Hotel_Count()
	RETURNS TRIGGER AS
$BODY$
BEGIN
	UPDATE hotel_chain
	SET number_of_hotels = number_of_hotels - 1
	WHERE name = OLD.name;
	RETURN OLD;
END;
$BODY$
LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION update_Room_Count()
	RETURNS TRIGGER AS
$BODY$
BEGIN
	UPDATE hotel
	SET number_of_rooms = number_of_rooms - 1
	WHERE name = OLD.name;
	RETURN OLD;
END;
$BODY$
LANGUAGE plpgsql;