CREATE TABLE Move (
	MoveID int IDENTITY(1,1) PRIMARY KEY,
	InternalName varchar(255),
	Name varchar(255),
	Type varchar(255),
	Category varchar(255),
	BP int,
	PP int,
	Accuracy int,
    )


CREATE TABLE PokemonMove (
	PokemonMoveID int IDENTITY(1,1) PRIMARY KEY,
	PokemonId int,
	MoveId int,
	Level int
    )



CREATE TABLE Move (
	MoveID varchar(255) PRIMARY KEY,
	Name varchar(255),
	Type varchar(255),
	Category varchar(255),
	BP int,
	PP int,
	Accuracy int,
    )

CREATE TABLE PokemonMove (
	PokemonMoveID int IDENTITY(1,1) PRIMARY KEY,
	PokemonId int,
	MoveId varchar(255),
	Level int
    )

