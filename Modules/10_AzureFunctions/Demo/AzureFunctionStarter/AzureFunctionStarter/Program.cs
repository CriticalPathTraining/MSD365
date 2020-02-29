using Microsoft.Graph;
using Microsoft.IdentityModel.Clients.ActiveDirectory;
using System.Collections.Generic;
using System.Net.Http.Headers;
using Newtonsoft.Json;
using System.Net.Http;
using System.Net;
using System.Text;

namespace AzureFunctionStarter {
  class Program {



    static void Main() {

      string tenantId = "c0e3632b-9e0d-4050-9e90-167e6a2268cf";
      string aadAuthorizationRoot = "https://login.microsoftonline.com/";
      string aadAuthorizationTenantEndpoint = aadAuthorizationRoot + tenantId + "/";
      var authenticationContext = new AuthenticationContext(aadAuthorizationTenantEndpoint);

      string applicationId = "2b2879d1-77d8-46d9-9cbc-64dbb662fc90";
      string applicationPassword = "+kkska1yDsZ.H04t=Vm_l5_JCD8b3oi5";
      string resourceIdMicrosoftGraph = "https://graph.microsoft.com";
      
      var clientCredential = new ClientCredential(applicationId, applicationPassword);

      GraphServiceClient graphServiceClient =
         new GraphServiceClient(new DelegateAuthenticationProvider(
                async (requestMessage) => {
                  string accessToken = (await authenticationContext.AcquireTokenAsync(resourceIdMicrosoftGraph, clientCredential)).AccessToken;
                  requestMessage.Headers.Authorization = new AuthenticationHeaderValue("bearer", accessToken);
                }));

      var users = graphServiceClient.Users.Request().GetAsync().Result;

      List<string> usersList = new List<string>();

      foreach(var user in users) {
        usersList.Add(user.GivenName + " " + user.Surname); 
      }
      
      var jsonToReturn = JsonConvert.SerializeObject(usersList.ToArray());

      System.Console.WriteLine(jsonToReturn);

      //return new HttpResponseMessage(HttpStatusCode.OK) {
      //  Content = new StringContent(jsonToReturn, Encoding.UTF8, "application/json")
      //};



    }
  }
}
