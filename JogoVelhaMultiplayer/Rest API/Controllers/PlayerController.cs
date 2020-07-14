using JogoVelha.Models;
using JogoVelha.Repositories;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace JogoVelha.Controllers
{
    [Route("api/v1/player")]
    [ApiController]
    public class PlayerController : ControllerBase{

        private readonly IPlayerRepository playerRepository;
        public PlayerController(IPlayerRepository playerRepository){
            this.playerRepository = playerRepository;
        }
        
        // GET api/v1/player
        [HttpGet]
        public ActionResult<ReturnRequest> Get([FromQuery] int idplayer, [FromQuery] string name, [FromQuery] string password){
            ReturnRequest result = new ReturnRequest();
            result.status = "success";
            if (idplayer != 0) {
                result.data = playerRepository.getById(idplayer);
            }else{
                if (!string.IsNullOrEmpty(name) 
                &&  !string.IsNullOrEmpty(password)) { 
                    result.data = playerRepository.getByName(name, password);
                }else{
                    result.data = playerRepository.ListAll();
                }
            }            
            return result;
        }        

        // POST api/v1/player
        [HttpPost]
        public ActionResult<ReturnRequest> Post([FromBody] Player player){
            ReturnRequest result = new ReturnRequest();
            result.status = "success";
            result.data = playerRepository.add(player);
            return Ok(result);
        }

        // PUT api/v1/player
        [HttpPut]
        public ActionResult<ReturnRequest> Put([FromQuery] int idplayer, [FromBody] Player player){
            ReturnRequest result = new ReturnRequest();
            result.status = "success";
            result.data = playerRepository.update(idplayer, player);
            return result;
        }
    }
}
