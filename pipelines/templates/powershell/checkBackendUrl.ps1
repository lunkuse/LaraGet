[CmdletBinding()]
param (
    [Parameter(Mandatory=$true)][string]$SiteContentFolder,
    [Parameter(Mandatory=$true)][string]$FrontendUrl,
    [Parameter(Mandatory=$true)][string]$BackendUrl
)

$defaultBackendUrl1 = 'dev.api.metadent.nl';
$assetsFolder = "$SiteContentFolder/assets";
$fileWildcard = "index*.js";

Write-Host "Looking for files here: $assetsFolder/$fileWildcard";

# Get the first index json file in the folder using case-sensitivity
$files = (Get-ChildItem -Path "$assetsFolder/$fileWildcard" `
            | Where-Object { !$_.PSIsContainer } `
            | Sort-Object Length -Descending).Name

Write-Host "Found the following files: $files";

$file = $files | Select-Object -First 1
Write-Host "Selected the largest one: $file";

if([string]::IsNullOrEmpty($file)){
    Write-Error "Filename is blank.  Cannot continue";
    exit;
}

if(!(Test-Path "$assetsFolder/$file")){
    Write-Error "Cannot find a file to replace text in";
    exit;
}

# get online content
$url = "$FrontendUrl/assets/$file";

[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12, [Net.SecurityProtocolType]::Ssl3
[Net.ServicePointManager]::SecurityProtocol = "Tls12, Ssl3"
$content = (Invoke-WebRequest -UseBasicParsing -URI "$url").Content;

if([string]::IsNullOrEmpty($content)){
    Write-Error "No content found from url: $url";
    exit;
}

[bool]$backendUrlIsCorrect;
$result = $content | Select-String -Pattern $BackendUrl -SimpleMatch

if($null -eq $result)
{
    $backendUrlIsCorrect = $false;
    $result = $content | Select-String -Pattern $defaultBackendUrl1 -SimpleMatch
    Write-Error "Found incorrect backend hostname: $defaultBackendUrl1";
    Write-Error "Was expecting url to be: $BackendUrl";
}
else {
    $backendUrlIsCorrect = $true;
}

if($backendUrlIsCorrect){
    Write-Host "Backend url has been successfully found in frontend script file $url";
    exit;
}
