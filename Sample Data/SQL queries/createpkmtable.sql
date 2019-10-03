CREATE TABLE Pokemon (
	PokemonID int IDENTITY(1,1) PRIMARY KEY,
    DexID int,
    Name varchar(255),
    InternalName varchar(255),
    Type1 varchar(255),
    Type2 varchar(255),
    HP int,
    Attack int,
    Defense int,
    SpAtk int,
    SpDef int,
    Speed int,
    GenderRate varchar(255),
    GrowthRate varchar(255),
    BaseEXP int,
    EVHP int,
    EVAttack int,
    EVDefense int,
    EVSpAtk int,
    EVSpDef int,
    EVSpeed int,
    Rareness int,
    Happiness int,
    Ability1 varchar(255),
	Ability2 varchar(255),
	HiddenAbility varchar(255),
    EggGroup1 varchar(255),
    EggGroup2 varchar(255),
    HatchSteps int,
    Height float,
    Weight float,
    Color varchar(255),
    Shape int,
    Habitat varchar(255),
    RegionalNum int,
    Kind varchar(255),
    DexEntry varchar(255),
    BattlerPlayerY int,
    BattlerEnemyY int,
    BattlerAltitude int,
	Icon image,
	FrontSprite image,
	BackSprite image,
	Artwork image
    )