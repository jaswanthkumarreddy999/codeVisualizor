// ================================================
// Problem 1: Contains Duplicate
// ================================================
// Given an integer array nums, return true if any value appears 
// at least twice in the array, and return false if every element is distinct.

// ============================================
// APPROACH 1: Brute Force - O(n²) Time, O(1) Space
// ============================================
// Compare every pair of elements
int[] nums = {1, 2, 3, 1};
boolean hasDuplicate = false;

for (int i = 0; i < nums.length; i++) {
    for (int j = i + 1; j < nums.length; j++) {
        if (nums[i] == nums[j]) {
            hasDuplicate = true;
            break;
        }
    }
    if (hasDuplicate) break;
}

System.out.println("Has Duplicate (Brute Force): " + hasDuplicate);

// ============================================
// APPROACH 2: Sorting - O(n log n) Time, O(1) Space
// ============================================
// Sort array and check adjacent elements
int[] nums2 = {1, 2, 3, 1};
Arrays.sort(nums2);

boolean hasDuplicate2 = false;
for (int i = 0; i < nums2.length - 1; i++) {
    if (nums2[i] == nums2[i + 1]) {
        hasDuplicate2 = true;
        break;
    }
}

System.out.println("Has Duplicate (Sorting): " + hasDuplicate2);

// ============================================
// APPROACH 3: HashSet - O(n) Time, O(n) Space ⭐ OPTIMAL
// ============================================
// Use HashSet to track seen elements
int[] nums3 = {1, 2, 3, 1};
Set<Integer> seen = new HashSet<>();
boolean hasDuplicate3 = false;

for (int num : nums3) {
    if (seen.contains(num)) {
        hasDuplicate3 = true;
        break;
    }
    seen.add(num);
}

System.out.println("Has Duplicate (HashSet): " + hasDuplicate3);
