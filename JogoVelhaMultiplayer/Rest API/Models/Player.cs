using System;

namespace JogoVelha.Models
{
    public class Player
    {
        public int id { get; set; }
        public string nickname { get; set; }
        public string password { get; set; }
        public int score { get; set; }
        public Boolean active { get; set; }
        public int icongame { get; set; }
    }
}
