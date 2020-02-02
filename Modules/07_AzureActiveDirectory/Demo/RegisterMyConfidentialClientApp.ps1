# log into Azure AD
$userName = "student@msd365tenant.onMicrosoft.com"
$password = "Pa`$$word!"

$securePassword = ConvertTo-SecureString –String $password –AsPlainText -Force
$credential = New-Object –TypeName System.Management.Automation.PSCredential `
                         –ArgumentList $userName, $securePassword

$authResult = Connect-AzureAD -Credential $credential

# display name for new confidential client app
$appDisplayName = "My Confidential Client App"

# get user account ID for logged in user
$user = Get-AzureADUser -ObjectId $authResult.Account.Id
$userDisplayName = $user.DisplayName

# get tenant name of logged in user
$tenantId = $authResult.TenantId.ToString()
$tenantName = $authResult.TenantDomain

# create new password credential for client secret
$newGuid = New-Guid
$appSecret = ([System.Convert]::ToBase64String([System.Text.Encoding]::UTF8.GetBytes(($newGuid))))+"="
$startDate = Get-Date	
$passwordCredential = New-Object -TypeName Microsoft.Open.AzureAD.Model.PasswordCredential
$passwordCredential.StartDate = $startDate
$passwordCredential.EndDate = $startDate.AddYears(1)
$passwordCredential.KeyId = $newGuid
$passwordCredential.Value = $appSecret 

Write-Host "Registering new app $appDisplayName in $tenantName"

# create Azure AD Application
$replyUrl = "https://localhost/app1234"
$aadApplication = New-AzureADApplication `
                        -DisplayName $appDisplayName  `
                        -PublicClient $false `
                        -AvailableToOtherTenants $false `
                        -ReplyUrls $replyUrl `
                        -PasswordCredentials $passwordCredential                       

# create applicaiton's service principal 
$appId = $aadApplication.AppId
$servicePrincipal = New-AzureADServicePrincipal -AppId $appId
$appObjectId = $aadApplication.ObjectId

# assign current user as owner
Add-AzureADApplicationOwner -ObjectId $appObjectId  -RefObjectId $user.ObjectId

# configure login permissions for Azure Graph API
$requiredResourcesAccess1 = New-Object System.Collections.Generic.List[Microsoft.Open.AzureAD.Model.RequiredResourceAccess]

# configure signin delegated permisssions for the Microsoft Graph API
$requiredAccess1 = New-Object -TypeName "Microsoft.Open.AzureAD.Model.RequiredResourceAccess"
$requiredAccess1.ResourceAppId = "00000003-0000-0000-c000-000000000000"

# Application Permission - Organization.ReadWrite.All
$permission1 = New-Object -TypeName "Microsoft.Open.AzureAD.Model.ResourceAccess" `
                          -ArgumentList "292d869f-3427-49a8-9dab-8c70152b74e9","Role"

$requiredAccess1.ResourceAccess = $permission1

Set-AzureADApplication -ObjectId $appObjectId -RequiredResourceAccess @($requiredAccess1)


$outputFile = "$PSScriptRoot\MyConfidentialClientApp.txt"
Out-File -FilePath $outputFile -InputObject "--- My Confidential Client App Info ---"
Out-File -FilePath $outputFile -Append -InputObject "ClientId: $appId"
Out-File -FilePath $outputFile -Append -InputObject "ClientSecret: $appSecret"
Out-File -FilePath $outputFile -Append -InputObject "Service Principal Object ID: $appObjectId"
Out-File -FilePath $outputFile -Append -InputObject "TenantName: $tenantName"
Out-File -FilePath $outputFile -Append -InputObject "TenantId: $tenantId"

Notepad $outputFile