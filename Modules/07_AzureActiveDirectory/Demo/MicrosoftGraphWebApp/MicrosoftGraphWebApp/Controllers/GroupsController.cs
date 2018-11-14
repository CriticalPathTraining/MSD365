using MicrosoftGraphWebApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;

namespace MicrosoftGraphWebApp.Controllers {

  [Authorize]
  public class GroupsController : Controller {
    public async Task<ActionResult> Index() {
      List<SiteResponse> sites = await MicrosoftGraphManager.GetGroups();
      return View(sites);
    }
  }

}