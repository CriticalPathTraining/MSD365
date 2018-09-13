﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using MicrosoftGraphWebApp.Models;

namespace MicrosoftGraphWebApp.Controllers {

  [Authorize]
  public class SitesController : Controller {

    public async Task<ActionResult> Index() {
      List<SiteResponse> sites = await MicrosoftGraphManager.GetSites();
      return View(sites);
    }

  }
}