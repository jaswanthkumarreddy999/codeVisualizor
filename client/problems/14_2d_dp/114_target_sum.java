// ================================================
// Problem 114: Target Sum
// ================================================
// Assign + or - to each number to reach target sum. Return number of ways.

// ============================================
// APPROACH 1: DP (Subset Sum) - O(n * sum) Time, O(sum) Space ⭐ OPTIMAL
// ============================================
// Key: If P = sum of positives, N = sum of negatives
// P - N = target, P + N = total
// So: P = (target + total) / 2
// Problem becomes: find subsets that sum to P

int[] nums = {1, 1, 1, 1, 1};
int target = 3;

int total = 0;
for (int num : nums) total += num;

// Check if solution is possible
if ((target + total) % 2 != 0 || Math.abs(target) > total) {
    System.out.println("Target Sum: 0");
} else {
    int subsetSum = (target + total) / 2;
    int[] dp = new int[subsetSum + 1];
    dp[0] = 1;
    
    for (int num : nums) {
        for (int j = subsetSum; j >= num; j--) {
            dp[j] += dp[j - num];
        }
    }
    
    System.out.println("Target Sum: " + dp[subsetSum]);
}

// ============================================
// APPROACH 2: DFS with Memoization - O(n * sum) Time
// ============================================
System.out.println("\nDFS with Memoization:");
System.out.println("State: (index, currentSum)");
System.out.println("At each index, try + or -");

/*
Map<String, Integer> memo = new HashMap<>();

int dfs(int[] nums, int idx, int currSum, int target) {
    if (idx == nums.length) {
        return currSum == target ? 1 : 0;
    }
    
    String key = idx + "," + currSum;
    if (memo.containsKey(key)) return memo.get(key);
    
    int result = dfs(nums, idx + 1, currSum + nums[idx], target) +
                 dfs(nums, idx + 1, currSum - nums[idx], target);
    
    memo.put(key, result);
    return result;
}
*/

// ============================================
// Visualization
// ============================================
System.out.println("\nFor nums=[1,1,1,1,1], target=3:");
System.out.println("-1 + 1 + 1 + 1 + 1 = 3");
System.out.println("+1 - 1 + 1 + 1 + 1 = 3");
System.out.println("+1 + 1 - 1 + 1 + 1 = 3");
System.out.println("+1 + 1 + 1 - 1 + 1 = 3");
System.out.println("+1 + 1 + 1 + 1 - 1 = 3");
System.out.println("Total: 5 ways");
