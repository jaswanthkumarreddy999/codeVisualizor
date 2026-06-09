// ================================================
// Problem 12: 3Sum
// ================================================
// Given an integer array nums, return all triplets [nums[i], nums[j], nums[k]] 
// such that i != j, i != k, j != k, and nums[i] + nums[j] + nums[k] == 0.
// Solution set must not contain duplicate triplets.

// ============================================
// APPROACH 1: Sort + Two Pointers - O(n²) Time, O(1) Space ⭐ OPTIMAL
// ============================================
int[] nums = {-1, 0, 1, 2, -1, -4};
Arrays.sort(nums);
List<List<Integer>> result = new ArrayList<>();

for (int i = 0; i < nums.length - 2; i++) {
    // Skip duplicates for first element
    if (i > 0 && nums[i] == nums[i - 1]) {
        continue;
    }
    
    int left = i + 1;
    int right = nums.length - 1;
    int target = -nums[i];
    
    while (left < right) {
        int sum = nums[left] + nums[right];
        
        if (sum == target) {
            result.add(Arrays.asList(nums[i], nums[left], nums[right]));
            
            // Skip duplicates for second element
            while (left < right && nums[left] == nums[left + 1]) {
                left++;
            }
            // Skip duplicates for third element
            while (left < right && nums[right] == nums[right - 1]) {
                right--;
            }
            
            left++;
            right--;
        } else if (sum < target) {
            left++;
        } else {
            right--;
        }
    }
}

System.out.println("3Sum (Two Pointers): " + result);

// ============================================
// APPROACH 2: HashSet for Deduplication - O(n²) Time, O(n) Space
// ============================================
int[] nums2 = {-1, 0, 1, 2, -1, -4};
Arrays.sort(nums2);
Set<List<Integer>> resultSet = new HashSet<>();

for (int i = 0; i < nums2.length - 2; i++) {
    Set<Integer> seen = new HashSet<>();
    
    for (int j = i + 1; j < nums2.length; j++) {
        int complement = -nums2[i] - nums2[j];
        
        if (seen.contains(complement)) {
            resultSet.add(Arrays.asList(nums2[i], complement, nums2[j]));
        }
        
        seen.add(nums2[j]);
    }
}

System.out.println("3Sum (HashSet): " + new ArrayList<>(resultSet));
