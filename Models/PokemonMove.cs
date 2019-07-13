using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace pkm_game_manager.Models
{
    public class PokemonMove
    {
        private PkmContext context;

        public int PokemonMoveId { get; set; }

        public string MoveId { get; set; }

        public int PokemonId { get; set; }

        public int Level { get; set; }
    }
}
