// ================================================
// Problem 110: Unique Paths
// ================================================
// Robot at top-left corner of m x n grid. Can only move right or down.
// How many unique paths to reach bottom-right corner?

// ============================================
// APPROACH 1: DP 2D - O(m*n) Time, O(m*n) Space
// ============================================
int m = 3, n = 7;

int[][] dp = new int[m][n];

// First row and column have only 1 way
for (int i = 0; i < m; i++) dp[i][0] = 1;
for (int j = 0; j < n; j++) dp[0][j] = 1;

// Fill remaining cells
for (int i = 1; i < m; i++) {
    for (int j = 1; j < n; j++) {
        dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
    }
}

System.out.println("Unique Paths (DP 2D): " + dp[m - 1][n - 1]);

// ============================================
// APPROACH 2: DP 1D - O(m*n) Time, O(n) Space ⭐ SPACE OPTIMAL
// ============================================
int m2 = 3, n2 = 7;

int[] dp1d = new int[n2];
Arrays.fill(dp1d, 1);

for (int i = 1; i < m2; i++) {
    for (int j = 1; j < n2; j++) {
        dp1d[j] += dp1d[j - 1];
    }
}

System.out.println("Unique Paths (DP 1D): " + dp1d[n2 - 1]);

// ============================================
// APPROACH 3: Math (Combinatorics) - O(min(m,n)) Time, O(1) Space ⭐ OPTIMAL
// ============================================
// Total moves = (m-1) + (n-1) = m+n-2
// Need to choose (m-1) down moves from (m+n-2) total
// C(m+n-2, m-1) = (m+n-2)! / ((m-1)! * (n-1)!)

int m3 = 3, n3 = 7;
int total = m3 + n3 - 2;
int choose = Math.min(m3 - 1, n3 - 1);

long result = 1;
for (int i = 0; i < choose; i++) {
    result = result * (total - i) / (i + 1);
}

System.out.println("Unique Paths (Math): " + result);

// ============================================
// Visualization: 3x3 grid
// ============================================
System.out.println("\n3x3 Grid DP Table:");
System.out.println("1  1  1");
System.out.println("1  2  3");
System.out.println("1  3  6  <- 6 unique paths");
