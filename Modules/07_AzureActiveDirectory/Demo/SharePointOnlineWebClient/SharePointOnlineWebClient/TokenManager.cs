using Microsoft.IdentityModel.Clients.ActiveDirectory;
using SharePointOnlineWebClient.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Security.Claims;
using System.Web;

namespace SharePointOnlineWebClient {
  public class TokenManager {

  
    public static string GetAccessToken(string resource) {

      // get ClaimsPrincipal for current user
      ClaimsPrincipal currentUserClaims = ClaimsPrincipal.Current;
      string signedInUserID = currentUserClaims.FindFirst(ClaimTypes.NameIdentifier).Value;
      string tenantID = currentUserClaims.FindFirst("http://schemas.microsoft.com/identity/claims/tenantid").Value;
      string userObjectID = currentUserClaims.FindFirst("http://schemas.microsoft.com/identity/claims/objectidentifier").Value;

      ApplicationDbContext db = new ApplicationDbContext();
      ADALTokenCache userTokenCache = new ADALTokenCache(signedInUserID);

      string urlAuthorityRoot = ConfigurationManager.AppSettings["ida:AADInstance"];
      string urlAuthorityTenant = urlAuthorityRoot + tenantID;

      AuthenticationContext authenticationContext =
        new AuthenticationContext(urlAuthorityTenant, userTokenCache);

      Uri uriReplyUrl = new Uri(HttpContext.Current.Request.Url.GetLeftPart(UriPartial.Path));

      string clientId = ConfigurationManager.AppSettings["ida:ClientId"];
      string clientSecret = ConfigurationManager.AppSettings["ida:ClientSecret"];
      ClientCredential clientCredential = new ClientCredential(clientId, clientSecret);

      UserIdentifier userIdentifier = new UserIdentifier(userObjectID, UserIdentifierType.UniqueId);

      AuthenticationResult authenticationResult = 
        authenticationContext.AcquireTokenSilentAsync(resource, clientCredential, userIdentifier).Result;

      return authenticationResult.AccessToken;

    }


    public static ADALTokenCache GetTokenCache() {

      // get ClaimsPrincipal for current user
      ClaimsPrincipal currentUserClaims = ClaimsPrincipal.Current;
      string signedInUserID = currentUserClaims.FindFirst(ClaimTypes.NameIdentifier).Value;


      string userObjectID = currentUserClaims.FindFirst("http://schemas.microsoft.com/identity/claims/objectidentifier").Value;

      ApplicationDbContext db = new ApplicationDbContext();
      ADALTokenCache userTokenCache = new ADALTokenCache(signedInUserID);

      return userTokenCache;

    }



  }
}