/****** Script for SelectTopNRows command from SSMS  ******/
delete
  FROM [pokemon_db].[dbo].[Pokemon]
delete
  FROM [pokemon_db].[dbo].[PokemonMove]

  DBCC CHECKIDENT ('[pokemon_db].[dbo].[Pokemon]', RESEED, 0);
GO

