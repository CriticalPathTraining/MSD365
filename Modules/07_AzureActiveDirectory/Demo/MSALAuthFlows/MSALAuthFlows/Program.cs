using System;
using System.Linq;
using Microsoft.Graph;

class AppSettings {

  // TODO: add configuration data for public client app
  public const string clientId = "";
  public const string tenantName = "YOUR_TENANT.onmicrosoft.com";
  public const string redirectUri = "https://localhost/app1234";

  // TODO: add user name and password for direct password credential flow
  public const string userName = "user1@tenant1.onMicrosoft.com";
  public const string userPassword = "fido";

  // TODO: add configuration data for confidential client app
  public const string appOnlyClientId = "";
  public const string appOnlyClientSecret = "";

  // generic v2 endpoint references "organizations" instead of "common"
  public const string tenantCommonAuthority = "https://login.microsoftonline.com/organizations";
  public const string tenantSpecificAuthority = "https://login.microsoftonline.com/" + tenantName;

  // Microsoft Graph API Root URL  
  public const string urlMicrosoftGraphApiRoot = "https://graph.microsoft.com/";

  public static readonly string[] scopesForMicrosoftGraph = new string[] { "user.read" };

}

class Program {

  // TODO: swap out authProvider to test different authentication flows
  static IAuthenticationProvider authProvider = new UserInteractiveAuthProvider();
  // static IAuthenticationProvider authProvider = new UserDirectPasswordAuthProvider();
  // static IAuthenticationProvider authProvider = new UserDeviceCodeAuthProvider();
  // static IAuthenticationProvider authProvider = new AppOnlyAuthProvider();

  static GraphServiceClient graphServiceClient = new GraphServiceClient(authProvider);

  static void Main() {
    GetUserInfo();
    // GetOrgInfo();
  }

  static void GetUserInfo() {

    // call across Internet and wait for response
    var user = graphServiceClient.Me.Request().GetAsync().Result;

    Console.WriteLine("Current user info obtained with .NET Client");
    Console.WriteLine("-------------------------------------------");
    Console.WriteLine("Display Name: " + user.DisplayName);
    Console.WriteLine("First Name: " + user.GivenName);
    Console.WriteLine("Last Name: " + user.Surname);
    Console.WriteLine("User Principal Name: " + user.UserPrincipalName);
    Console.WriteLine();
    Console.WriteLine();
  }

  static void GetOrgInfo() {

    var org = graphServiceClient.Organization.Request().GetAsync().Result.FirstOrDefault<Organization>();

    Console.WriteLine("Current organizational info obtained with .NET Client");
    Console.WriteLine("-------------------------------------------");
    Console.WriteLine("ID: " + org.Id);
    Console.WriteLine("Display Name: " + org.DisplayName);
    Console.WriteLine("Tenant Domain: " + org.VerifiedDomains.FirstOrDefault<VerifiedDomain>().Name);
    Console.WriteLine("Country Letter Code: " + org.CountryLetterCode);
    Console.WriteLine("Technical Email: " + org.TechnicalNotificationMails.FirstOrDefault());
    Console.WriteLine();
    Console.WriteLine();
  }

}