// ================================================
// Problem 32: Search in Rotated Sorted Array
// ================================================
// There is an integer array nums sorted in ascending order (distinct values).
// Array is possibly rotated. Given target, return index or -1.

// ============================================
// APPROACH 1: Binary Search - O(log n) Time, O(1) Space ⭐ OPTIMAL
// ============================================
int[] nums = {4, 5, 6, 7, 0, 1, 2};
int target = 0;

int left = 0;
int right = nums.length - 1;
int result = -1;

while (left <= right) {
    int mid = left + (right - left) / 2;
    
    if (nums[mid] == target) {
        result = mid;
        break;
    }
    
    // Determine which half is sorted
    if (nums[left] <= nums[mid]) {
        // Left half is sorted
        if (nums[left] <= target && target < nums[mid]) {
            right = mid - 1;  // Target in left half
        } else {
            left = mid + 1;   // Target in right half
        }
    } else {
        // Right half is sorted
        if (nums[mid] < target && target <= nums[right]) {
            left = mid + 1;   // Target in right half
        } else {
            right = mid - 1;  // Target in left half
        }
    }
}

System.out.println("Search Rotated Array: " + result);

// ============================================
// APPROACH 2: Find Pivot + Binary Search - O(log n) Time, O(1) Space
// ============================================
int[] nums2 = {4, 5, 6, 7, 0, 1, 2};
int target2 = 0;
int n = nums2.length;

// Step 1: Find the pivot (minimum element index)
int lo = 0, hi = n - 1;
while (lo < hi) {
    int mid = lo + (hi - lo) / 2;
    if (nums2[mid] > nums2[hi]) {
        lo = mid + 1;
    } else {
        hi = mid;
    }
}
int pivot = lo;  // Index of minimum element

// Step 2: Determine which half to search
lo = 0;
hi = n - 1;
if (target2 >= nums2[pivot] && target2 <= nums2[n - 1]) {
    lo = pivot;
} else {
    hi = pivot - 1;
}

// Step 3: Standard binary search
int result2 = -1;
while (lo <= hi) {
    int mid = lo + (hi - lo) / 2;
    if (nums2[mid] == target2) {
        result2 = mid;
        break;
    } else if (nums2[mid] < target2) {
        lo = mid + 1;
    } else {
        hi = mid - 1;
    }
}

System.out.println("Search Rotated (Two Phase): " + result2);
