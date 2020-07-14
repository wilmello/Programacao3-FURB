using JogoVelha.Models;
using JogoVelha.Repositories;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace JogoVelha.Controllers
{
    [Route("api/v1/room")]
    [ApiController]
    public class RoomController : ControllerBase{
        private readonly IRoomRepository roomRepository;
        public RoomController(IRoomRepository roomRepository){
            this.roomRepository = roomRepository;
        }

        // GET api/v1/room
        [HttpGet]
        public ActionResult<ReturnRequest> Get([FromQuery] int idroom){
            ReturnRequest result = new ReturnRequest();
            result.status = "success";
            if (idroom > 0){
                result.data = roomRepository.getById(idroom);
            }else{
                result.data = roomRepository.ListAll();
            }
            return result;
        }

        // POST api/v1/room/teste
        [HttpPost]
        public ActionResult<ReturnRequest> Post([FromQuery] string nameroom)
        {
            ReturnRequest result = new ReturnRequest();
            result.status = "success";
            if (!string.IsNullOrEmpty(nameroom)){
                result.data = roomRepository.Add(nameroom);                
            }
            return Ok(result);
        }
    }
}
