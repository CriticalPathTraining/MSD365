using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using Microsoft.Graph;
using MicrosoftGraphWebApp.Models;

namespace MicrosoftGraphWebApp.Controllers {

  [Authorize]
  public class UsersController : Controller {

    public async Task<ActionResult> Index() {
      List<User> users = await MicrosoftGraphManager.GetUsers();
      return View(users);
    }

  }

}