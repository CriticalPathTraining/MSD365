using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Security.Claims;
using System.Web;
using System.Web.Mvc;
using System.Threading.Tasks;
using Microsoft.Azure.ActiveDirectory.GraphClient;
using Microsoft.IdentityModel.Clients.ActiveDirectory;
using Microsoft.Owin.Security;
using Microsoft.Owin.Security.Cookies;
using Microsoft.Owin.Security.OpenIdConnect;
using SharePointOnlineWebClient.Models;

namespace SharePointOnlineWebClient.Controllers {

  [Authorize]
  public class UserProfileController : Controller {

    private string resource = "https://graph.windows.net";

    // GET: UserProfile
    public ActionResult Index() {

      //ViewBag.AccessToken = GetAccessToken();

      return View();

    }

    public string GetAccessToken() {

      ApplicationDbContext db = new ApplicationDbContext();
      string clientId = ConfigurationManager.AppSettings["ida:ClientId"];
      string appKey = ConfigurationManager.AppSettings["ida:ClientSecret"];
      string aadInstance = ConfigurationManager.AppSettings["ida:AADInstance"];
      string tenantId = ConfigurationManager.AppSettings["ida:TenantId"];



      string Authority = aadInstance + tenantId;

      string claimIdName = ClaimTypes.NameIdentifier;
      string claimIdTenantId = "http://schemas.microsoft.com/identity/claims/tenantid";
      string claimIdUserId = "http://schemas.microsoft.com/identity/claims/objectidentifier";

      ClaimsPrincipal currentUserClaims = ClaimsPrincipal.Current;

      string signedInUserID = currentUserClaims.FindFirst(claimIdName).Value;
      string tenantID = currentUserClaims.FindFirst(claimIdTenantId).Value;
      string userObjectID = currentUserClaims.FindFirst(claimIdUserId).Value;

      // get a token for the Graph without triggering any user interaction (from the cache, via multi-resource refresh token, etc)
      ClientCredential clientcred = new ClientCredential(clientId, appKey);
      // initialize AuthenticationContext with the token cache of the currently signed in user, as kept in the app's database
      AuthenticationContext authenticationContext = new AuthenticationContext(aadInstance + tenantID, new ADALTokenCache(signedInUserID));
      AuthenticationResult authenticationResult =
        authenticationContext.AcquireTokenSilentAsync(resource,
                                                      clientcred,
                                                      new UserIdentifier(userObjectID, UserIdentifierType.UniqueId)).Result;
      return authenticationResult.AccessToken;
    }
  }
}
