// ================================================
// Problem 120: Regular Expression Matching
// ================================================
// '.' matches any single character, '*' matches zero or more of preceding.

// ============================================
// APPROACH 1: DP - O(m*n) Time, O(m*n) Space ⭐ OPTIMAL
// ============================================
String s = "aa";
String p = "a*";

int m = s.length(), n = p.length();
boolean[][] dp = new boolean[m + 1][n + 1];

dp[0][0] = true;

// Handle patterns like a*, a*b*, a*b*c* that match empty string
for (int j = 2; j <= n; j++) {
    if (p.charAt(j - 1) == '*') {
        dp[0][j] = dp[0][j - 2];
    }
}

for (int i = 1; i <= m; i++) {
    for (int j = 1; j <= n; j++) {
        char sc = s.charAt(i - 1);
        char pc = p.charAt(j - 1);
        
        if (pc == '.' || pc == sc) {
            dp[i][j] = dp[i - 1][j - 1];
        } else if (pc == '*') {
            char prevPc = p.charAt(j - 2);
            
            // Zero occurrences of prevPc
            dp[i][j] = dp[i][j - 2];
            
            // One or more occurrences
            if (prevPc == '.' || prevPc == sc) {
                dp[i][j] = dp[i][j] || dp[i - 1][j];
            }
        }
    }
}

System.out.println("Regex Match: " + dp[m][n]);

// ============================================
// Visualization
// ============================================
System.out.println("\nFor s='aa', p='a*':");
System.out.println("a* can match 'aa' (two a's)");
System.out.println("Result: true");

System.out.println("\nFor s='ab', p='.*':");
System.out.println(".* = any char, zero or more times");
System.out.println("Result: true");
