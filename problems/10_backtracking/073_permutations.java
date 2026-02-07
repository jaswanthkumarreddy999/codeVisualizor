// ================================================
// Problem 73: Permutations
// ================================================
// Given an array nums of distinct integers, return all possible permutations.

// ============================================
// APPROACH 1: Backtracking with Used Array - O(n! * n) Time ⭐ OPTIMAL
// ============================================
int[] nums = {1, 2, 3};
List<List<Integer>> permutations = new ArrayList<>();
boolean[] used = new boolean[nums.length];

backtrackPerm(nums, new ArrayList<>(), used, permutations);
System.out.println("Permutations: " + permutations);

static void backtrackPerm(int[] nums, List<Integer> current, 
                           boolean[] used, List<List<Integer>> result) {
    if (current.size() == nums.length) {
        result.add(new ArrayList<>(current));
        return;
    }
    
    for (int i = 0; i < nums.length; i++) {
        if (used[i]) continue;
        
        used[i] = true;
        current.add(nums[i]);
        backtrackPerm(nums, current, used, result);
        current.remove(current.size() - 1);
        used[i] = false;
    }
}

// ============================================
// APPROACH 2: Backtracking with Swap - O(n! * n) Time, O(1) Space (in-place)
// ============================================
int[] nums2 = {1, 2, 3};
List<List<Integer>> permutations2 = new ArrayList<>();

backtrackSwap(nums2, 0, permutations2);
System.out.println("Permutations (Swap): " + permutations2);

static void backtrackSwap(int[] nums, int start, List<List<Integer>> result) {
    if (start == nums.length) {
        List<Integer> perm = new ArrayList<>();
        for (int num : nums) perm.add(num);
        result.add(perm);
        return;
    }
    
    for (int i = start; i < nums.length; i++) {
        // Swap
        int temp = nums[start];
        nums[start] = nums[i];
        nums[i] = temp;
        
        backtrackSwap(nums, start + 1, result);
        
        // Swap back
        temp = nums[start];
        nums[start] = nums[i];
        nums[i] = temp;
    }
}

// ============================================
// APPROACH 3: Iterative - O(n! * n) Time
// ============================================
System.out.println("\nIterative approach:");
System.out.println("Start with [[1]]");
System.out.println("Insert 2 at all positions: [[2,1], [1,2]]");
System.out.println("Insert 3 at all positions: [[3,2,1], [2,3,1], [2,1,3], ...]");
