using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.Web;
using pkm_game_manager.Models;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace pkm_game_manager.Controllers
{

    public class ImportController : Controller
    {
        //PkmContext context = HttpContext.RequestServices.GetService(typeof(pkm_game_manager.Models.PkmContext)) as PkmContext;

        /*PkmContext context;

        public ImportController(PkmContext newContext)
        {
            context = newContext;
        }*/


        // GET: /<controller>/
        [HttpGet]
        [Route("api/Import/Index")]
        public IActionResult Index()
        {
            return View();
        }

        [HttpPost, ActionName("Index")]
        [Route("api/Import/SubmitPBS")]
        public IActionResult SubmitPBS(PBSPkm pbsText)
        {
            //info will pass after making name attribute in form same as the model column names
            PkmContext context = HttpContext.RequestServices.GetService(typeof(pkm_game_manager.Models.PkmContext)) as PkmContext;
            if (pbsText.PBSType.Equals("Pokemon"))
            {
                context.addPBS(pbsText.Text);
            }
            else if (pbsText.PBSType.Equals("Move"))
            {
                context.addMoves(pbsText.Text);
            }
            
            //return 0;
            return View();
        }
    }
}
