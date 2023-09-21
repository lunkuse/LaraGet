[CmdletBinding()]
param (
    [Parameter(Mandatory=$true)][string]$SiteContentFolder,
    [Parameter(Mandatory=$true)][string]$BackendUrl
)

$defaultBackendUrl1 = 'http://projectdental.nl/staging-backend/api';
$defaultBackendUrl2 = 'https://projectdental.nl/staging-backend/api';
$defaultBackendUrl3 = 'https://dev.api.metadent.nl/api';
$assetsFolder = "$SiteContentFolder/assets";
$fileWildcard = "index*.js";

Write-Host "Amending file contents";

Write-Host "Looking for files here: $assetsFolder/$fileWildcard";

# Get the first index json file in the folder using case-sensitivity
$files = (Get-ChildItem -Path "$assetsFolder/$fileWildcard" `
            | Where-Object { !$_.PSIsContainer } `
            | Sort-Object Length -Descending).Name

Write-Host "Found the following files: $files";

$file = $files | Select-Object -First 1
Write-Host "Selected the first one: $file";

if([string]::IsNullOrEmpty($file)){
    Write-Error "Filename is blank.  Cannot continue";
    exit;
}

if(!(Test-Path "$assetsFolder/$file")){
    Write-Error "Cannot find a file to replace text in";
    exit;
}

# change base url in file
$archivedFolder = "archived";
New-Item -Path "$assetsFolder/$archivedFolder" -ItemType Directory
Write-Host "Created $assetsFolder/$archivedFolder";

Copy-Item "$assetsFolder/$file" "$assetsFolder/$archivedFolder/$file"
Write-Host "Copied file to $assetsFolder/$archivedFolder/$file";

$fileContent = (Get-Content "$assetsFolder/$file") `
                -Replace $defaultBackendUrl1, $BackendUrl;

Write-Host "Replaced http url in file content";

$fileContent = $fileContent `
                -Replace $defaultBackendUrl2, $BackendUrl;
Write-Host "Replaced https url in file content";

$fileContent = $fileContent `
                -Replace $defaultBackendUrl3, $BackendUrl;
Write-Host "Replaced backend url in file content";

Remove-Item "$assetsFolder/$file";            
Write-Host "Remove original file first";

Set-Content -Path "$assetsFolder/$file" -Value $fileContent;
Write-Host "Completed file updates to $assetsFolder/$file";