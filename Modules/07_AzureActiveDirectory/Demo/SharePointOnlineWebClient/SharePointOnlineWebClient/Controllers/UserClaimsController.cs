using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Web;
using System.Web.Mvc;

namespace SharePointOnlineWebClient.Controllers {

  [Authorize]
  public class UserClaimsController : Controller {

    public ActionResult Index() {

      ClaimsPrincipal currentUserClaims = ClaimsPrincipal.Current;

      return View(currentUserClaims);
    }
  }
}