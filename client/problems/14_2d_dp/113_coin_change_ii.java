// ================================================
// Problem 113: Coin Change II
// ================================================
// Return the number of combinations that make up amount (unlimited coins).

// ============================================
// APPROACH 1: DP - O(amount * n) Time, O(amount) Space ⭐ OPTIMAL
// ============================================
int[] coins = {1, 2, 5};
int amount = 5;

int[] dp = new int[amount + 1];
dp[0] = 1;  // One way to make 0: use no coins

// Key: Iterate coins FIRST to avoid counting permutations
for (int coin : coins) {
    for (int i = coin; i <= amount; i++) {
        dp[i] += dp[i - coin];
    }
}

System.out.println("Coin Change II (combinations): " + dp[amount]);

// ============================================
// APPROACH 2: 2D DP - O(amount * n) Time, O(amount * n) Space
// ============================================
int[] coins2 = {1, 2, 5};
int amount2 = 5;
int n = coins2.length;

int[][] dp2 = new int[n + 1][amount2 + 1];

// Base: one way to make amount 0
for (int i = 0; i <= n; i++) dp2[i][0] = 1;

for (int i = 1; i <= n; i++) {
    for (int j = 0; j <= amount2; j++) {
        dp2[i][j] = dp2[i - 1][j];  // Don't use coin i
        if (j >= coins2[i - 1]) {
            dp2[i][j] += dp2[i][j - coins2[i - 1]];  // Use coin i
        }
    }
}

System.out.println("Coin Change II (2D): " + dp2[n][amount2]);

// ============================================
// Visualization
// ============================================
System.out.println("\nFor amount=5, coins=[1,2,5]:");
System.out.println("Combinations:");
System.out.println("  5 = 5");
System.out.println("  5 = 2 + 2 + 1");
System.out.println("  5 = 2 + 1 + 1 + 1");
System.out.println("  5 = 1 + 1 + 1 + 1 + 1");
System.out.println("Total: 4 ways");
