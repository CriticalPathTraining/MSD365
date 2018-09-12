using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SharePointOnlineWebClient.Models {

  public class SharePointSiteProperties {
    public bool AllowRssFeeds { get; set; }
    public string AlternateCssUrl { get; set; }
    public string AppInstanceId { get; set; }
    public int Configuration { get; set; }
    public string Created { get; set; }
    public string CustomMasterUrl { get; set; }
    public string Description { get; set; }
    public bool DocumentLibraryCalloutOfficeWebAppPreviewersDisabled { get; set; }
    public bool EnableMinimalDownload { get; set; }
    public string Id { get; set; }
    public bool IsMultilingual { get; set; }
    public int Language { get; set; }
    public string LastItemModifiedDate { get; set; }
    public string MasterUrl { get; set; }
    public bool OverwriteTranslationsOnChange { get; set; }
    public bool QuickLaunchEnabled { get; set; }
    public bool RecycleBinEnabled { get; set; }
    public string ServerRelativeUrl { get; set; }
    public object SiteLogoUrl { get; set; }
    public bool SyndicationEnabled { get; set; }
    public string Title { get; set; }
    public bool TreeViewEnabled { get; set; }
    public int UIVersion { get; set; }
    public bool UIVersionConfigurationEnabled { get; set; }
    public string Url { get; set; }
    public string WebTemplate { get; set; }
  }
}