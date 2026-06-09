// ================================================
// Problem 111: Longest Common Subsequence
// ================================================
// Given two strings, return the length of their longest common subsequence.

// ============================================
// APPROACH 1: DP 2D - O(m*n) Time, O(m*n) Space ⭐ OPTIMAL
// ============================================
String text1 = "abcde";
String text2 = "ace";

int m = text1.length();
int n = text2.length();

int[][] dp = new int[m + 1][n + 1];

for (int i = 1; i <= m; i++) {
    for (int j = 1; j <= n; j++) {
        if (text1.charAt(i - 1) == text2.charAt(j - 1)) {
            dp[i][j] = dp[i - 1][j - 1] + 1;
        } else {
            dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
        }
    }
}

System.out.println("LCS of '" + text1 + "' and '" + text2 + "': " + dp[m][n]);

// ============================================
// APPROACH 2: DP 1D - O(m*n) Time, O(n) Space
// ============================================
String t1 = "abcde";
String t2 = "ace";

int[] dp1d = new int[t2.length() + 1];

for (int i = 1; i <= t1.length(); i++) {
    int prev = 0;
    for (int j = 1; j <= t2.length(); j++) {
        int temp = dp1d[j];
        if (t1.charAt(i - 1) == t2.charAt(j - 1)) {
            dp1d[j] = prev + 1;
        } else {
            dp1d[j] = Math.max(dp1d[j], dp1d[j - 1]);
        }
        prev = temp;
    }
}

System.out.println("LCS (Space Optimized): " + dp1d[t2.length()]);

// ============================================
// Visualization: DP Table
// ============================================
System.out.println("\nDP Table for 'abcde' and 'ace':");
System.out.println("    ''  a  c  e");
System.out.println("''   0  0  0  0");
System.out.println("a    0  1  1  1");
System.out.println("b    0  1  1  1");
System.out.println("c    0  1  2  2");
System.out.println("d    0  1  2  2");
System.out.println("e    0  1  2  3 <- LCS = 3 ('ace')");

// ============================================
// APPROACH 3: Recursion with Memoization
// ============================================
System.out.println("\nMemoization: Top-down recursive with cache");
