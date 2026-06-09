// ================================================
// Problem 100: House Robber
// ================================================
// Rob houses along a street without robbing two adjacent houses.
// Return maximum amount you can rob.

// ============================================
// APPROACH 1: DP - O(n) Time, O(n) Space
// ============================================
int[] nums = {1, 2, 3, 1};

int n = nums.length;
if (n == 1) {
    System.out.println("Max Rob: " + nums[0]);
} else {
    int[] dp = new int[n];
    dp[0] = nums[0];
    dp[1] = Math.max(nums[0], nums[1]);
    
    for (int i = 2; i < n; i++) {
        // Either rob current (dp[i-2] + nums[i]) or skip (dp[i-1])
        dp[i] = Math.max(dp[i - 1], dp[i - 2] + nums[i]);
    }
    
    System.out.println("Max Rob (DP): " + dp[n - 1]);
}

// ============================================
// APPROACH 2: Space Optimized - O(n) Time, O(1) Space ⭐ OPTIMAL
// ============================================
int[] nums2 = {1, 2, 3, 1};
int n2 = nums2.length;

int prev2 = 0;  // dp[i-2]
int prev1 = 0;  // dp[i-1]

for (int num : nums2) {
    int current = Math.max(prev1, prev2 + num);
    prev2 = prev1;
    prev1 = current;
}

System.out.println("Max Rob (Optimized): " + prev1);

// ============================================
// APPROACH 3: Recursion with Memoization - O(n) Time, O(n) Space
// ============================================
int[] nums3 = {1, 2, 3, 1};
int[] memo = new int[nums3.length];
Arrays.fill(memo, -1);

int result = robMemo(nums3, nums3.length - 1, memo);
System.out.println("Max Rob (Memo): " + result);

static int robMemo(int[] nums, int i, int[] memo) {
    if (i < 0) return 0;
    if (memo[i] != -1) return memo[i];
    
    memo[i] = Math.max(robMemo(nums, i - 1, memo), robMemo(nums, i - 2, memo) + nums[i]);
    return memo[i];
}

// ============================================
// Visualization
// ============================================
System.out.println("\nDecision at each house:");
System.out.println("House: [1, 2, 3, 1]");
System.out.println("i=0: take 1, dp[0]=1");
System.out.println("i=1: max(1, 2)=2, dp[1]=2");
System.out.println("i=2: max(2, 1+3)=4, dp[2]=4");
System.out.println("i=3: max(4, 2+1)=4, dp[3]=4");
