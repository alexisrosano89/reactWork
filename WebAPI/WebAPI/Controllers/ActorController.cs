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
using System.IO;
using Microsoft.AspNetCore.Hosting;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ActorController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _environment;

        public ActorController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public JsonResult Get()
        {
            string query = @"select ActorId, ActorName, DateOfBir, PhotoFileName from dbo.Actor";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("CinemaAppConnection");
            SqlDataReader theReader;
            using (SqlConnection myConnection = new SqlConnection(sqlDataSource))
            {
                myConnection.Open();
                using (SqlCommand mySqlCommand = new SqlCommand(query, myConnection))
                {
                    theReader = mySqlCommand.ExecuteReader();
                    table.Load(theReader);
                    theReader.Close();
                    myConnection.Close();
                };
            };
            Console.WriteLine(new JsonResult(table));
            return new JsonResult(table);
        }

        [Route("SaveFile")]
        [HttpPost]
        public JsonResult SaveFile()
        {
            try
            {
                var httpRequest = Request.Form;
                var postedFile = httpRequest.Files[0];
                string filename = postedFile.FileName;
                var physicalPath = _environment.ContentRootPath + "/Photos/" + filename;

                using (var stream = new FileStream(physicalPath, FileMode.Create))
                {
                    postedFile.CopyTo(stream);
                }

                return new JsonResult(filename);
            }
            catch (Exception)
            {

                return new JsonResult("noPhoto.png");
            }
        }
    }
}
