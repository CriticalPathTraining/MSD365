using Microsoft.IdentityModel.Clients.ActiveDirectory;
using SharePointOnlineWebClient.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net.Http;
using System.Security.Claims;
using System.Web;
using System.Web.Mvc;

using Newtonsoft.Json.Linq;

namespace SharePointOnlineWebClient.Controllers {



  [Authorize]
  public class SharePointSiteController : Controller {

    private const string tenantName = "CptLabs";
    private string urlServiceRoot = string.Format("https://{0}.sharepoint.com/_api/", tenantName);

    public ActionResult Index() {

      return View();
    }


    public ActionResult TenantAdminSite() {

      string resource = "https://cptlabs-admin.sharepoint.com/";
      string accessToken = TokenManager.GetAccessToken(resource);

      string urlRest = resource + "_api/web";
      Uri uriRest = new Uri(urlRest);

      HttpClient client = new HttpClient();
      client.DefaultRequestHeaders.Add("Authorization", "Bearer " + accessToken);
      client.DefaultRequestHeaders.Add("Accept", "application/json");

      HttpResponseMessage response = client.GetAsync(uriRest).Result;

      if (response.IsSuccessStatusCode) {
        string json = response.Content.ReadAsStringAsync().Result;
        SharePointSiteProperties siteProperties = JObject.Parse(json).ToObject<SharePointSiteProperties>();
        ViewBag.AccessToken = json;
        return View(siteProperties);
      }
      else {
        throw new ApplicationException("Whoops");
      }
    }

    public ActionResult TeamSite() {

      string resource = "https://CptLabs.sharepoint.com/";
      string accessToken = TokenManager.GetAccessToken(resource);

      string urlRest = urlServiceRoot + "web";
      Uri uriRest = new Uri(urlRest);

      HttpClient client = new HttpClient();
      client.DefaultRequestHeaders.Add("Authorization", "Bearer " + accessToken);
      client.DefaultRequestHeaders.Add("Accept", "application/json");

      HttpResponseMessage response = client.GetAsync(uriRest).Result;

      if (response.IsSuccessStatusCode) {
        string json = response.Content.ReadAsStringAsync().Result;
        SharePointSiteProperties siteProperties = JObject.Parse(json).ToObject<SharePointSiteProperties>();
        ViewBag.AccessToken = json;
        return View(siteProperties);
      }
      else {
        throw new ApplicationException("Whoops");
      }
    }

  }
}