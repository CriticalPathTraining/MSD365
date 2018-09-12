using System;

using Microsoft.IdentityModel.Clients.ActiveDirectory;

namespace MicrosoftGraphNativeApp.Models {

  class TokenManager {

    const string authority = "https://login.microsoftonline.com/common";
    const string resourceMicrosoftGraphAPI = "https://graph.microsoft.com";

    const string clientId = "ADD_YOUR_APPLICATION_ID_HERE";
    const string replyUrl = "https://localhost/app1234";
    readonly static Uri replyUri = new Uri(replyUrl);

    public static string GetAccessToken() {

      // create authentication context
      AuthenticationContext authContext = new AuthenticationContext(authority);
      
      // obtain access token
      var authResult =
         authContext.AcquireTokenAsync(
             resourceMicrosoftGraphAPI,
             clientId,
             replyUri,
             new PlatformParameters(PromptBehavior.Auto));
      
      // return access token to caller
      return authResult.Result.AccessToken;
    }
  }

}
