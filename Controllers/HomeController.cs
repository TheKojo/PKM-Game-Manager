using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using pkm_game_manager.Models;

namespace pkm_game_manager.Controllers
{
    public class HomeController : Controller
    {
        [HttpGet]
        [Route("api/Home/Index")]
        public IEnumerable<Pokemon> Index()
        {
            PkmContext context = HttpContext.RequestServices.GetService(typeof(pkm_game_manager.Models.PkmContext)) as PkmContext;
            IEnumerable<Pokemon> pkmList = context.Pokemon.ToList();
            return pkmList;
        }

    }
}
 