// ================================================
// Problem 119: Burst Balloons
// ================================================
// You have n balloons. Burst all balloons to get maximum coins.
// coins = nums[left] * nums[i] * nums[right] when bursting i.

// ============================================
// APPROACH 1: DP (Interval) - O(n³) Time, O(n²) Space ⭐ OPTIMAL
// ============================================
int[] nums = {3, 1, 5, 8};

int n = nums.length;
// Add virtual 1s at boundaries
int[] arr = new int[n + 2];
arr[0] = arr[n + 1] = 1;
for (int i = 0; i < n; i++) arr[i + 1] = nums[i];

// dp[i][j] = max coins for bursting all balloons in (i, j)
int[][] dp = new int[n + 2][n + 2];

// Fill for increasing interval lengths
for (int len = 1; len <= n; len++) {
    for (int i = 1; i + len <= n + 1; i++) {
        int j = i + len - 1;
        
        // Try each balloon k as the LAST one to burst in interval
        for (int k = i; k <= j; k++) {
            int coins = arr[i - 1] * arr[k] * arr[j + 1];
            coins += dp[i][k - 1] + dp[k + 1][j];
            dp[i][j] = Math.max(dp[i][j], coins);
        }
    }
}

System.out.println("Burst Balloons Max Coins: " + dp[1][n]);

// ============================================
// Key Insight
// ============================================
System.out.println("\nKey Insight:");
System.out.println("Think of k as the LAST balloon to burst in range [i,j]");
System.out.println("After bursting others, k's neighbors are i-1 and j+1");
System.out.println("coins = arr[i-1] * arr[k] * arr[j+1] + dp[i][k-1] + dp[k+1][j]");
