using JogoVelha.Models;
using JogoVelha.Repositories;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace JogoVelha.Controllers
{
    [Route("api/v1/icon")]
    [ApiController]
    public class IconController : ControllerBase{
        private readonly IIconRepository iconRepository;

        public IconController(IIconRepository iconRepository){
            this.iconRepository = iconRepository;
        }        

        // GET api/v1/icon
        [HttpGet]
        public ActionResult<ReturnRequest> Get([FromQuery] int idicon, [FromQuery] string name){
            ReturnRequest result = new ReturnRequest();
            result.status = "success";
            if(idicon > 0){
                result.data = iconRepository.getById(idicon);
            }else{
                if (!string.IsNullOrEmpty(name)){
                    result.data = iconRepository.getByName(name);
                }else{
                    result.data = iconRepository.listAll();
                }
            }
            return result;

        }        

        // POST api/v1/icon
        [HttpPost]
        public ActionResult<ReturnRequest> Post([FromBody] Icon icon){
            ReturnRequest result = new ReturnRequest();
            result.status = "success";
            result.data = iconRepository.add(icon);
            return result;
        }

        // PUT api/v1/icon
        [HttpPut]
        public ActionResult<ReturnRequest> Put([FromQuery] int id, [FromBody] Icon icon){
            ReturnRequest result = new ReturnRequest();
            result.status = "success";
            result.data = iconRepository.update(id, icon);
            return result;
        }

        // DELETE api/v1/icon
        [HttpDelete]
        public ActionResult<ReturnRequest> Delete([FromQuery] int idicon){
            ReturnRequest result = new ReturnRequest();
            result.status = "success";
            result.data = iconRepository.delete(idicon);
            return result;
        }
    }
}
