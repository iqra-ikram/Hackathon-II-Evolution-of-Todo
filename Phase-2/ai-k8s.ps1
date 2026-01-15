param(
    [Parameter(ValueFromRemainingArguments = $true)]
    $Args
)

# 1. Set API Key (Using your Google Key)
$env:OPENAI_API_KEY = $env:GOOGLE_API_KEY

# 2. Add Krew to PATH (if not present)
$krewPath = "$env:USERPROFILE\.krew\bin"
if ($env:Path -notlike "*$krewPath*") {
    $env:Path += ";$krewPath"
}

# 3. Define Gemini Endpoint
$endpoint = "https://generativelanguage.googleapis.com/v1beta/openai/"

# 4. Run kubectl-ai
Write-Host "🤖 Asking Gemini (via kubectl-ai)..." -ForegroundColor Cyan
kubectl-ai.exe --openai-endpoint $endpoint @Args
