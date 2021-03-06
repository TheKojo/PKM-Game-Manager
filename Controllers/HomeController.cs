﻿using System;
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
            IEnumerable<Pokemon> pkmList = context.getPkm();
            return pkmList;
        }

        [HttpPost]
        [Route("api/Home/Moves")]
        public IEnumerable<MovePokemonMove> Moves(Pokemon pkm)
        {
            PkmContext context = HttpContext.RequestServices.GetService(typeof(pkm_game_manager.Models.PkmContext)) as PkmContext;
            IEnumerable<MovePokemonMove> moveList = context.getMoveList(pkm.PokemonId);
            return moveList;
        }

        [HttpPost]
        [Route("api/Home/SavePkm")]
        public IEnumerable<Pokemon> SavePkm(Pokemon pkm)//public IActionResult SavePkm(Pokemon pkm)
        {
            PkmContext context = HttpContext.RequestServices.GetService(typeof(pkm_game_manager.Models.PkmContext)) as PkmContext;
            context.savePokemon(pkm);
            //return View();
            IEnumerable<Pokemon> pkmList = context.getPkm();
            return pkmList;
        }

        [HttpGet]
        [Route("api/Home/PkmInfo")]
        public IEnumerable<Pokemon> PkmInfo(Pokemon pkm)
        {
            PkmContext context = HttpContext.RequestServices.GetService(typeof(pkm_game_manager.Models.PkmContext)) as PkmContext;
            IEnumerable<Pokemon> pkmList = context.Pokemon.ToList();
            return pkmList;
        }

        [HttpPost]
        [Route("api/Home/ExportMoves")]
        public ActionResult ExportMoves(Pokemon pkm)
        {
            PkmContext context = HttpContext.RequestServices.GetService(typeof(pkm_game_manager.Models.PkmContext)) as PkmContext;
            String moveText = context.exportMoveText(pkm);
            return Content(moveText);
        }

    }
}
 