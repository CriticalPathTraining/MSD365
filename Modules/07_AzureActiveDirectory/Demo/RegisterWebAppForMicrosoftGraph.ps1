Clear-Host

$appDisplayName = "Web App for Microsoft Graph"
$replyUrl = "https://localhost:44301/"

$outputFile = "$PSScriptRoot\$appDisplayName.txt"
$newline = "`r`n"
Write-Host "Writing info to $outputFile"


$userName = "student@xxx.onMicrosoft.com"
$password = ""
$securePassword = ConvertTo-SecureString –String $password –AsPlainText -Force

$credential = New-Object –TypeName System.Management.Automation.PSCredential `
                         –ArgumentList $userName, $securePassword

$authResult = Connect-AzureAD -Credential $credential

$tenantId = $authResult.TenantId.ToString()
$tenantDomain = $authResult.TenantDomain
$tenantDisplayName = (Get-AzureADTenantDetail).DisplayName

$userAccountId = $authResult.Account.Id
$user = Get-AzureADUser -ObjectId $userAccountId
$userDisplayName = $user.DisplayName

# create app secret
$newGuid = New-Guid
$appSecret = ([System.Convert]::ToBase64String([System.Text.Encoding]::UTF8.GetBytes(($newGuid))))+"="
$startDate = Get-Date	
$passwordCredential = New-Object -TypeName Microsoft.Open.AzureAD.Model.PasswordCredential
$passwordCredential.StartDate = $startDate
$passwordCredential.EndDate = $startDate.AddYears(1)
$passwordCredential.KeyId = $newGuid
$passwordCredential.Value = $appSecret 

Write-Host "Registering new app $appDisplayName in $tenantDomain"

# create Azure AD Application
$aadApplication = New-AzureADApplication `
                        -DisplayName $appDisplayName `
                        -PublicClient $false `
                        -AvailableToOtherTenants $false `
                        -ReplyUrls @($replyUrl) `
                        -Homepage $replyUrl `
                        -PasswordCredentials $passwordCredential

# create applicaiton's service principal 
$appId = $aadApplication.AppId
$appObjectId = $aadApplication.ObjectId
$serviceServicePrincipal = New-AzureADServicePrincipal -AppId $appId

# assign current user as owner
Add-AzureADApplicationOwner -ObjectId $aadApplication.ObjectId -RefObjectId $user.ObjectId


# configure login permissions for Microsoft Graph API
$requiredResourcesAccess1 = New-Object System.Collections.Generic.List[Microsoft.Open.AzureAD.Model.RequiredResourceAccess]

# configure signin delegated permisssions for the Microsoft Graph API
$requiredAccess1 = New-Object -TypeName "Microsoft.Open.AzureAD.Model.RequiredResourceAccess"
$requiredAccess1.ResourceAppId = "00000003-0000-0000-c000-000000000000"

# sign in with Open ID
$perm1 = New-Object -TypeName "Microsoft.Open.AzureAD.Model.ResourceAccess" `
                               -ArgumentList "37f7f235-527c-4136-accd-4a02d197296e","Scope"

# Admin Directory.Read.All
$perm2 = New-Object -TypeName "Microsoft.Open.AzureAD.Model.ResourceAccess" `
                               -ArgumentList "06da0dbc-49e2-44d2-8312-53f166ab848a","Scope"

# Admin Group.Read.All                                          
$perm3 = New-Object -TypeName "Microsoft.Open.AzureAD.Model.ResourceAccess" `
                               -ArgumentList "5f8c59db-677d-491f-a6b8-5f174b11ec1d","Scope"

# Admin Sites.FullControl.All                                   
$perm4 = New-Object -TypeName "Microsoft.Open.AzureAD.Model.ResourceAccess" `
                               -ArgumentList "5a54b8b3-347c-476d-8f8e-42d5c7424d29","Scope"


$requiredAccess1.ResourceAccess = $perm1, $perm2, $perm3, $perm4

Set-AzureADApplication -ObjectId $appObjectId -RequiredResourceAccess @($requiredAccess1)

Out-File -FilePath $outputFile -InputObject "--- Info for $appDisplayName ---"
Out-File -FilePath $outputFile -Append -InputObject "AppId: $appId"
Out-File -FilePath $outputFile -Append -InputObject "AppSecret: $appSecret"
Out-File -FilePath $outputFile -Append -InputObject "ReplyUrl: $replyUrl"

Notepad $outputFile