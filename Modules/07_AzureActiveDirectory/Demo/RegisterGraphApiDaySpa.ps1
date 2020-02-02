Clear-Host

$userName = "user1@tenant1.onMicrosoft.com"
$password = ""

$appDisplayName = "Graph API Day SPA"
$replyUrl = "http://localhost:8080"

$outputFile = "$PSScriptRoot\GraphApiDaySpa.txt"
$newline = "`r`n"
Write-Host "Writing info to $outputFile"


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

# openid (signin using Open ID Connect)
$permission1 = New-Object -TypeName "Microsoft.Open.AzureAD.Model.ResourceAccess" `
                          -ArgumentList "37f7f235-527c-4136-accd-4a02d197296e","Scope"

# profile                 (read basic profile of current user)
$permission2 = New-Object -TypeName "Microsoft.Open.AzureAD.Model.ResourceAccess" `
                          -ArgumentList "14dad69e-099b-42c9-810b-d002981feec1","Scope"

# User.ReadWrite          (read/update advanced profile of current user)
$permission3 = New-Object -TypeName "Microsoft.Open.AzureAD.Model.ResourceAccess" `
                          -ArgumentList "b4e74841-8e56-480b-be8b-910348b18b4c","Scope"

# User.ReadBasic.All      (read basic profile of all users in current tenant)                    
$permission4 = New-Object -TypeName "Microsoft.Open.AzureAD.Model.ResourceAccess" `
                          -ArgumentList "b340eb25-3456-403f-be2f-af7a0d370277","Scope"

# Files.ReadWrite.All     (create/read/update/delete all user files)
$permission5 = New-Object -TypeName "Microsoft.Open.AzureAD.Model.ResourceAccess" `
                          -ArgumentList "863451e7-0667-486c-a5d6-d135439485f0","Scope"

# Sites.ReadWrite.All     (create/edite/delete documents and items in all site collections)
$permission6 = New-Object -TypeName "Microsoft.Open.AzureAD.Model.ResourceAccess" `
                          -ArgumentList "89fe6a52-be36-487e-b7d8-d061c450a026","Scope"

# Mail.ReadWrite          (create/edit/delete email messages for current user)
$permission7 = New-Object -TypeName "Microsoft.Open.AzureAD.Model.ResourceAccess" `
                          -ArgumentList "024d486e-b451-40bb-833d-3e66d98c5c73","Scope"

# Mail.Send               (send email message on behalf of current user)
$permission8 = New-Object -TypeName "Microsoft.Open.AzureAD.Model.ResourceAccess" `
                          -ArgumentList "e383f46e-2787-4529-855e-0e479a3ffac0","Scope"

# Calendars.ReadWrite     (create/read/update/delete user calendar events)
$permission9 = New-Object -TypeName "Microsoft.Open.AzureAD.Model.ResourceAccess" `
                          -ArgumentList "1ec239c2-d7c9-4623-a91a-a9775856bb36","Scope"

# Contacts.ReadWrite      (create/readd/update/delete user contacts)
$permission10 = New-Object -TypeName "Microsoft.Open.AzureAD.Model.ResourceAccess" `
                          -ArgumentList "d56682ec-c09e-4743-aaf4-1a3aac4caa21","Scope"

$requiredAccess1.ResourceAccess = @($permission1, $permission2, $permission3, $permission4, $permission5, 
                                    $permission6, $permission7, $permission8, $permission9, $permission10)

Set-AzureADApplication -ObjectId $appObjectId -RequiredResourceAccess @($requiredAccess1)

Out-File -FilePath $outputFile -InputObject "--- Info for $appDisplayName ---"
Out-File -FilePath $outputFile -Append -InputObject "AppId: $appId"
Out-File -FilePath $outputFile -Append -InputObject "ReplyUrl: $replyUrl"
Out-File -FilePath $outputFile -Append -InputObject "Tenant: $tenantDomain"

Notepad $outputFile