# Set Gemini API Key (Using your Google Key)
$env:OPENAI_API_KEY = $env:GOOGLE_API_KEY

# Add Krew/kubectl-ai to PATH
$krewPath = "$env:USERPROFILE\.krew\bin"
if ($env:Path -notlike "*$krewPath*") {
    $env:Path += ";$krewPath"
    Write-Host "Added $krewPath to PATH"
}

# Create a function to run kubectl-ai with Gemini endpoint
function kubectl-ai {
    param(
        [Parameter(ValueFromRemainingArguments = $true)]
        $Args
    )
    $endpoint = "https://generativelanguage.googleapis.com/v1beta/openai/"
    
    # Check if kubectl-ai is in path
    if (Get-Command "kubectl-ai.exe" -ErrorAction SilentlyContinue) {
        kubectl-ai.exe --openai-endpoint $endpoint @Args
    } else {
        Write-Error "kubectl-ai.exe not found. Please ensure it is installed."
    }
}

Write-Host "Environment configured!"
Write-Host "You can now use: kubectl-ai 'your prompt'"
