Param (
  [Parameter(Mandatory=$true)][string]$File,
  [Parameter(Mandatory=$true)][string]$BackendUrl
)

# Assign your real path here.
$OCUM_CONF_FILE_LOCATION = $File

# Function which either updates, adds, or removes an entry.
# NOTE:
#   * This function updates input file $OCUM_CONF_FILE_LOCATION *in place*.
#     To be safe, be sure to have a backup copy before you try this.
#   * Set-Content's default character encoding is used to save the updated file.
#     Use the -Encoding parameter as needed.
function Update-PropertiesFile ([string]$key, [string]$value) {
  $ht = ConvertFrom-StringData (Get-Content -Raw $OCUM_CONF_FILE_LOCATION)

  if ($ht.Contains($key)) { # update or delete existing entry
    if ('' -eq $value) {
      $ht.Remove($key)
    }
    else               {
      $ht[$key] = $value
    }
  } elseif ('' -eq $value) { # entry to remove not found
    Write-Warning "No entry with key '$key' found; nothing to remove."
    return
  } else { # new entry
    $ht[$key] = "`"$value`""
    Write-Host "Updated value for $key";
  }

  # Serialize the updated hashtable back to the input file.
  Set-Content $OCUM_CONF_FILE_LOCATION -Value $(
    foreach ($key in $ht.Keys) {
     '{0}={1}' -f $key, $ht[$key].Replace('\', '\\')
    }
  )
}

Update-PropertiesFile -key 'VITE_BACKEND_URL' -value $BackendUrl
