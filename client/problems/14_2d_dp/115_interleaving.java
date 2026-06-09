// ================================================
// Problem 115: Interleaving String
// ================================================
// Given s1, s2, s3, determine if s3 is formed by interleaving s1 and s2.

// ============================================
// APPROACH 1: 2D DP - O(m*n) Time, O(m*n) Space ⭐ OPTIMAL
// ============================================
String s1 = "aabcc";
String s2 = "dbbca";
String s3 = "aadbbcbcac";

int m = s1.length(), n = s2.length();

if (s3.length() != m + n) {
    System.out.println("Interleaving String: false");
} else {
    boolean[][] dp = new boolean[m + 1][n + 1];
    dp[0][0] = true;
    
    // First column: use only s1
    for (int i = 1; i <= m; i++) {
        dp[i][0] = dp[i-1][0] && s1.charAt(i-1) == s3.charAt(i-1);
    }
    
    // First row: use only s2
    for (int j = 1; j <= n; j++) {
        dp[0][j] = dp[0][j-1] && s2.charAt(j-1) == s3.charAt(j-1);
    }
    
    // Fill rest
    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            dp[i][j] = (dp[i-1][j] && s1.charAt(i-1) == s3.charAt(i+j-1)) ||
                       (dp[i][j-1] && s2.charAt(j-1) == s3.charAt(i+j-1));
        }
    }
    
    System.out.println("Interleaving String: " + dp[m][n]);
}

// ============================================
// APPROACH 2: 1D DP - O(m*n) Time, O(n) Space
// ============================================
System.out.println("\n1D Space Optimization:");
System.out.println("Only need previous row, so use 1D array");

// ============================================
// Visualization
// ============================================
System.out.println("\nFor s1='aabcc', s2='dbbca', s3='aadbbcbcac':");
System.out.println("a a d b b c b c a c");
System.out.println("1 1 2 2 2 1 2 1 2 1  (1=s1, 2=s2)");
