using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Azure.WebJobs.Host;
using Microsoft.Graph;
using Microsoft.IdentityModel.Clients.ActiveDirectory;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;

namespace BobTheFunctionApp {
  public static class GetUsers {
    [FunctionName("GetUsers")]
    public static async Task<HttpResponseMessage> Run([HttpTrigger(AuthorizationLevel.Function, "get", "post", Route = null)]HttpRequestMessage req, TraceWriter log) {

      string tenantId = "c0e3632b-9e0d-4050-9e90-167e6a2268cf";
      string aadAuthorizationRoot = "https://login.microsoftonline.com/";
      string aadAuthorizationTenantEndpoint = aadAuthorizationRoot + tenantId + "/";
      var authenticationContext = new AuthenticationContext(aadAuthorizationTenantEndpoint);

      string applicationId = "36953f9d-4f91-4ce7-9e61-9f4d8d9b2b5f";
      string applicationPassword = "N9A*Z7zwFODA:0*s7jUV_D@i@-S:M*b4";
      string resourceIdMicrosoftGraph = "https://graph.microsoft.com";

      var clientCredential = new ClientCredential(applicationId, applicationPassword);

      GraphServiceClient graphServiceClient =
          new GraphServiceClient(new DelegateAuthenticationProvider(
              async (requestMessage) => {
                string accessToken = (await authenticationContext.AcquireTokenAsync(resourceIdMicrosoftGraph, clientCredential)).AccessToken;
                requestMessage.Headers.Authorization = new AuthenticationHeaderValue("bearer", accessToken);
              }));

      var users = await graphServiceClient.Users.Request().GetAsync();

      List<object> usersList = new List<object>();

      foreach (var user in users) {
        usersList.Add(new { Id = user.Id, FirstName = user.GivenName, LastName = user.Surname });
      }

      var jsonToReturn = JsonConvert.SerializeObject(usersList.ToArray());

      return new HttpResponseMessage(HttpStatusCode.OK) {
        Content = new StringContent(jsonToReturn, Encoding.UTF8, "application/json")
      };
    }
  }
}
