# Script to start container
# $env:BackendUrl = "https://test"

if ([string]::IsNullOrEmpty($env:BackendUrl)){
    Write-Error "Must provide backend url environment variable before this script will run";
    exit 
}

$defaultBackendUrl1 = 'http://projectdental.nl/staging-backend/api';
$defaultBackendUrl2 = 'https://dev.api.metadent.nl/api';
$siteContentFolder = "/usr/share/nginx/html";
$assetsFolder = "$siteContentFolder/assets";
$File = "$siteContentFolder/.env";
$fileWildcard = "index*.js";

$BackendUrl="$env:BackendUrl";

. "/files/UpdateEnvProperties.ps1" `
                    -File $File `
                    -BackendUrl $BackendUrl

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
$fileContent = (Get-Content "$assetsFolder/$file") `
                -Replace $defaultBackendUrl1, $BackendUrl;
Write-Host "Replaced http url in file content";

$fileContent = $fileContent `
                -Replace $defaultBackendUrl2, $BackendUrl;
Write-Host "Replaced https url in file content";

Remove-Item "$assetsFolder/$file";            
Write-Host "Remove original file first";

Set-Content -Path "$assetsFolder/$file" -Value $fileContent;
Write-Host "Completed file updates to $assetsFolder/$file";

Write-Host "Starting SSH ..."
& /usr/sbin/sshd

& nginx -g 'daemon off;'