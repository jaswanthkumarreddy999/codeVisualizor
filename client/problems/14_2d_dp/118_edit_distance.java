// ================================================
// Problem 118: Edit Distance
// ================================================
// Given two strings word1 and word2, return the minimum number of 
// operations required to convert word1 to word2.
// Operations: Insert, Delete, Replace

// ============================================
// APPROACH 1: DP 2D - O(m*n) Time, O(m*n) Space ⭐ OPTIMAL
// ============================================
String word1 = "horse";
String word2 = "ros";

int m = word1.length();
int n = word2.length();

int[][] dp = new int[m + 1][n + 1];

// Base cases
for (int i = 0; i <= m; i++) dp[i][0] = i;  // Delete all
for (int j = 0; j <= n; j++) dp[0][j] = j;  // Insert all

for (int i = 1; i <= m; i++) {
    for (int j = 1; j <= n; j++) {
        if (word1.charAt(i - 1) == word2.charAt(j - 1)) {
            dp[i][j] = dp[i - 1][j - 1];  // No operation needed
        } else {
            dp[i][j] = 1 + Math.min(
                dp[i - 1][j - 1],  // Replace
                Math.min(
                    dp[i - 1][j],  // Delete
                    dp[i][j - 1]   // Insert
                )
            );
        }
    }
}

System.out.println("Edit Distance: " + dp[m][n]);

// ============================================
// APPROACH 2: DP 1D - O(m*n) Time, O(n) Space
// ============================================
String w1 = "horse";
String w2 = "ros";

int[] dp1d = new int[w2.length() + 1];
for (int j = 0; j <= w2.length(); j++) dp1d[j] = j;

for (int i = 1; i <= w1.length(); i++) {
    int prev = dp1d[0];
    dp1d[0] = i;
    
    for (int j = 1; j <= w2.length(); j++) {
        int temp = dp1d[j];
        if (w1.charAt(i - 1) == w2.charAt(j - 1)) {
            dp1d[j] = prev;
        } else {
            dp1d[j] = 1 + Math.min(prev, Math.min(dp1d[j], dp1d[j - 1]));
        }
        prev = temp;
    }
}

System.out.println("Edit Distance (1D): " + dp1d[w2.length()]);

// ============================================
// Visualization
// ============================================
System.out.println("\nDP Table for 'horse' -> 'ros':");
System.out.println("    ''  r  o  s");
System.out.println("''   0  1  2  3");
System.out.println("h    1  1  2  3");
System.out.println("o    2  2  1  2");
System.out.println("r    3  2  2  2");
System.out.println("s    4  3  3  2");
System.out.println("e    5  4  4  3 <- 3 operations");
System.out.println("\nOperations: horse -> rorse (replace h->r)");
System.out.println("            rorse -> rose (delete r)");
System.out.println("            rose -> ros (delete e)");
