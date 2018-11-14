Clear-Host

$appDisplayName = "Power BI Day SPA"
$replyUrl = "https://localhost:44300"


$outputFile = "$PSScriptRoot\PowerBIDaySPA.txt"
$newline = "`r`n"
Write-Host "Writing info to $outputFile"


$userName = "student@xxx.onMicrosoft.com"
$password = "!"
$securePassword = ConvertTo-SecureString –String $password –AsPlainText -Force

$credential = New-Object –TypeName System.Management.Automation.PSCredential `
                         –ArgumentList $userName, $securePassword

$authResult = Connect-AzureAD -Credential $credential

$tenantId = $authResult.TenantId.ToString()
$tenantDomain = $authResult.TenantDomain
$tenantDisplayName = (Get-AzureADTenantDetail).DisplayName

$userAccountId = $authResult.Account.Id
$userDisplayName = (Get-AzureADUser -ObjectId $userAccountId).DisplayName

Write-Host "Registering new app $appDisplayName in $tenantDomain"

# create Azure AD Application
$aadApplication = New-AzureADApplication `
                        -DisplayName $appDisplayName `
                        -PublicClient $false `
                        -AvailableToOtherTenants $false `
                        -ReplyUrls @($replyUrl) `
                        -Homepage $replyUrl `
                        -Oauth2AllowImplicitFlow $true

# create applicaiton's service principal 
$appId = $aadApplication.AppId
$appObjectId = $aadApplication.ObjectId
$serviceServicePrincipal = New-AzureADServicePrincipal -AppId $appId

# assign current user as owner
Add-AzureADApplicationOwner -ObjectId $aadApplication.ObjectId -RefObjectId $user.ObjectId


# configure login permissions for Azure Graph API
$requiredResourcesAccess1 = New-Object System.Collections.Generic.List[Microsoft.Open.AzureAD.Model.RequiredResourceAccess]

# configure signin delegated permisssions for the Microsoft Graph API
$requiredAccess1 = New-Object -TypeName "Microsoft.Open.AzureAD.Model.RequiredResourceAccess"
$requiredAccess1.ResourceAppId = "00000003-0000-0000-c000-000000000000"
$permissionSignIn = New-Object -TypeName "Microsoft.Open.AzureAD.Model.ResourceAccess" `
                               -ArgumentList "37f7f235-527c-4136-accd-4a02d197296e","Scope"

$requiredAccess1.ResourceAccess = $permissionSignIn

# configure permissions for Power BI Service API
$requiredResourcesAccess2 = New-Object System.Collections.Generic.List[Microsoft.Open.AzureAD.Model.RequiredResourceAccess]

# configure delegated permisssions for the Power BI Service API
$requiredAccess2 = New-Object -TypeName "Microsoft.Open.AzureAD.Model.RequiredResourceAccess"
$requiredAccess2.ResourceAppId = "00000009-0000-0000-c000-000000000000"

# Group.Read.All
$permission1 = New-Object -TypeName "Microsoft.Open.AzureAD.Model.ResourceAccess" `
                          -ArgumentList "47df08d3-85e6-4bd3-8c77-680fbe28162e","Scope"

# Dataset.ReadWrite.All
$permission2 = New-Object -TypeName "Microsoft.Open.AzureAD.Model.ResourceAccess" `
                          -ArgumentList "322b68b2-0804-416e-86a5-d772c567b6e6","Scope"

# Report.ReadWrite.All
$permission3 = New-Object -TypeName "Microsoft.Open.AzureAD.Model.ResourceAccess" `
                          -ArgumentList "7504609f-c495-4c64-8542-686125a5a36f","Scope"

# Dashboards.ReadWrite.All
$permission4 = New-Object -TypeName "Microsoft.Open.AzureAD.Model.ResourceAccess" `
                          -ArgumentList "b271f05e-8329-4b97-baa4-91cf15b99cf1","Scope"

# Content.Create
$permission5 = New-Object -TypeName "Microsoft.Open.AzureAD.Model.ResourceAccess" `
                           -ArgumentList "f3076109-ca66-412a-be10-d4ee1be95d47","Scope"

# Data.Alter_Any
$permission6 = New-Object -TypeName "Microsoft.Open.AzureAD.Model.ResourceAccess" `
                           -ArgumentList "ecc85717-98b0-4465-af6d-1cbba6f9c961","Scope"

# Metadata.View_Any
$permission7 = New-Object -TypeName "Microsoft.Open.AzureAD.Model.ResourceAccess" `
                           -ArgumentList "ecf4e395-4315-4efa-ba57-a253fe0438b4","Scope"

# Workspace.ReadWrite.All
$permission8 = New-Object -TypeName "Microsoft.Open.AzureAD.Model.ResourceAccess" `
                           -ArgumentList "445002fb-a6f2-4dc1-a81e-4254a111cd29","Scope"

$requiredAccess2.ResourceAccess = $permission1, $permission2, $permission3, $permission4, $permission5, $permission6, $permission7, $permission8

Set-AzureADApplication -ObjectId $appObjectId -RequiredResourceAccess @($requiredAccess1, $requiredAccess2)

Out-File -FilePath $outputFile -InputObject "--- Info for $appDisplayName ---"
Out-File -FilePath $outputFile -Append -InputObject "AppId: $appId"
Out-File -FilePath $outputFile -Append -InputObject "ReplyUrl: $replyUrl"

Notepad $outputFile