INSERT INTO pokemon_db.dbo.Pokemon(Icon)
SELECT BulkColumn
From Openrowset(Bulk 'C:\Users\asant\Documents\WikiUploader\src\input\Icons\001MS.png', Single_Blob) as PkmIcon

 UPDATE pokemon_db.dbo.Pokemon SET [Icon] = 
 (SELECT BulkColumn from Openrowset
 (Bulk 'C:\Users\asant\Documents\WikiUploader\src\input\Icons\007MS.png', Single_Blob) MyImage)
 where PokemonId = 7

  UPDATE pokemon_db.dbo.Pokemon SET [Artwork] = 
 (SELECT BulkColumn from Openrowset
 (Bulk 'C:\Users\asant\Pictures\006Jumblitzsmall.png', Single_Blob) MyImage)
 where PokemonId = 6