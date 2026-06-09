// ================================================
// Problem 99: Min Cost Climbing Stairs
// ================================================
// Each step has a cost. Pay cost to climb 1 or 2 steps. Can start from 0 or 1.

// ============================================
// APPROACH 1: DP - O(n) Time, O(1) Space ⭐ OPTIMAL
// ============================================
int[] cost = {10, 15, 20};

int n = cost.length;
int prev2 = cost[0];
int prev1 = cost[1];

for (int i = 2; i < n; i++) {
    int curr = cost[i] + Math.min(prev1, prev2);
    prev2 = prev1;
    prev1 = curr;
}

int result = Math.min(prev1, prev2);
System.out.println("Min Cost Climbing Stairs: " + result);

// ============================================
// APPROACH 2: DP Array - O(n) Time, O(n) Space
// ============================================
int[] cost2 = {10, 15, 20};
int[] dp = new int[cost2.length + 1];

for (int i = 2; i <= cost2.length; i++) {
    int oneStep = dp[i - 1] + cost2[i - 1];
    int twoStep = dp[i - 2] + cost2[i - 2];
    dp[i] = Math.min(oneStep, twoStep);
}

System.out.println("Min Cost (Array): " + dp[cost2.length]);

// ============================================
// Visualization
// ============================================
System.out.println("\nFor cost=[10, 15, 20]:");
System.out.println("Start at step 1 (cost 15), jump to top");
System.out.println("Total: 15");
