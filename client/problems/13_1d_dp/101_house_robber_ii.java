// ================================================
// Problem 101: House Robber II
// ================================================
// Houses are arranged in a circle. First and last houses are adjacent.
// Cannot rob two adjacent houses. Return maximum amount.

// ============================================
// APPROACH 1: Two Passes (House Robber I) - O(n) Time, O(1) Space ⭐ OPTIMAL
// ============================================
// Key insight: Cannot rob both first and last house
// So solve two cases: exclude first OR exclude last

int[] nums = {2, 3, 2};
int n = nums.length;

if (n == 1) {
    System.out.println("Max Rob: " + nums[0]);
} else {
    // Case 1: Rob houses [0, n-2] (exclude last)
    int rob1 = robRange(nums, 0, n - 2);
    
    // Case 2: Rob houses [1, n-1] (exclude first)
    int rob2 = robRange(nums, 1, n - 1);
    
    int maxRob = Math.max(rob1, rob2);
    System.out.println("House Robber II: " + maxRob);
}

static int robRange(int[] nums, int start, int end) {
    int prev2 = 0, prev1 = 0;
    
    for (int i = start; i <= end; i++) {
        int current = Math.max(prev1, prev2 + nums[i]);
        prev2 = prev1;
        prev1 = current;
    }
    
    return prev1;
}

// ============================================
// Visualization
// ============================================
System.out.println("\nHouses in circle: [2, 3, 2]");
System.out.println("Case 1: [2, 3] (exclude last) -> max = 3");
System.out.println("Case 2: [3, 2] (exclude first) -> max = 3");
System.out.println("Result: max(3, 3) = 3");
