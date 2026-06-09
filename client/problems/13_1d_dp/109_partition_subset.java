// ================================================
// Problem 109: Partition Equal Subset Sum
// ================================================
// Can the array be partitioned into two subsets with equal sum?

// ============================================
// APPROACH 1: DP - O(n * sum/2) Time, O(sum/2) Space ⭐ OPTIMAL
// ============================================
int[] nums = {1, 5, 11, 5};

int totalSum = 0;
for (int num : nums) totalSum += num;

// If sum is odd, can't partition equally
if (totalSum % 2 != 0) {
    System.out.println("Can Partition: false");
} else {
    int target = totalSum / 2;
    boolean[] dp = new boolean[target + 1];
    dp[0] = true;
    
    for (int num : nums) {
        // Iterate backwards to avoid using same element twice
        for (int j = target; j >= num; j--) {
            dp[j] = dp[j] || dp[j - num];
        }
    }
    
    System.out.println("Can Partition: " + dp[target]);
}

// ============================================
// APPROACH 2: 2D DP - O(n * sum/2) Time, O(n * sum/2) Space
// ============================================
int[] nums2 = {1, 5, 11, 5};
int sum2 = 0;
for (int num : nums2) sum2 += num;

if (sum2 % 2 != 0) {
    System.out.println("Can Partition (2D): false");
} else {
    int target2 = sum2 / 2;
    int n = nums2.length;
    boolean[][] dp2 = new boolean[n + 1][target2 + 1];
    
    // Base case: sum 0 is always achievable
    for (int i = 0; i <= n; i++) dp2[i][0] = true;
    
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= target2; j++) {
            dp2[i][j] = dp2[i - 1][j];  // Don't include current
            if (j >= nums2[i - 1]) {
                dp2[i][j] = dp2[i][j] || dp2[i - 1][j - nums2[i - 1]];
            }
        }
    }
    
    System.out.println("Can Partition (2D): " + dp2[n][target2]);
}

// ============================================
// Visualization
// ============================================
System.out.println("\nFor [1, 5, 11, 5]:");
System.out.println("Total sum = 22, target = 11");
System.out.println("Subset {1, 5, 5} = 11, Subset {11} = 11");
System.out.println("Result: true");
