using JogoVelha.Models;
using JogoVelha.Repositories;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace JogoVelha.Controllers
{
    [Route("api/v1/roomplayer")]
    [ApiController]
    public class RoomPlayerController : ControllerBase{
        private readonly IRoomPlayerRepository roomPlayerRepository;
        private readonly IRoomRepository roomRepository;

        public RoomPlayerController(IRoomPlayerRepository roomPlayerRepository, IRoomRepository roomRepository){
            this.roomPlayerRepository = roomPlayerRepository;
            this.roomRepository = roomRepository;
        }

        // GET: api/v1/roomplayer
        [HttpGet]
        public ActionResult<ReturnRequest> Get([FromQuery] int idroom){
            ReturnRequest result = new ReturnRequest();
            result.status = "success";            
            if (idroom > 0){
                result.data = roomPlayerRepository.playersRoom(idroom);
            }else{
                result.data = roomPlayerRepository.availableRooms();
            }
            return result;
        }

        // POST api/v1/roomplayer
        [HttpPost]
        public ActionResult<ReturnRequest> Post([FromQuery] string nameroom, [FromQuery] int idplayer, [FromQuery] int idroom){
            ReturnRequest result = new ReturnRequest();
            result.status = "success";
            if (!string.IsNullOrEmpty(nameroom)){
                Room room = roomRepository.Add(nameroom);
                result.data = room;
                roomPlayerRepository.AddRoomPlayer(room.id, idplayer);
            }else{
                roomPlayerRepository.AddRoomPlayer(idroom, idplayer);
            }                            
            return result;
        }

        // DELETE api/v1/roomplayer
        [HttpDelete]
        public ActionResult<ReturnRequest> Delete([FromQuery] int idroom, [FromQuery] int idplayer){
            ReturnRequest result = new ReturnRequest();
            result.status = "success";
            roomPlayerRepository.RemoveRoomPlayer(idroom, idplayer);
            return Ok(result);
        }

    }
}
