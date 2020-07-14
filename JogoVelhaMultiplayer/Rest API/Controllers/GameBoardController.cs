using JogoVelha.Models;
using JogoVelha.Repositories;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace JogoVelha.Controllers
{
    [Route("api/v1/gameboard")]
    [ApiController]
    public class GameBoardController : ControllerBase{
        private readonly IGameBoardRepository gameBoardRepository;
        public GameBoardController(IGameBoardRepository gameBoardRepository){
            this.gameBoardRepository = gameBoardRepository;
        }
        // GET api/v1/gameboard
        [HttpGet]
        public ActionResult<ReturnRequest> Get([FromQuery] int idroom, [FromQuery] int idplayer){
            ReturnRequest result = new ReturnRequest();
            result.status = "success";
            List<GameBoard> gameBoards = new List<GameBoard>();
            GameBoard myGameBoard = gameBoardRepository.getOpponentGameBoard(idroom, idplayer);
            if(myGameBoard != null){
                gameBoards.Add(myGameBoard);
            }
            GameBoard gameBoardOpponent = gameBoardRepository.getMyGameBoard(idroom, idplayer);
            if(gameBoardOpponent != null){
                gameBoards.Add(gameBoardOpponent);
            }                
            result.data = gameBoards;
            return Ok(result);
        }

        // POST api/v1/gameboard
        [HttpPost]
        public ActionResult<ReturnRequest> Post([FromQuery] int idroom){
            ReturnRequest result = new ReturnRequest();
            result.status = "success";
            gameBoardRepository.createBoard(idroom);
            return Ok(result);
        }

        // PUT api/v1/gameboard
        [HttpPut]
        public ActionResult<ReturnRequest> Put([FromQuery] int idroom, [FromQuery] int idplayer, [FromQuery] int pos){
            ReturnRequest result = new ReturnRequest();
            result.status = "success";
            gameBoardRepository.updateBoard(idroom, idplayer, pos);
            return Ok(result);
        }

        // DELETE api/v1/gameboard
        [HttpDelete]
        public ActionResult<ReturnRequest> Delete([FromQuery] int idroom, [FromQuery] int idplayer){
            ReturnRequest result = new ReturnRequest();
            result.status = "success";
            gameBoardRepository.destroyBoard(idroom, idplayer);
            return result;
        }
    }
}
