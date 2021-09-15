using System;
using System.Collections.Generic;

#nullable disable

namespace WebAPI.Models
{
    public partial class Movie
    {
        public int MovieId { get; set; }
        public string MovieName { get; set; }
        public string MovieGenre { get; set; }

        //Navigation Properties
        //public List<MovieActor> MovieActorList { get; set; }

}
}
