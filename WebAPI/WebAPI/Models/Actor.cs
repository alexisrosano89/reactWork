using System;
using System.Collections.Generic;

#nullable disable

namespace WebAPI.Models
{
    public partial class Actor
    {
        public int ActorId { get; set; }
        public string ActorName { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public string PhotoFileName { get; set; }

        //Navigation Properties
       // public List<MovieActor> MovieActorList { get; set; }
    }
}
