// ================================================
// Problem 72: Combination Sum
// ================================================
// Given array of distinct integers and target, find all unique combinations 
// that sum to target. Same number may be chosen unlimited times.

// ============================================
// APPROACH 1: Backtracking - O(n^(T/M)) Time ⭐ OPTIMAL
// ============================================
// T = target, M = min candidate value
int[] candidates = {2, 3, 6, 7};
int target = 7;

List<List<Integer>> result = new ArrayList<>();
backtrackSum(candidates, target, 0, new ArrayList<>(), result);
System.out.println("Combination Sum: " + result);

static void backtrackSum(int[] candidates, int target, int start, 
                          List<Integer> current, List<List<Integer>> result) {
    if (target == 0) {
        result.add(new ArrayList<>(current));
        return;
    }
    
    if (target < 0) {
        return;
    }
    
    for (int i = start; i < candidates.length; i++) {
        current.add(candidates[i]);
        // Use same index i (can reuse same number)
        backtrackSum(candidates, target - candidates[i], i, current, result);
        current.remove(current.size() - 1);
    }
}

// ============================================
// APPROACH 2: DP (for counting only) - O(n * target) Time
// ============================================
int[] candidates2 = {2, 3, 6, 7};
int target2 = 7;

// Count combinations (not actual combinations)
int[] dp = new int[target2 + 1];
dp[0] = 1;

for (int coin : candidates2) {
    for (int i = coin; i <= target2; i++) {
        dp[i] += dp[i - coin];
    }
}

System.out.println("Number of combinations: " + dp[target2]);

// ============================================
// Visualization: Decision Tree
// ============================================
System.out.println("\nDecision Tree for target=7, candidates=[2,3,6,7]:");
System.out.println("Root -> choose 2 -> choose 2 -> choose 2 -> FAIL (>7)");
System.out.println("     -> choose 2 -> choose 2 -> choose 3 -> SUCCESS [2,2,3]=7");
System.out.println("     -> choose 7 -> SUCCESS [7]=7");
