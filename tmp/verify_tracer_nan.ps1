$javaCode = @'
import java.util.Stack;

public class HistogramVerification {
    public static void main(String[] args) {
        Stack<Integer> stack = new Stack<>();
        stack.push(42);
        System.out.println("Done");
    }
}
'@

$body = @{
    code = $javaCode
    input = ""
} | ConvertTo-Json

try {
    $response = Invoke-RestMethod -Uri "http://localhost:3000/api/run-java" -Method Post -Body $body -ContentType "application/json"
    
    # Find step with stack
    $step = $response.history | Where-Object { $_.roots.stack -ne $null } | Select-Object -Last 1
    
    if ($step) {
        $stackRef = $step.roots.stack.__viz_ref
        $stackObj = $step.store.$stackRef
        
        Write-Host "Stack Object Type: $($stackObj.type)"
        Write-Host "Stack Value Raw:"
        $stackObj.value | ConvertTo-Json -Depth 5
        
        # Check first element
        if ($stackObj.value -is [Array] -and $stackObj.value.Count -gt 0) {
            $firstElem = $stackObj.value[0]
            Write-Host "First Element Type: $($firstElem.GetType().Name)"
            Write-Host "First Element Value: $firstElem"
            
            if ($firstElem -is [PSCustomObject] -and $firstElem.__viz_ref) {
                 Write-Host "Element is a REFERENCE. Looking up in store..."
                 $elemRef = $firstElem.__viz_ref
                 $elemObj = $step.store.$elemRef
                 $elemObj | ConvertTo-Json -Depth 5
            }
        }
    } else {
        Write-Host "Stack not found."
    }
} catch {
    Write-Host "Error: $_"
}
