using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SharePointOnlineWebClient.Controllers {
  public class TokenCacheViewerController : Controller {
    public ActionResult Index() {
      return View(TokenManager.GetTokenCache());
    }
  }
}