CREATE OR REPLACE FUNCTION update_table2()
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