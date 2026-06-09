// ================================================
// Problem 116: Distinct Subsequences
// ================================================
// Given string s and t, count distinct subsequences of s which equals t.

// ============================================
// APPROACH 1: 2D DP - O(m*n) Time, O(m*n) Space ⭐ OPTIMAL
// ============================================
String s = "rabbbit";
String t = "rabbit";

int m = s.length(), n = t.length();
int[][] dp = new int[m + 1][n + 1];

// Base case: empty t can be matched by empty subsequence
for (int i = 0; i <= m; i++) dp[i][0] = 1;

for (int i = 1; i <= m; i++) {
    for (int j = 1; j <= n; j++) {
        // Don't use s[i-1]
        dp[i][j] = dp[i - 1][j];
        
        // Use s[i-1] if it matches t[j-1]
        if (s.charAt(i - 1) == t.charAt(j - 1)) {
            dp[i][j] += dp[i - 1][j - 1];
        }
    }
}

System.out.println("Distinct Subsequences: " + dp[m][n]);

// ============================================
// APPROACH 2: 1D DP - O(m*n) Time, O(n) Space
// ============================================
String s2 = "rabbbit";
String t2 = "rabbit";

int[] dp1d = new int[t2.length() + 1];
dp1d[0] = 1;

for (int i = 1; i <= s2.length(); i++) {
    // Iterate backwards to avoid using updated values
    for (int j = t2.length(); j >= 1; j--) {
        if (s2.charAt(i - 1) == t2.charAt(j - 1)) {
            dp1d[j] += dp1d[j - 1];
        }
    }
}

System.out.println("Distinct Subsequences (1D): " + dp1d[t2.length()]);

// ============================================
// Visualization
// ============================================
System.out.println("\nFor s='rabbbit', t='rabbit':");
System.out.println("3 ways to choose 'b' out of 3 'b's");
System.out.println("Result: 3");
