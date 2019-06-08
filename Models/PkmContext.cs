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
                    cmd.Parameters.AddWithValue("@Ability", pkmList[i].Ability);
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

                pkm.Height = 1.2;
                pkm.Weight = 1.2;

                pkmList.Add(pkm);
                if (pbs.IndexOf("[") == -1)
                {
                    pbs = "";
                }
            }


            return pkmList;
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
