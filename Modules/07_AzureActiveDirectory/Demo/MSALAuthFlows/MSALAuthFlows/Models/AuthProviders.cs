using System;
using System.Security;
using System.Net.Http;
using Diagnostics = System.Diagnostics;
using System.Threading.Tasks;
using Microsoft.Identity.Client;
using Microsoft.Graph;


class UserInteractiveAuthProvider : IAuthenticationProvider {

  public Task AuthenticateRequestAsync(HttpRequestMessage request) {

    PublicClientApplicationOptions options = new PublicClientApplicationOptions();

    var appPublic = PublicClientApplicationBuilder.Create(AppSettings.clientId)
                     .WithAuthority(AppSettings.tenantCommonAuthority)
                     .WithRedirectUri(AppSettings.redirectUri)
                     .Build();

    var authResult = appPublic.AcquireTokenInteractive(AppSettings.scopesForMicrosoftGraph)
                              .WithPrompt(Microsoft.Identity.Client.Prompt.SelectAccount)
                              .ExecuteAsync().Result;

    // insert access token into authorization header for each outbound request
    request.Headers.Add("Authorization", "Bearer " + authResult.AccessToken);

    return Task.CompletedTask;

  }
}

class UserDirectPasswordAuthProvider : IAuthenticationProvider {

  public Task AuthenticateRequestAsync(HttpRequestMessage request) {

    var appPublic = PublicClientApplicationBuilder.Create(AppSettings.clientId)
                      .WithAuthority(AppSettings.tenantCommonAuthority)
                      .Build();

    string username = AppSettings.userName;
    string userPassword = AppSettings.userPassword;

    SecureString userPasswordSecure = new SecureString();
    foreach (char c in userPassword) {
      userPasswordSecure.AppendChar(c);
    }

    var authResult = appPublic.AcquireTokenByUsernamePassword(AppSettings.scopesForMicrosoftGraph, username, userPasswordSecure)
                              .ExecuteAsync().Result;

    // insert access token into authorization header for each outbound request
    request.Headers.Add("Authorization", "Bearer " + authResult.AccessToken);

    return Task.CompletedTask;

  }
}

class UserDeviceCodeAuthProvider : IAuthenticationProvider {

  public Task AuthenticateRequestAsync(HttpRequestMessage request) {

    // device code authentication requires tenant-specific authority URL
    var appPublic = PublicClientApplicationBuilder.Create(AppSettings.clientId)
                      .WithAuthority(AppSettings.tenantSpecificAuthority)
                      .Build();

    // this method call will block until you have logged in using the generated device code
    var authResult = appPublic.AcquireTokenWithDeviceCode(AppSettings.scopesForMicrosoftGraph, deviceCodeCallbackParams => {
      // retrieve device code and verification URL from deviceCodeCallbackParams 
      string deviceCode = deviceCodeCallbackParams.UserCode;
      string verificationUrl = deviceCodeCallbackParams.VerificationUrl;
      Console.WriteLine();
      Console.WriteLine("When prompted by the browser, copy-and-paste the following device code: " + deviceCode);
      Console.WriteLine();
      Console.WriteLine("Opening Browser at " + verificationUrl);
      Diagnostics.Process.Start("chrome.exe", verificationUrl);
      Console.WriteLine();
      Console.WriteLine("This console app will now block until you enter the device code and log in");
      // return task result
      return Task.FromResult(0);
    }).ExecuteAsync().Result;


    Console.WriteLine();
    Console.WriteLine("access token has been acquired");
    Console.WriteLine();

    // insert access token into authorization header for each outbound request
    request.Headers.Add("Authorization", "Bearer " + authResult.AccessToken);

    return Task.CompletedTask;

  }
}

class AppOnlyAuthProvider : IAuthenticationProvider {

  public Task AuthenticateRequestAsync(HttpRequestMessage request) {

    var appConfidential = ConfidentialClientApplicationBuilder.Create(AppSettings.appOnlyClientId)
                          .WithClientSecret(AppSettings.appOnlyClientSecret)
                          .WithAuthority(AppSettings.tenantSpecificAuthority)
                          .Build();

    string[] scopesDefault = new string[] { ".default" };

    var authResult = appConfidential.AcquireTokenForClient(scopesDefault).ExecuteAsync().Result;

    // insert access token into authorization header for each outbound request
    request.Headers.Add("Authorization", "Bearer " + authResult.AccessToken);

    return Task.CompletedTask;

  }
}
