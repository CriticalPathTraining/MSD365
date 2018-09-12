using System;
using System.Configuration;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Threading.Tasks;
using System.Security.Claims;
using Tokens = System.IdentityModel.Tokens;
using Microsoft.IdentityModel.Clients.ActiveDirectory;
using Microsoft.Graph;
using System.Net.Http;
using System.Net;
using Newtonsoft.Json;

namespace MicrosoftGraphWebApp.Models {

  public class MicrosoftGraphManager {

    #region "private implementation details"

    private static async Task<string> GetAccessTokenAsync() {

      // determine authorization URL for current tenant
      string aadInstance = "https://login.microsoftonline.com/";
      string resourceMSGraphApi = "https://graph.Microsoft.com";
      string tenantID = ClaimsPrincipal.Current.FindFirst("http://schemas.microsoft.com/identity/claims/tenantid").Value;
      string tenantAuthority = aadInstance + tenantID;

      string clientId = ConfigurationManager.AppSettings["client-id"];
      string clientSecret = ConfigurationManager.AppSettings["client-secret"];
      string redirectUrl = ConfigurationManager.AppSettings["reply-url"];

      // create ADAL cache object
      ApplicationDbContext db = new ApplicationDbContext();
      string signedInUserID = ClaimsPrincipal.Current.FindFirst(ClaimTypes.NameIdentifier).Value;
      ADALTokenCache userTokenCache = new ADALTokenCache(signedInUserID);

      // create authentication context
      AuthenticationContext authenticationContext = new AuthenticationContext(tenantAuthority, userTokenCache);

      // create client credential object using client ID and client Secret"];
      ClientCredential clientCredential = new ClientCredential(clientId, clientSecret);

      // create user identifier object for logged on user
      string objectIdentifierId = "http://schemas.microsoft.com/identity/claims/objectidentifier";
      string userObjectID = ClaimsPrincipal.Current.FindFirst(objectIdentifierId).Value;
      UserIdentifier userIdentifier = new UserIdentifier(userObjectID, UserIdentifierType.UniqueId);

      // get access token for Power BI Service API from AAD
      AuthenticationResult authenticationResult =
        await authenticationContext.AcquireTokenSilentAsync(
            resourceMSGraphApi,
            clientCredential,
            userIdentifier);

      // return access token back to user
      return authenticationResult.AccessToken;

    }

    private static async Task<string> ExecuteGetRequest(string urlRestEndpoint) {

      string accessToken = await GetAccessTokenAsync();

      HttpClient client = new HttpClient();
      HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Get, urlRestEndpoint);
      request.Headers.Add("Authorization", "Bearer " + accessToken);
      request.Headers.Add("Accept", "application/json;odata.metadata=minimal");

      HttpResponseMessage response = await client.SendAsync(request);

      if (response.StatusCode != HttpStatusCode.OK) {
        throw new ApplicationException("Error!!!!!");
      }

      return await response.Content.ReadAsStringAsync();
    }

    class MSGraphAuthProvider : IAuthenticationProvider {

      private static string aadInstance = "https://login.microsoftonline.com/";
      private static string resourceMSGraphApi = "https://graph.Microsoft.com";

      private static string clientId = ConfigurationManager.AppSettings["client-id"];
      private static string clientSecret = ConfigurationManager.AppSettings["client-secret"];
      private static string redirectUrl = ConfigurationManager.AppSettings["reply-url"];

      private static async Task<string> GetAccessTokenAsync() {

        // determine authorization URL for current tenant
        string tenantID = ClaimsPrincipal.Current.FindFirst("http://schemas.microsoft.com/identity/claims/tenantid").Value;
        string tenantAuthority = aadInstance + tenantID;

        // create ADAL cache object
        ApplicationDbContext db = new ApplicationDbContext();
        string signedInUserID = ClaimsPrincipal.Current.FindFirst(ClaimTypes.NameIdentifier).Value;
        ADALTokenCache userTokenCache = new ADALTokenCache(signedInUserID);

        // create authentication context
        AuthenticationContext authenticationContext = new AuthenticationContext(tenantAuthority, userTokenCache);

        // create client credential object using client ID and client Secret"];
        ClientCredential clientCredential = new ClientCredential(clientId, clientSecret);

        // create user identifier object for logged on user
        string objectIdentifierId = "http://schemas.microsoft.com/identity/claims/objectidentifier";
        string userObjectID = ClaimsPrincipal.Current.FindFirst(objectIdentifierId).Value;
        UserIdentifier userIdentifier = new UserIdentifier(userObjectID, UserIdentifierType.UniqueId);

        // get access token for Power BI Service API from AAD
        AuthenticationResult authenticationResult =
          await authenticationContext.AcquireTokenSilentAsync(
              resourceMSGraphApi,
              clientCredential,
              userIdentifier);

        // return access token back to user
        return authenticationResult.AccessToken;

      }

      public async Task AuthenticateRequestAsync(HttpRequestMessage request) {

        string accessToken = await GetAccessTokenAsync();

        // insert access token into authorization header for each outbound request
        request.Headers.Add("Authorization", "Bearer " + accessToken);
      }
    }

    private static GraphServiceClient msGraphClient = null;

    static GraphServiceClient GetMSGraphClient() {
      if (MicrosoftGraphManager.msGraphClient == null) {
        MicrosoftGraphManager.msGraphClient =
          new GraphServiceClient(new MSGraphAuthProvider());
      }
      return MicrosoftGraphManager.msGraphClient;
    }

    #endregion

    public static async Task<List<User>> GetUsers() {
      GraphServiceClient client = GetMSGraphClient();
      List<User> users = new List<User>();
      var usersResponse = await client.Users.Request().GetAsync();
      foreach (User user in usersResponse) {
        users.Add(user);
      }
      return users;
    }

    public static async Task<List<SiteResponse>> GetSites() {
      string json = await ExecuteGetRequest("https://graph.microsoft.com/v1.0/sites/?search=*");
      SitesResponse sitesResponse = JsonConvert.DeserializeObject<SitesResponse>(json);
      return sitesResponse.value;      
    }

    public static async Task<SiteResponse> GetSite(string id) {
      string jsonSites = await ExecuteGetRequest("https://graph.microsoft.com/v1.0/sites/" + id);
      SiteResponse siteResponse = JsonConvert.DeserializeObject<SiteResponse>(jsonSites);

      string jsonLists = await ExecuteGetRequest("https://graph.microsoft.com/v1.0/sites/" + id + "/lists/");
      siteResponse.lists = (JsonConvert.DeserializeObject<ListsResponse>(jsonLists)).value;
      
      return siteResponse;
    }

    public static async Task<List<SiteResponse>> GetGroups() {
      GraphServiceClient client = GetMSGraphClient();
      var groups = await client.Groups.Request().GetAsync();

      List<SiteResponse> sites = new List<SiteResponse>();
      foreach (var group in groups) {
        if(group.GroupTypes.Count() > 0) {
          string templ = "https://graph.microsoft.com/v1.0/groups/{0}/sites/root";
          string restUrl = string.Format(templ, group.Id);
          string json = await ExecuteGetRequest(restUrl);
          SiteResponse siteResponse = JsonConvert.DeserializeObject<SiteResponse>(json);
          sites.Add(siteResponse);
        }       
      }

      return sites;
    }

    public static async Task<List<ApplicationResponse>> GetApplications() {
      string json = await ExecuteGetRequest("https://graph.microsoft.com/beta/applications/");
      ApplicationsResponse applicationsResponse = JsonConvert.DeserializeObject<ApplicationsResponse>(json);
      return applicationsResponse.value;

    }

  }
}