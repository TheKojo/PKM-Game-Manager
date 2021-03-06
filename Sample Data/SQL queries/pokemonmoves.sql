/****** Script for SelectTopNRows command from SSMS  ******/
SELECT t3.Name, t2.Level as MoveLevel, t1.Name as MoveName, Type, Category, BP, PP, Accuracy
  FROM [pokemon_db].[dbo].[Move] t1
  inner join [pokemon_db].[dbo].[PokemonMove] t2 on t1.MoveId = t2.MoveId
  inner join [pokemon_db].[dbo].[Pokemon] t3 on t2.PokemonId = t3.PokemonId
    
  WHERE t2.PokemonId = 1
  ORDER BY t3.PokemonId, t2.Level
