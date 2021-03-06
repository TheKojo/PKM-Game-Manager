﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace pkm_game_manager.Models
{
    public class MovePokemonMove
    {
        public string MoveId { get; set; }

        public string Name { get; set; }

        public string Type { get; set; }

        public string Category { get; set; }

        public int BP { get; set; }

        public int PP { get; set; }

        public int Accuracy { get; set; }

        public int PokemonId { get; set; }

        public int Level { get; set; }
    }
}
