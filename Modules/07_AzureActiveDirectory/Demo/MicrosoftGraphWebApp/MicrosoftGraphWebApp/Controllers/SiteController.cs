using Microsoft.Graph;
using MicrosoftGraphWebApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;

namespace MicrosoftGraphWebApp.Controllers {

  [Authorize]
  public class SiteController : Controller {


    public async Task<ActionResult> Index(string id) {
      SiteResponse site = await MicrosoftGraphManager.GetSite(id);
      return View(site);      
    }

  }

}