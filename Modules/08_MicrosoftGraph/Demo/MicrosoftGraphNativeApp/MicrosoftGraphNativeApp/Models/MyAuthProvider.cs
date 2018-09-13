using System;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.IdentityModel.Clients.ActiveDirectory;
using Microsoft.Graph;

namespace MicrosoftGraphNativeApp.Models {

  class MyAuthProvider : IAuthenticationProvider {

    const string authority = "https://login.microsoftonline.com/common";
    const string resourceMicrosoftGraphAPI = "https://graph.microsoft.com";

    const string clientId = "ADD_YOUR_APPLICATION_ID_HERE";
    const string replyUrl = "https://localhost/app1234";
    readonly static Uri replyUri = new Uri(replyUrl);

    public async Task AuthenticateRequestAsync(HttpRequestMessage request) {

      // Use ADAL to obtain access token - ADAL performs tokn caching behind the scenes
      AuthenticationContext authContext = new AuthenticationContext(authority);
      AuthenticationResult authResult =
         await authContext.AcquireTokenAsync(
                  resourceMicrosoftGraphAPI,
                  clientId,
                  replyUri,
                  new PlatformParameters(PromptBehavior.Auto));

      // insert access token into authorization header for each outbound request
      request.Headers.Add("Authorization", "Bearer " + authResult.AccessToken);
    }
  }

}
