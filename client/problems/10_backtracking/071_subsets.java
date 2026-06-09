// ================================================
// Problem 71: Subsets
// ================================================
// Given an integer array nums of unique elements, return all subsets.

// ============================================
// APPROACH 1: Backtracking - O(n * 2^n) Time, O(n) Space ⭐ OPTIMAL
// ============================================
int[] nums = {1, 2, 3};
List<List<Integer>> subsets = new ArrayList<>();

backtrackSubsets(nums, 0, new ArrayList<>(), subsets);
System.out.println("Subsets (Backtracking): " + subsets);

static void backtrackSubsets(int[] nums, int start, List<Integer> current, List<List<Integer>> result) {
    result.add(new ArrayList<>(current));
    
    for (int i = start; i < nums.length; i++) {
        current.add(nums[i]);
        backtrackSubsets(nums, i + 1, current, result);
        current.remove(current.size() - 1);
    }
}

// ============================================
// APPROACH 2: Iterative - O(n * 2^n) Time, O(1) Space (excluding result)
// ============================================
int[] nums2 = {1, 2, 3};
List<List<Integer>> subsets2 = new ArrayList<>();
subsets2.add(new ArrayList<>());  // Empty set

for (int num : nums2) {
    int size = subsets2.size();
    for (int i = 0; i < size; i++) {
        List<Integer> newSubset = new ArrayList<>(subsets2.get(i));
        newSubset.add(num);
        subsets2.add(newSubset);
    }
}

System.out.println("Subsets (Iterative): " + subsets2);

// ============================================
// APPROACH 3: Bit Manipulation - O(n * 2^n) Time, O(1) Space
// ============================================
int[] nums3 = {1, 2, 3};
int n = nums3.length;
List<List<Integer>> subsets3 = new ArrayList<>();

// 2^n subsets, each represented by a bitmask
for (int mask = 0; mask < (1 << n); mask++) {
    List<Integer> subset = new ArrayList<>();
    for (int i = 0; i < n; i++) {
        if ((mask & (1 << i)) != 0) {
            subset.add(nums3[i]);
        }
    }
    subsets3.add(subset);
}

System.out.println("Subsets (Bitmask): " + subsets3);
