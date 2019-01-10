# requires Install-Module SharePointPnPPowerShellOnline

Clear-Host

$userName = "YOUR_USER_NAME@YOUR_TENANT_NAME.onMicrosoft.com"
$password = "YOUR_PASSWORD"
$securePassword = ConvertTo-SecureString –String $password –AsPlainText -Force

$credential = New-Object –TypeName System.Management.Automation.PSCredential `
                         –ArgumentList $userName, $securePassword


Connect-PnPOnline -Url https://YOUR_TENANT_NAME.sharepoint.com -Credentials $credential

$page = Get-PnPListItem -List "Site Pages" -Query "<View><Query><Where><Eq><FieldRef Name='FileLeafRef'/><Value Type='Text'>users.aspx</Value></Eq></Where></Query></View>"

$page["PageLayoutType"] = "SingleWebPartAppPage" # SingleWebPartAppPage or Article

$page.Update()

Invoke-PnPQuery


