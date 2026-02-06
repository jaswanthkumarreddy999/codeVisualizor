$javaCode = @'
import java.util.Stack;

public class HistogramOptimal {
    public static int largestRectangleArea(int[] heights) {
        Stack<Integer> stack = new Stack<>();
        int n = heights.length;
        
        for (int i = 0; i <= n; i++) {
             // Mimic logic
             if (i < 3) {
                 stack.push(i);
             }
        }
        return 0;
    }

    public static void main(String[] args) {
        int[] heights = {2, 1, 5, 6, 2, 3};
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
    
    # Find a step where stack has items
    $step = $response.history | Where-Object { 
        $_.roots.stack -ne $null -and 
        $_.store.($_.roots.stack.__viz_ref).value.Count -gt 0 
    } | Select-Object -Last 1
    
    if ($step) {
        $stackRef = $step.roots.stack.__viz_ref
        $stackObj = $step.store.$stackRef
        
        Write-Host "Stack Found. Ref: $stackRef"
        Write-Host "Stack Type: $($stackObj.type)"
        Write-Host "Stack Values:"
        $stackObj.value | ConvertTo-Json -Depth 5
    } else {
        Write-Host "Stack with items not found."
    }
} catch {
    Write-Host "Error: $_"
}
