$javaCode = @'
import java.util.Stack;

public class HistogramOptimal {
    public static int largestRectangleArea(int[] heights) {
        Stack<Integer> stack = new Stack<>();
        int maxArea = 0;
        int n = heights.length;

        for (int i = 0; i <= n; i++) {
            int currHeight = (i == n) ? 0 : heights[i];

            while (!stack.isEmpty() && currHeight < heights[stack.peek()]) {
                int height = heights[stack.pop()];
                int width = stack.isEmpty() ? i : i - stack.peek() - 1;
                maxArea = Math.max(maxArea, height * width);
            }

            stack.push(i);
        }

        return maxArea;
    }

    public static void main(String[] args) {
        int[] heights = {2, 1, 5, 6, 2, 3};
        System.out.println(largestRectangleArea(heights)); // 10
    }
}
'@

$body = @{
    code = $javaCode
    input = ""
} | ConvertTo-Json

try {
    $response = Invoke-RestMethod -Uri "http://localhost:3000/api/run-java" -Method Post -Body $body -ContentType "application/json"
    if ($response.history) {
        Write-Host "Success: API returned history with $($response.history.Count) steps."
        # Optional: Check if Stack is present in roots of a step
        $stepsWithStack = $response.history | Where-Object { $_.roots.stack -ne $null }
        if ($stepsWithStack) {
            Write-Host "Success: Found 'stack' variable in history."
            # Print a snippet of stack structure from a mid-execution step
             $response.history[20].roots.stack | ConvertTo-Json -Depth 5
        } else {
             Write-Host "Warning: 'stack' not found in roots. Dumping first step roots:"
             $response.history[0].roots | ConvertTo-Json -Depth 5
        }

    } else {
        Write-Host "Error: No history returned."
        Write-Host "Stdout: $($response.stdout)"
        Write-Host "Stderr: $($response.stderr)"
        Write-Host "Error: $($response.error)"
    }
} catch {
    Write-Host "Request Failed: $_"
}
