// ================================================
// Problem 74: Subsets II
// ================================================
// Given an integer array nums that may contain duplicates, return all 
// possible subsets (the power set) without duplicate subsets.

// ============================================
// APPROACH 1: Backtracking with Sorting - O(n * 2^n) Time ⭐ OPTIMAL
// ============================================
int[] nums = {1, 2, 2};
Arrays.sort(nums);  // Sort to handle duplicates

List<List<Integer>> result = new ArrayList<>();
backtrackSubsets(nums, 0, new ArrayList<>(), result);
System.out.println("Subsets II: " + result);

static void backtrackSubsets(int[] nums, int start, List<Integer> current, 
                              List<List<Integer>> result) {
    result.add(new ArrayList<>(current));
    
    for (int i = start; i < nums.length; i++) {
        // Skip duplicates
        if (i > start && nums[i] == nums[i - 1]) continue;
        
        current.add(nums[i]);
        backtrackSubsets(nums, i + 1, current, result);
        current.remove(current.size() - 1);
    }
}

// ============================================
// APPROACH 2: Iterative with Duplicate Handling
// ============================================
int[] nums2 = {1, 2, 2};
Arrays.sort(nums2);

List<List<Integer>> result2 = new ArrayList<>();
result2.add(new ArrayList<>());

int start = 0;
for (int i = 0; i < nums2.length; i++) {
    int size = result2.size();
    
    // If duplicate, only add to subsets created in last iteration
    start = (i > 0 && nums2[i] == nums2[i - 1]) ? size / 2 : 0;
    
    for (int j = start; j < size; j++) {
        List<Integer> subset = new ArrayList<>(result2.get(j));
        subset.add(nums2[i]);
        result2.add(subset);
    }
}

System.out.println("Subsets II (Iterative): " + result2);
