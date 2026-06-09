// ================================================
// Problem 75: Combination Sum II
// ================================================
// Find all unique combinations that sum to target.
// Each number can only be used once. No duplicate combinations.

// ============================================
// APPROACH 1: Backtracking with Sorting - O(2^n) Time ⭐ OPTIMAL
// ============================================
int[] candidates = {10, 1, 2, 7, 6, 1, 5};
int target = 8;

Arrays.sort(candidates);  // Sort to handle duplicates

List<List<Integer>> result = new ArrayList<>();
backtrackSum(candidates, target, 0, new ArrayList<>(), result);
System.out.println("Combination Sum II: " + result);

static void backtrackSum(int[] candidates, int target, int start,
                          List<Integer> current, List<List<Integer>> result) {
    if (target == 0) {
        result.add(new ArrayList<>(current));
        return;
    }
    
    for (int i = start; i < candidates.length; i++) {
        // Skip duplicates at same level
        if (i > start && candidates[i] == candidates[i - 1]) continue;
        
        // Prune: if current candidate > target, all following are too large
        if (candidates[i] > target) break;
        
        current.add(candidates[i]);
        backtrackSum(candidates, target - candidates[i], i + 1, current, result);
        current.remove(current.size() - 1);
    }
}

// ============================================
// Visualization
// ============================================
System.out.println("\nFor target=8, candidates=[1,1,2,5,6,7,10]:");
System.out.println("Combinations:");
System.out.println("  [1, 1, 6]");
System.out.println("  [1, 2, 5]");
System.out.println("  [1, 7]");
System.out.println("  [2, 6]");
