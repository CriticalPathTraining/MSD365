using System;
using System.Linq;
using System.Net;
using System.Net.Http;
using Newtonsoft.Json;
using MicrosoftGraphNativeApp.Models;
using Microsoft.Graph;

namespace MicrosoftGraphNativeApp {

  class Program {

    static void Main() {

      // call to Microsoft Graph using REST API
      DisplayCurrentUserInfo_REST();
      DisplayOrganizationInfo_REST();

      // call to Microsoft Graph using .NET client
      DisplayCurrentUserInfo_DotNet();
      DisplayOrganizationInfo_DotNet();

      Console.WriteLine();
      Console.WriteLine("Press ENTER to end program");
      Console.ReadLine();

    }

    // URLs used when making direct REST calls to Microsoft Graph API
    const string rootMicrosoftGraphAPI = "https://graph.microsoft.com/v1.0/";
    const string restUrlCurrentUser = "https://graph.microsoft.com/v1.0/me/";
    const string restUrlCurrentOrganization = "https://graph.microsoft.com/v1.0/organization/";

    static void DisplayCurrentUserInfo_REST() {

      HttpClient client = new HttpClient();
      HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Get, restUrlCurrentUser);
      request.Headers.Add("Authorization", "Bearer " + TokenManager.GetAccessToken());
      request.Headers.Add("Accept", "application/json");

      HttpResponseMessage response = client.SendAsync(request).Result;

      if (response.StatusCode != HttpStatusCode.OK) {
        throw new ApplicationException("Error!!!!!");
      }

      string jsonResult = response.Content.ReadAsStringAsync().Result;
      Office365User user = JsonConvert.DeserializeObject<Office365User>(jsonResult);

      Console.WriteLine("Current user info obtained with REST API");
      Console.WriteLine("-------------------------------------------");
      Console.WriteLine("ID: " + user.id);
      Console.WriteLine("User Principal Name: " + user.userPrincipalName);
      Console.WriteLine("Display Name: " + user.displayName);
      Console.WriteLine("First Name: " + user.givenName);
      Console.WriteLine("Last Name: " + user.surname);
      Console.WriteLine("Mail: " + user.mail);
      Console.WriteLine();
      Console.WriteLine();
    }

    static void DisplayOrganizationInfo_REST() {
      HttpClient client = new HttpClient();
      HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Get, restUrlCurrentOrganization);
      request.Headers.Add("Authorization", "Bearer " + TokenManager.GetAccessToken());
      request.Headers.Add("Accept", "application/json");

      HttpResponseMessage response = client.SendAsync(request).Result;

      if (response.StatusCode != HttpStatusCode.OK) {
        throw new ApplicationException("Error!!!!!");
      }

      string jsonResult = response.Content.ReadAsStringAsync().Result;
      Office365OrganizationCollection orgs = JsonConvert.DeserializeObject<Office365OrganizationCollection>(jsonResult);
      Office365Organization org = orgs.value.FirstOrDefault<Office365Organization>();

      Console.WriteLine("Organization info obtained with REST API");
      Console.WriteLine("-------------------------------------------");
      Console.WriteLine("ID: " + org.id);
      Console.WriteLine("Display Name: " + org.displayName);
      Console.WriteLine("Tenant Domain: " + org.verifiedDomains.FirstOrDefault<Office365VerifiedDomain>().name);
      Console.WriteLine("Country Letter Code: " + org.countryLetterCode);
      Console.WriteLine("Technical Email: " + org.technicalNotificationMails.FirstOrDefault<string>());
      Console.WriteLine();
      Console.WriteLine();
    }

    static GraphServiceClient graphServiceClient =
           new GraphServiceClient(new MyAuthProvider());

    static void DisplayCurrentUserInfo_DotNet() {

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

    static void DisplayOrganizationInfo_DotNet() {

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
}
