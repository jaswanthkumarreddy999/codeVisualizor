$javaCode = @'
import java.util.Stack;

public class HistogramOptimal {
    public static int largestRectangleArea(int[] heights) {
        Stack<Integer> stack = new Stack<>();
        stack.push(10);
        stack.push(20);
        return 0;
    }

    public static void main(String[] args) {
        int[] heights = {2, 1};
        largestRectangleArea(heights);
    }
}
'@

$body = @{
    code = $javaCode
    input = ""
} | ConvertTo-Json

try {
    $response = Invoke-RestMethod -Uri "http://localhost:3000/api/run-java" -Method Post -Body $body -ContentType "application/json"
    
    # Find a step where stack exists
    $step = $response.history | Where-Object { $_.roots.stack -ne $null } | Select-Object -Last 1
    
    if ($step) {
        $stackRef = $step.roots.stack.__viz_ref
        $stackObj = $step.store.$stackRef
        
        Write-Host "Stack Object Type: $($stackObj.type)"
        Write-Host "Stack Value: "
        $stackObj.value | ConvertTo-Json -Depth 2
        
        if ($stackObj.type -eq "array") {
            Write-Host "SUCCESS: Stack is serialized as array."
        } else {
            Write-Host "FAILURE: Stack is NOT serialized as array."
        }
    } else {
        Write-Host "Error: Stack not found in history."
    }
} catch {
    Write-Host "Request Failed: $_"
}
