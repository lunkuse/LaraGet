[CmdletBinding()]
param (
	[string] $ResourceGroup,
	[string] $AksCluster
)

az config set extension.use_dynamic_install=yes_without_prompt

az aks start --resource-group $ResourceGroup --name $AksCluster 

az aks show --resource-group $ResourceGroup --name $AksCluster 
