using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MicrosoftGraphWebApp.Models {

  // Sites  
  public class SitesResponse {
    public List<SiteResponse> value { get; set; }
  }

  public class SiteResponse {
    public string id { get; set; }
    public string name { get; set; }
    public string webUrl { get; set; }
    public string displayName { get; set; }
    public string description { get; set; }
    public Root root { get; set; }
    public List<ListResponse> lists { get; set; }
    public DateTime createdDateTime { get; set; }
    public DateTime lastModifiedDateTime { get; set; }
    public SiteCollectionResponse siteCollection { get; set; }
  }

  public class SiteCollectionResponse {
    public string hostname { get; set; }
  }


  public class Root {
  }

  // Applications
  public class ApplicationsResponse {
    public List<ApplicationResponse> value { get; set; }
  }

  public class ApplicationResponse {
    public string id { get; set; }
    public object deletedDateTime { get; set; }
    public bool? isFallbackPublicClient { get; set; }
    public string appId { get; set; }
    public List<object> identifierUris { get; set; }
    public DateTime createdDateTime { get; set; }
    public PublicClient publicClient { get; set; }
    public string displayName { get; set; }
    public object isDeviceOnlyAuthSupported { get; set; }
    public object optionalClaims { get; set; }
    public List<object> orgRestrictions { get; set; }
    public ParentalControlSettings parentalControlSettings { get; set; }
    public string publisherDomain { get; set; }
    public string signInAudience { get; set; }
    public List<object> tags { get; set; }
    public object tokenEncryptionKeyId { get; set; }
    public Api api { get; set; }
    public List<object> appRoles { get; set; }
    public Info info { get; set; }
    public List<object> keyCredentials { get; set; }
    public List<object> passwordCredentials { get; set; }
    public List<object> preAuthorizedApplications { get; set; }
    public List<RequiredResourceAccess> requiredResourceAccess { get; set; }
    public WebDetails web { get; set; }
  }

  public class PublicClient {
    public List<object> redirectUris { get; set; }
  }

  public class ParentalControlSettings {
    public List<object> countriesBlockedForMinors { get; set; }
    public string legalAgeGroupRule { get; set; }
  }

  public class Api {
  }

  public class Info {
    public object termsOfServiceUrl { get; set; }
    public object supportUrl { get; set; }
    public object privacyStatementUrl { get; set; }
    public object marketingUrl { get; set; }
    public string logoUrl { get; set; }
  }

  public class ResourceAccess {
    public string id { get; set; }
    public string type { get; set; }
  }

  public class RequiredResourceAccess {
    public string resourceAppId { get; set; }
    public List<ResourceAccess> resourceAccess { get; set; }
  }

  public class WebDetails {
    public string logoutUrl { get; set; }
    public bool? oauth2AllowImplicitFlow { get; set; }
  }

  // Lists

  public class ListsResponse {
    public List<ListResponse> value { get; set; }
  }

  public class ListResponse {
    public DateTime createdDateTime { get; set; }
    public string description { get; set; }
    public string eTag { get; set; }
    public string id { get; set; }
    public DateTime lastModifiedDateTime { get; set; }
    public string name { get; set; }
    public string webUrl { get; set; }
    public string displayName { get; set; }
    public CreatedBy createdBy { get; set; }
    public ParentReference parentReference { get; set; }
    public ListProperties list { get; set; }
    public LastModifiedBy lastModifiedBy { get; set; }
  }

  public class UserResponse {
    public string displayName { get; set; }
  }

  public class CreatedBy {
    public UserResponse user { get; set; }
  }

  public class ParentReference {
  }

  public class ListProperties {
    public bool contentTypesEnabled { get; set; }
    public bool hidden { get; set; }
    public string template { get; set; }
  }

  public class LastModifiedBy {
    public UserResponse user { get; set; }
  }


}