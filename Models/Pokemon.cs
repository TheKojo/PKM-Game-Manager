using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace pkm_game_manager.Models
{
    public class Pokemon
    {
        private PkmContext context;

        public int PokemonId { get; set; }

        public int DexId { get; set; }

        public string Name { get; set; }

        public string InternalName { get; set; }

        public string Type1 { get; set; }

        public string Type2 { get; set; }

        public int HP { get; set; }

        public int Attack { get; set; }

        public int Defense { get; set; }

        public int SpAtk { get; set; }

        public int SpDef { get; set; }

        public int Speed { get; set; }

        public string GenderRate { get; set; }

        public string GrowthRate { get; set; }

        public int BaseEXP { get; set; }

        public int EVHP { get; set; }

        public int EVAttack { get; set; }

        public int EVDefense { get; set; }

        public int EVSpAtk { get; set; }

        public int EVSpDef { get; set; }

        public int EVSpeed { get; set; }

        public int Rareness { get; set; }

        public int Happiness { get; set; }

        public string Ability1 { get; set; }

        public string Ability2 { get; set; }

        public string HiddenAbility { get; set; }

        public string EggGroup1 { get; set; }

        public string EggGroup2 { get; set; }

        public int HatchSteps { get; set; }

        public double Height { get; set; }

        public double Weight { get; set; }

        public string Color { get; set; }

        public int Shape { get; set; }

        public string Habitat { get; set; }

        public int RegionalNum { get; set; }

        public string Kind { get; set; }

        public string DexEntry { get; set; }

        public int BattlerPlayerY { get; set; }

        public int BattlerEnemyY { get; set; }

        public int BattlerAltitude { get; set; }

        public byte[] Icon { get; set; }

        public byte[] FrontSprite { get; set; }

        public byte[] BackSprite { get; set; }

        public byte[] Artwork { get; set; }

        [NotMapped]
        public string IconStr { get; set; }

        [NotMapped]
        public string ArtworkStr { get; set; }

        [NotMapped]
        public string FrontSpriteStr { get; set; }

        [NotMapped]
        public string BackSpriteStr { get; set; }
    }
}
