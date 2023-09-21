Param
(
    [Parameter (Mandatory=$true)] 
    [string] $ConfigFilePath,
    [Parameter (Mandatory=$true)] 
    [string] $FeedUri
)

$config = $ConfigFilePath
$doc = (Get-Content $config) -as [Xml]

if($null -eq $doc){
  Write-Host "Did not find the nuget.config file"
  exit;
}

Write-Host "Found the nuget.config file"

$keySetting = $doc.configuration.packageSources.add | Where-Object {$_.Key -eq 'DevExpress'}
if($null -eq $keySetting){
  Write-Host "Did not find DevExpress key"
  exit;
}

$keySetting.value = $FeedUri
$doc.Save($config)      
Write-Host "Updated DevExpress nuget feed url"