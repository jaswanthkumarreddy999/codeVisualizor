$body = @{
    code = "def largestRectangleArea(heights):`n    stack = []`n    max_area = 0`n    n = len(heights)`n`n    for i in range(n + 1):`n        curr = 0 if i == n else heights[i]`n`n        while stack and curr < heights[stack[-1]]:`n            h = heights[stack.pop()]`n            width = i if not stack else i - stack[-1] - 1`n            max_area = max(max_area, h * width)`n`n        stack.append(i)`n`n    return max_area`n`nheights = [2, 1, 5, 6, 2, 3]`nprint(largestRectangleArea(heights))"
    input = ""
} | ConvertTo-Json

try {
    $response = Invoke-RestMethod -Uri "http://localhost:3000/api/run-python" -Method Post -Body $body -ContentType "application/json"
    if ($response.history) {
        Write-Host "Success: API returned history with $($response.history.Count) steps."
        # Optional: Print first step to verify structure
        # $response.history[0] | ConvertTo-Json -Depth 5
    } else {
        Write-Host "Error: No history returned."
        Write-Host "Stdout: $($response.stdout)"
        Write-Host "Stderr: $($response.stderr)"
        Write-Host "Error: $($response.error)"
    }
} catch {
    Write-Host "Request Failed: $_"
}
