using System;

using Microsoft.IdentityModel.Clients.ActiveDirectory;

namespace MicrosoftGraphNativeApp.Models {

  class TokenManager {

    //const string authority = "https://login.microsoftonline.com/common";
    const string authority = "https://login.microsoftonline.com/8743e820-1884-4fae-af81-462f16aaa1f6";
    const string resourceMicrosoftGraphAPI = "https://graph.microsoft.com";

    const string clientId = "2bbe0e53-59cf-47f1-abbf-a95fe7f6b892";
    const string replyUrl = "https://localhost/app1234";
    readonly static Uri replyUri = new Uri(replyUrl);

    static string cachedToken = null;

    public static string GetAccessToken() {

      if(cachedToken == null) { 
      // create authentication context
      AuthenticationContext authContext = new AuthenticationContext(authority);
      
      // obtain access token
      var authResult =
         authContext.AcquireTokenAsync(
             resourceMicrosoftGraphAPI,
             clientId,
             replyUri,
             new PlatformParameters(PromptBehavior.RefreshSession));
      
      // return access token to caller
      cachedToken = authResult.Result.AccessToken;
      }

      return cachedToken;
    }
  }

}
