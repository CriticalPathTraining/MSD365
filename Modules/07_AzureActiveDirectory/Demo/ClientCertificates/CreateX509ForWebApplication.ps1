CLS 

$certroot = "$PSScriptRoot"
$certname = "AppOnlyClientCertificate01"
$password = ConvertTo-SecureString "pass@word1" -AsPlainText -Force
$startdate = (Get-Date).ToString("MM/dd/yyyy")
$enddate =  ((Get-Date).AddYears(2)).ToString("MM/dd/yyyy")
$MakeCert = ".\makecert.exe"

Set-Location -Path $PSScriptRoot

Write-Host "Creating x509 Certificate for $certname"
$result = & $MakeCert -r -pe -n "CN=$certname" -b $startdate -e $enddate -ss my -len 2048


$cert = Get-ChildItem Cert:\CurrentUser\My | ? {$_.Subject -eq "CN=$certname"}

Write-Host "Exporting public key in $certroot\$certname.cer"
$result = Export-Certificate -Type CERT -FilePath "$certroot\$certname.cer" -Cert $cert -Force

Write-Host "Exporting password-protected private key in key in $certroot\$certname.pfx"
$result = Export-PfxCertificate -FilePath "$certroot\$certname.pfx" -Cert $cert -Password $password -Force

Write-Host "Generate JSON for Certificate Registration"
$keyId = ([System.Guid]::NewGuid()).ToString()
$rawCertHash = $cert.GetCertHash();
$base64CertHash = [System.Convert]::ToBase64String($rawCertHash);
$rawCert = $cert.GetRawCertData();
$base64Cert  = [System.Convert]::ToBase64String($rawCert)

$json = New-Object System.Text.StringBuilder
$result = $json.AppendLine('{');
$result = $json.AppendLine('  "customKeyIdentifier": "' + $base64CertHash + '",');
$result = $json.AppendLine('  "keyId": "' + $keyId + '",');
$result = $json.AppendLine('  "type": "AsymmetricX509Cert",');
$result = $json.AppendLine('  "usage": "Verify",');
$result = $json.AppendLine('  "value": "' + $base64Cert + '"');
$result = $json.AppendLine('}');

$json.ToString() | Out-File -FilePath "$certroot\$certname.json.txt" -Encoding ascii

&"NOTEPAD.EXE" "$certroot\$certname.json.txt"

Write-Host "Removing Certificate from User's Local Store"
$result = Remove-Item $cert.PSPath

Write-Host "All work has been completed"
