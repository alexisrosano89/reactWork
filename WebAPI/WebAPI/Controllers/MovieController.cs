using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Data.SqlClient;
using System.Data;
using WebAPI.Models;
using Newtonsoft.Json;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MovieController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public MovieController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public JsonResult Get()
        {
            using (var context = new CinemaBDContext())
            {
                /*TODO - Group by MovieId */
                
                var data = from mov in context.Movies
                           join movact in context.MovieActors on mov.MovieId equals movact.MovieId
                           join act in context.Actors on movact.ActorId equals act.ActorId
                           select new { mov.MovieId, mov.MovieName, mov.MovieGenre, act.ActorName };

                var myEntity = data.ToList();
                return new JsonResult(myEntity);
            }
        }
    }
}
