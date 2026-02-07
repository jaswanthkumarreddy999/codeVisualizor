// ================================================
// Problem 31: Find Minimum in Rotated Sorted Array
// ================================================
// Suppose an array of length n sorted in ascending order is rotated 
// between 1 and n times. Find the minimum element.
// Array has no duplicates.

// ============================================
// APPROACH 1: Binary Search - O(log n) Time, O(1) Space ⭐ OPTIMAL
// ============================================
int[] nums = {3, 4, 5, 1, 2};

int left = 0;
int right = nums.length - 1;

while (left < right) {
    int mid = left + (right - left) / 2;
    
    if (nums[mid] > nums[right]) {
        // Minimum is in right half
        left = mid + 1;
    } else {
        // Minimum is in left half (including mid)
        right = mid;
    }
}

int minimum = nums[left];
System.out.println("Minimum in Rotated Array: " + minimum);

// ============================================
// APPROACH 2: Find Pivot Point - O(log n) Time, O(1) Space
// ============================================
int[] nums2 = {3, 4, 5, 1, 2};

// If array is not rotated
if (nums2[0] < nums2[nums2.length - 1]) {
    System.out.println("Minimum (Pivot): " + nums2[0]);
} else {
    left = 0;
    right = nums2.length - 1;
    
    while (left < right) {
        int mid = left + (right - left) / 2;
        
        if (nums2[mid] > nums2[mid + 1]) {
            // Found the pivot, minimum is at mid + 1
            System.out.println("Minimum (Pivot): " + nums2[mid + 1]);
            break;
        } else if (nums2[mid] >= nums2[left]) {
            left = mid + 1;
        } else {
            right = mid;
        }
    }
}

// ============================================
// APPROACH 3: Linear Search - O(n) Time, O(1) Space
// ============================================
int[] nums3 = {3, 4, 5, 1, 2};
int min3 = nums3[0];

for (int num : nums3) {
    min3 = Math.min(min3, num);
}

System.out.println("Minimum (Linear): " + min3);
