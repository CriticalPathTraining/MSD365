Clear-Host

$userName = "student@xxx.onMicrosoft.com"
$password = ""
$securePassword = ConvertTo-SecureString –String $password –AsPlainText -Force

$appName = "Microsoft Graph Native Client App"
$replyUrl = "https://localhost/app1234"

$credential = New-Object –TypeName System.Management.Automation.PSCredential `
                         –ArgumentList $userName, $securePassword

$authResult = Connect-AzureAD -Credential $credential

# connect to Azure AD
#$authResult = Connect-AzureAD

# get more info about the logged in user
$user = Get-AzureADUser -ObjectId $authResult.Account.Id

# create Azure AD Application
$aadApplication = New-AzureADApplication `
                        -DisplayName $appName `
                        -PublicClient $true `
                        -AvailableToOtherTenants $false `
                        -ReplyUrls @($replyUrl)


# create service principal for application
$appId = $aadApplication.AppId
$serviceServicePrincipal = New-AzureADServicePrincipal -AppId $appId

# assign current user as application owner
Add-AzureADApplicationOwner -ObjectId $aadApplication.ObjectId -RefObjectId $user.ObjectId

# configure delegated permisssions for the Microsoft API
$requiredAccess = New-Object -TypeName "Microsoft.Open.AzureAD.Model.RequiredResourceAccess"
$requiredAccess.ResourceAppId = "00000003-0000-0000-c000-000000000000"

# add delegated permission - User.Read.All - requires admin
$permission1 = New-Object -TypeName "Microsoft.Open.AzureAD.Model.ResourceAccess" `
                          -ArgumentList "a154be20-db9c-4678-8ab7-66f6cc099a59","Scope"

# add delegated permission - Admin Group.ReadWrite.All - requires admin
$permission2 = New-Object -TypeName "Microsoft.Open.AzureAD.Model.ResourceAccess" `
                          -ArgumentList "4e46008b-f24c-477d-8fff-7bb4ec7aafe0","Scope"

# add permissions to ResourceAccess list
$requiredAccess.ResourceAccess = $permission1, $permission2

# add permissions by updating application with RequiredResourceAccess object
Set-AzureADApplication -ObjectId $aadApplication.ObjectId -RequiredResourceAccess $requiredAccess

$outputFile = "$PSScriptRoot\$appName.txt"
Out-File -FilePath $outputFile -InputObject "--- Info for $appName ---"
Out-File -FilePath $outputFile -Append -InputObject "AppId: $appId"
Out-File -FilePath $outputFile -Append -InputObject "ReplyUrl: $replyUrl"

Notepad $outputFile