using System.Collections.Generic;

namespace MicrosoftGraphNativeApp.Models {

  public class Office365User {
    public string id { get; set; }
    public string displayName { get; set; }
    public string givenName { get; set; }
    public object jobTitle { get; set; }
    public string mail { get; set; }
    public object mobilePhone { get; set; }
    public object officeLocation { get; set; }
    public string preferredLanguage { get; set; }
    public string surname { get; set; }
    public string userPrincipalName { get; set; }
  }

  public class Office365OrganizationCollection {
    public List<Office365Organization> value { get; set; }
  }

  public class Office365Organization {
    public string id { get; set; }
    public List<Office365AssignedPlan> assignedPlans { get; set; }
    public List<object> businessPhones { get; set; }
    public object city { get; set; }
    public object country { get; set; }
    public string countryLetterCode { get; set; }
    public string displayName { get; set; }
    public List<object> marketingNotificationEmails { get; set; }
    public object onPremisesLastSyncDateTime { get; set; }
    public object onPremisesSyncEnabled { get; set; }
    public object postalCode { get; set; }
    public string preferredLanguage { get; set; }
    public List<Office365ProvisionedPlan> provisionedPlans { get; set; }
    public List<object> securityComplianceNotificationMails { get; set; }
    public List<object> securityComplianceNotificationPhones { get; set; }
    public object state { get; set; }
    public object street { get; set; }
    public List<string> technicalNotificationMails { get; set; }
    public List<Office365VerifiedDomain> verifiedDomains { get; set; }
  }

  public class Office365AssignedPlan {
    public string assignedDateTime { get; set; }
    public string capabilityStatus { get; set; }
    public string service { get; set; }
    public string servicePlanId { get; set; }
  }

  public class Office365ProvisionedPlan {
    public string capabilityStatus { get; set; }
    public string provisioningStatus { get; set; }
    public string service { get; set; }
  }

  public class Office365VerifiedDomain {
    public string capabilities { get; set; }
    public bool isDefault { get; set; }
    public bool isInitial { get; set; }
    public string name { get; set; }
    public string type { get; set; }
  }

}
