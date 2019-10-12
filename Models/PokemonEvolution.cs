using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace pkm_game_manager.Models
{
    public class PokemonEvolution
    {
        private PkmContext context;

        public int PokemonEvolutionId { get; set; }

        public string EvolutionId { get; set; }

        public int PokemonId { get; set; }

        public string EvoPoke { get; set; }

        public int Level { get; set; }
        
        public string ItemId { get; set; }
        
        public string MoveId { get; set; }

        public int LocationId { get; set; }

        public string RequiredPoke { get; set; }
    }
}
