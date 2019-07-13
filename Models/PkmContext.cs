using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace pkm_game_manager.Models
{
    public class PkmContext : DbContext
    {
        public string ConnectionString { get; set; }

        public virtual DbSet<Pokemon> Pokemon { get; set; }

        public virtual DbSet<Move> Move { get; set; }

        public virtual DbSet<PokemonMove> PokemonMove { get; set; }

        /*public PkmContext(string connectionString)
        {
            this.ConnectionString = connectionString;
        }*/

        public PkmContext(DbContextOptions<PkmContext> options, IConfiguration configuration) : base(options)
        {
            //int test = 1;
            this.ConnectionString = configuration.GetConnectionString("PkmContext");
            //var thing = options.FindExtension<SqlServerOptionsExtension>()
            //this.ConnectionString = options.Extensions.
        }

        private MySqlConnection GetConnection()
        {
            return new MySqlConnection(ConnectionString);
        }

        public void addPBS(string pbs)
        {
            List<Pokemon> pkmList = parsePBS(pbs);
            using (MySqlConnection conn = GetConnection())
            {
                conn.Open();
                for (int i = 0; i<pkmList.Count; i++)
                {
                    MySqlCommand cmd = new MySqlCommand();
                    cmd.Connection = conn;
                    cmd.CommandText = "INSERT INTO pkm_schema.pokemon VALUES(" +
                        "NULL, @DexId, @Name, @InternalName, @Type1, @Type2, " +
                        "@HP, @Attack, @Defense, @SpAtk, @SpDef, @Speed, " +
                        "@GenderRate, @GrowthRate, @BaseEXP, " +
                        "@EVHP, @EVAttack, @EVDefense, @EVSpAtk, @EVSpDef, @EVSpeed," +
                        "@Rareness, @Happiness, @Ability, @EggGroup1, @EggGroup2," +
                        "@HatchSteps, @Height, @Weight, @Color, @Shape, @Habitat," +
                        "@RegionalNum, @Kind, @DexEntry," +
                        "@BattlerPlayerY, @BattlerEnemyY, @BattlerAltitude)";
                    cmd.Parameters.AddWithValue("@DexId", pkmList[i].DexId);
                    cmd.Parameters.AddWithValue("@Name", pkmList[i].Name);
                    cmd.Parameters.AddWithValue("@InternalName", pkmList[i].InternalName);
                    cmd.Parameters.AddWithValue("@Type1", pkmList[i].Type1);
                    cmd.Parameters.AddWithValue("@Type2", pkmList[i].Type2);
                    cmd.Parameters.AddWithValue("@HP", pkmList[i].HP);
                    cmd.Parameters.AddWithValue("@Attack", pkmList[i].Attack);
                    cmd.Parameters.AddWithValue("@Defense", pkmList[i].Defense);
                    cmd.Parameters.AddWithValue("@SpAtk", pkmList[i].SpAtk);
                    cmd.Parameters.AddWithValue("@SpDef", pkmList[i].SpDef);
                    cmd.Parameters.AddWithValue("@Speed", pkmList[i].Speed);
                    cmd.Parameters.AddWithValue("@GenderRate", pkmList[i].GenderRate);
                    cmd.Parameters.AddWithValue("@GrowthRate", pkmList[i].GrowthRate);
                    cmd.Parameters.AddWithValue("@BaseEXP", pkmList[i].BaseEXP);
                    cmd.Parameters.AddWithValue("@EVHP", pkmList[i].EVHP);
                    cmd.Parameters.AddWithValue("@EVAttack", pkmList[i].EVAttack);
                    cmd.Parameters.AddWithValue("@EVDefense", pkmList[i].EVDefense);
                    cmd.Parameters.AddWithValue("@EVSpAtk", pkmList[i].EVSpAtk);
                    cmd.Parameters.AddWithValue("@EVSpDef", pkmList[i].SpDef);
                    cmd.Parameters.AddWithValue("@EVSpeed", pkmList[i].Speed);
                    cmd.Parameters.AddWithValue("@Rareness", pkmList[i].Rareness);
                    cmd.Parameters.AddWithValue("@Happiness", pkmList[i].Happiness);
                    cmd.Parameters.AddWithValue("@Ability", pkmList[i].Ability1);
                    cmd.Parameters.AddWithValue("@EggGroup1", pkmList[i].EggGroup1);
                    cmd.Parameters.AddWithValue("@EggGroup2", pkmList[i].EggGroup2);
                    cmd.Parameters.AddWithValue("@HatchSteps", pkmList[i].HatchSteps);
                    cmd.Parameters.AddWithValue("@Height", pkmList[i].Height);
                    cmd.Parameters.AddWithValue("@Weight", pkmList[i].Weight);
                    cmd.Parameters.AddWithValue("@Color", pkmList[i].Color);
                    cmd.Parameters.AddWithValue("@Shape", pkmList[i].Shape);
                    cmd.Parameters.AddWithValue("@Habitat", pkmList[i].Habitat);
                    cmd.Parameters.AddWithValue("@RegionalNum", pkmList[i].RegionalNum);
                    cmd.Parameters.AddWithValue("@Kind", pkmList[i].Kind);
                    cmd.Parameters.AddWithValue("@DexEntry", pkmList[i].DexEntry);
                    cmd.Parameters.AddWithValue("@BattlerPlayerY", pkmList[i].BattlerPlayerY);
                    cmd.Parameters.AddWithValue("@BattlerEnemyY", pkmList[i].BattlerEnemyY);
                    cmd.Parameters.AddWithValue("@BattlerAltitude", pkmList[i].BattlerAltitude);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void addPBStest(string pbs)
        {
            List<Pokemon> pkmList = parsePBS(pbs);
            for (int i = 0; i < pkmList.Count; i++)
            {
                Pokemon.Add(pkmList[i]);
                SaveChanges();
            }
        }



        public List<Pokemon> parsePBS(string pbs)
        {
            List<Pokemon> pkmList = new List<Pokemon>();
            //List<PokemonMove> pkmMoveList = new List<PokemonMove>;

            while (pbs.Length>0)
            {
                Pokemon pkm = new Pokemon();
                pbs = pbs.Substring(pbs.IndexOf("["));

                //DexId
                string id = pbs.Substring(pbs.IndexOf("[") + 1, pbs.IndexOf("]")-1);
                pkm.DexId = Int32.Parse(id);
                pbs = pbs.Substring(pbs.IndexOf("["));

                //Name
                pbs = pbs.Substring(pbs.IndexOf("Name"));
                string name = pbs.Substring(pbs.IndexOf("=") + 1, (pbs.IndexOf("\r\n") - 1 - pbs.IndexOf("=")));
                pkm.Name = name;

                //InternalName
                pbs = pbs.Substring(pbs.IndexOf("InternalName"));
                string intName = pbs.Substring(pbs.IndexOf("=") + 1, (pbs.IndexOf("\r\n") - 1 - pbs.IndexOf("=")));
                pkm.InternalName = intName;

                //Type1
                pbs = pbs.Substring(pbs.IndexOf("Type1"));
                string type1 = pbs.Substring(pbs.IndexOf("=") + 1, (pbs.IndexOf("\r\n") - 1 - pbs.IndexOf("=")));
                pkm.Type1 = type1;
                pbs = pbs.Substring(pbs.IndexOf("\r\n")+2);

                if (pbs.IndexOf("Type2") == 0)
                {
                    //Type2
                    pbs = pbs.Substring(pbs.IndexOf("Type2"));
                    string type2 = pbs.Substring(pbs.IndexOf("=") + 1, (pbs.IndexOf("\r\n") - 1 - pbs.IndexOf("=")));
                    pkm.Type2 = type2;
                    pbs = pbs.Substring(pbs.IndexOf("\r\n") + 2);
                }

                //HP
                pbs = pbs.Substring(pbs.IndexOf("BaseStats"));
                string hp = pbs.Substring(pbs.IndexOf("=") + 1, (pbs.IndexOf(",") - 1 - pbs.IndexOf("=")));
                pkm.HP = Int32.Parse(hp);

                //Attack
                pbs = pbs.Substring(pbs.IndexOf(",") + 1);
                string attack = pbs.Substring(0, pbs.IndexOf(","));
                pkm.Attack = Int32.Parse(attack);

                //Defense
                pbs = pbs.Substring(pbs.IndexOf(",")+1);
                string defense = pbs.Substring(0, pbs.IndexOf(","));
                pkm.Defense = Int32.Parse(defense);

                //Speed
                pbs = pbs.Substring(pbs.IndexOf(",") + 1);
                string speed = pbs.Substring(0, pbs.IndexOf(","));
                pkm.Speed = Int32.Parse(speed);

                //SpAtk
                pbs = pbs.Substring(pbs.IndexOf(",") + 1);
                string spatk = pbs.Substring(0, pbs.IndexOf(","));
                pkm.SpAtk = Int32.Parse(spatk);

                //SpDef
                pbs = pbs.Substring(pbs.IndexOf(",") + 1);
                string spdef = pbs.Substring(0, pbs.IndexOf("\r\n"));
                pkm.SpDef = Int32.Parse(spdef);

                //GenderRate
                pbs = pbs.Substring(pbs.IndexOf("GenderRate"));
                string genderRate = pbs.Substring(pbs.IndexOf("=") + 1, (pbs.IndexOf("\r\n") - 1 - pbs.IndexOf("=")));
                pkm.GenderRate = genderRate;

                //GrowthRate
                pbs = pbs.Substring(pbs.IndexOf("GrowthRate"));
                string growthRate = pbs.Substring(pbs.IndexOf("=") + 1, (pbs.IndexOf("\r\n") - 1 - pbs.IndexOf("=")));
                pkm.GrowthRate = growthRate;

                //BaseEXP
                pbs = pbs.Substring(pbs.IndexOf("BaseEXP"));
                string baseExp = pbs.Substring(pbs.IndexOf("=") + 1, (pbs.IndexOf("\r\n") - 1 - pbs.IndexOf("=")));
                pkm.BaseEXP = Int32.Parse(baseExp);

                //EVHP
                pbs = pbs.Substring(pbs.IndexOf("EffortPoints"));
                string evhp = pbs.Substring(pbs.IndexOf("=") + 1, (pbs.IndexOf(",") - 1 - pbs.IndexOf("=")));
                pkm.EVHP = Int32.Parse(evhp);

                //EVAttack
                pbs = pbs.Substring(pbs.IndexOf(",") + 1);
                string evattack = pbs.Substring(0, pbs.IndexOf(","));
                pkm.EVAttack = Int32.Parse(evattack);

                //EVDefense
                pbs = pbs.Substring(pbs.IndexOf(",") + 1);
                string evdefense = pbs.Substring(0, pbs.IndexOf(","));
                pkm.EVDefense = Int32.Parse(evdefense);

                //EVSpeed
                pbs = pbs.Substring(pbs.IndexOf(",") + 1);
                string evspeed = pbs.Substring(0, pbs.IndexOf(","));
                pkm.EVSpeed = Int32.Parse(evspeed);

                //EVSpAtk
                pbs = pbs.Substring(pbs.IndexOf(",") + 1);
                string evspatk = pbs.Substring(0, pbs.IndexOf(","));
                pkm.EVSpAtk = Int32.Parse(evspatk);

                //EVSpDef
                pbs = pbs.Substring(pbs.IndexOf(",") + 1);
                string evspdef = pbs.Substring(0, pbs.IndexOf("\r\n"));
                pkm.EVSpDef = Int32.Parse(evspdef);

                //Rareness
                pbs = pbs.Substring(pbs.IndexOf("Rareness"));
                string rareness = pbs.Substring(pbs.IndexOf("=") + 1, (pbs.IndexOf("\r\n") - 1 - pbs.IndexOf("=")));
                pkm.Rareness = Int32.Parse(rareness);

                //Happiness
                pbs = pbs.Substring(pbs.IndexOf("Happiness"));
                string happiness = pbs.Substring(pbs.IndexOf("=") + 1, (pbs.IndexOf("\r\n") - 1 - pbs.IndexOf("=")));
                pkm.Happiness = Int32.Parse(happiness);

                //Ability1 & 2
                pbs = pbs.Substring(pbs.IndexOf("Abilities"));
                pbs = pbs.Substring(pbs.IndexOf("=") + 1);
                string ability1 = "";
                if (pbs.IndexOf("\r\n") > pbs.IndexOf(",") && pbs.IndexOf(",") != -1)
                {
                    ability1 = pbs.Substring(0, pbs.IndexOf(","));
                    pkm.Ability1 = ability1;
                    pbs = pbs.Substring(pbs.IndexOf(",") + 1);
                    string ability2 = pbs.Substring(0, pbs.IndexOf("\r\n"));
                    pkm.Ability2 = ability2;
                }
                else
                {
                    ability1 = pbs.Substring(0, pbs.IndexOf("\r\n"));
                    pkm.EggGroup1 = ability1;
                }
                
                pkm.Ability1 = ability1;


                /*if (pbs.IndexOf("HiddenAbility=") < pbs.IndexOf("Moves="))
                {
                    pbs = pbs.Substring(pbs.IndexOf("HiddenAbility"));
                }*/


                //Moves
                pbs = pbs.Substring(pbs.IndexOf("Moves"));
                pbs = pbs.Substring(pbs.IndexOf("=") + 1);

                while (pbs.IndexOf("\n") != 0)
                {
                    PokemonMove move = new PokemonMove();
                    string lv = pbs.Substring(0, pbs.IndexOf(","));
                    move.Level = Int32.Parse(lv);

                    pbs = pbs.Substring(pbs.IndexOf(",")+1);

                    int nextTokenPos = Math.Min(pbs.IndexOf(","), pbs.IndexOf("\r\n"));
                    if (pbs.IndexOf(",") == -1){
                        nextTokenPos = pbs.IndexOf("\r\n");
                    }
                        string moveName = pbs.Substring(0, nextTokenPos);
                    move.MoveId = moveName;
                    move.PokemonId = pkmList.Count()+1;
                    pbs = pbs.Substring(nextTokenPos+1);
                     
                    PokemonMove.Add(move);
                }

                //Egg Group 1 & 2
                pbs = pbs.Substring(pbs.IndexOf("Compatibility"));
                pbs = pbs.Substring(pbs.IndexOf("=")+1);
                string egg1 = "";
                if ((pbs.IndexOf("\r\n") > pbs.IndexOf(",")) && pbs.IndexOf(",") != -1)
                {
                    egg1 = pbs.Substring(0, pbs.IndexOf(","));
                    pkm.EggGroup1 = egg1;
                    pbs = pbs.Substring(pbs.IndexOf(",") + 1);
                    string egg2 = pbs.Substring(0, pbs.IndexOf("\r\n"));
                    pkm.EggGroup2 = egg2;
                }
                else
                {
                    egg1 = pbs.Substring(0, pbs.IndexOf("\r\n"));
                    pkm.EggGroup1 = egg1;
                }

                //HatchSteps
                pbs = pbs.Substring(pbs.IndexOf("StepsToHatch"));
                pbs = pbs.Substring(pbs.IndexOf("=") + 1);
                string hatchSteps = pbs.Substring(0, pbs.IndexOf("\r\n"));
                pkm.HatchSteps = Int32.Parse(hatchSteps);

                //Height
                pbs = pbs.Substring(pbs.IndexOf("Height"));
                pbs = pbs.Substring(pbs.IndexOf("=") + 1);
                string height = pbs.Substring(0, pbs.IndexOf("\r\n"));
                pkm.Height = Double.Parse(height);

                //Weight
                pbs = pbs.Substring(pbs.IndexOf("Weight"));
                pbs = pbs.Substring(pbs.IndexOf("=") + 1);
                string weight = pbs.Substring(0, pbs.IndexOf("\r\n"));
                pkm.Height = Double.Parse(weight);

                //Color
                pbs = pbs.Substring(pbs.IndexOf("Color"));
                pbs = pbs.Substring(pbs.IndexOf("=") + 1);
                pkm.Color = pbs.Substring(0, pbs.IndexOf("\r\n"));

                //Shape
                pbs = pbs.Substring(pbs.IndexOf("Shape"));
                pbs = pbs.Substring(pbs.IndexOf("=") + 1);
                pkm.Shape = Int32.Parse(pbs.Substring(0, pbs.IndexOf("\r\n")));

                //Habitat
                pbs = pbs.Substring(pbs.IndexOf("Habitat"));
                pbs = pbs.Substring(pbs.IndexOf("=") + 1);
                pkm.Habitat = pbs.Substring(0, pbs.IndexOf("\r\n"));

                //Kind
                pbs = pbs.Substring(pbs.IndexOf("Kind"));
                pbs = pbs.Substring(pbs.IndexOf("=") + 1);
                pkm.Kind = pbs.Substring(0, pbs.IndexOf("\r\n"));

                //Pokedex
                pbs = pbs.Substring(pbs.IndexOf("Pokedex"));
                pbs = pbs.Substring(pbs.IndexOf("=") + 1);
                //pkm.DexEntry = pbs.Substring(0, pbs.IndexOf("\r\n"));


                pkmList.Add(pkm);
                if (pbs.IndexOf("[") == -1)
                {
                    pbs = "";
                }
            }


            return pkmList;
        }

        public void addMoves(string pbs)
        {
            List<Move> moveList = parseMoves(pbs);
            for (int i = 0; i < moveList.Count; i++)
            {
                Move.Add(moveList[i]);
                SaveChanges();
            }
        }

        public List<Move> parseMoves(string pbs)
        {
            List<Move> moveList = new List<Move>();

            while (pbs.Length > 0)
            {
                Move move = new Move();

                //Name
                pbs = pbs.Substring(pbs.IndexOf(",") + 1);
                move.MoveId = pbs.Substring(0, pbs.IndexOf(","));
                pbs = pbs.Substring(pbs.IndexOf(",") + 1);
                move.Name = pbs.Substring(0, pbs.IndexOf(","));
                 
                //BP
                pbs = pbs.Substring(pbs.IndexOf(",") + 1);
                pbs = pbs.Substring(pbs.IndexOf(",") + 1);
                string bpStr = pbs.Substring(0, pbs.IndexOf(","));
                move.BP = Int32.Parse(bpStr);

                //Type
                pbs = pbs.Substring(pbs.IndexOf(",") + 1);
                move.Type = pbs.Substring(0, pbs.IndexOf(","));

                //Category
                pbs = pbs.Substring(pbs.IndexOf(",") + 1);
                move.Category = pbs.Substring(0, pbs.IndexOf(","));

                //Accuracy
                pbs = pbs.Substring(pbs.IndexOf(",") + 1);
                move.Accuracy = Int32.Parse(pbs.Substring(0, pbs.IndexOf(",")));

                //PP
                pbs = pbs.Substring(pbs.IndexOf(",") + 1);
                move.PP = Int32.Parse(pbs.Substring(0, pbs.IndexOf(",")));

                if (pbs.IndexOf("\r\n") == -1){
                    pbs = "";
                }
                else{
                    pbs = pbs.Substring(pbs.IndexOf("\r\n") + 1);
                }
                
                moveList.Add(move);
            }

            return moveList;
        }

        public void savePokemon(Pokemon pkm)
        {
            Pokemon.Update(pkm);
            SaveChanges();
        }

        public List<MovePokemonMove> getMoveList (int pkmId)
        {
            var moveList = Move.Join(PokemonMove,
                m => m.MoveId,
                pm => pm.MoveId,
                (m, pm) => new MovePokemonMove { MoveId = m.MoveId, Name = m.Name, Level = pm.Level,
                    Type = m.Type, Category = m.Category,
                    BP = m.BP, Accuracy = m.Accuracy, PP = m.PP, PokemonId = pm.PokemonId})
                .Where(p => p.PokemonId == pkmId).OrderBy(l => l.Level).ToList();
            //List<PokemonMove> moveList = (PokemonMove.Where(p => p.PokemonId == pkmId)).OrderBy(l => l.Level).ToList();

            return moveList;
        }


        public string getName(int id)
        {
            string name = "";
            using (MySqlConnection conn = GetConnection())
            {
                conn.Open();
                MySqlCommand cmd = new MySqlCommand("SELECT Name FROM pkm_schema.pokemon WHERE PokemonId = " + id, conn);

                using (var reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        name = reader["name"].ToString();
                    }
                }

            }

            return name;
        }
    }
}
