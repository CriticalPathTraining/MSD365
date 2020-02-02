# connect to tenant admin sire collection
$urlSharePointAdmin = "https://msd365tenant-admin.sharepoint.com"
Connect-SPOService -Url $urlSharePointAdmin

# create new SharePoint team site
$urlNewSite = "https://msd365tenant.sharepoint.com/sites/teamsite2"
$owner = "student@msd365tenant.onMicrosoft.com"
$quota = 0
$siteTitle = "Team Site 2"
$template = "STS#3"
New-SPOSite -Url $urlNewSite -Owner $owner -Title $siteTitle -StorageQuota $quota -Template $template

# get info about new team site
Get-SPOSite -Identity $urlNewSite | select *

# update title with next text value
Set-SPOSite -Identity $urlNewSite -Title "A New and Better Title"

# open new site in browser
Start-Process $urlNewSite
