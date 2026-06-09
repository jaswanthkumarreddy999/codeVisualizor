// ================================================
// Problem 11: Two Sum II - Input Array Is Sorted
// ================================================
// Given a 1-indexed array of integers that is already sorted in 
// non-decreasing order, find two numbers that add up to target.
// Return indices (1-indexed).

// ============================================
// APPROACH 1: Two Pointers - O(n) Time, O(1) Space ⭐ OPTIMAL
// ============================================
int[] numbers = {2, 7, 11, 15};
int target = 9;

int left = 0;
int right = numbers.length - 1;
int[] result1 = new int[2];

while (left < right) {
    int sum = numbers[left] + numbers[right];
    
    if (sum == target) {
        result1[0] = left + 1;  // 1-indexed
        result1[1] = right + 1;
        break;
    } else if (sum < target) {
        left++;  // Need larger sum
    } else {
        right--;  // Need smaller sum
    }
}

System.out.println("Two Sum II (Two Pointers): [" + result1[0] + ", " + result1[1] + "]");

// ============================================
// APPROACH 2: Binary Search - O(n log n) Time, O(1) Space
// ============================================
int[] numbers2 = {2, 7, 11, 15};
int target2 = 9;
int[] result2 = new int[2];

for (int i = 0; i < numbers2.length; i++) {
    int complement = target2 - numbers2[i];
    
    // Binary search for complement in remaining array
    int lo = i + 1;
    int hi = numbers2.length - 1;
    
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        
        if (numbers2[mid] == complement) {
            result2[0] = i + 1;
            result2[1] = mid + 1;
            break;
        } else if (numbers2[mid] < complement) {
            lo = mid + 1;
        } else {
            hi = mid - 1;
        }
    }
    
    if (result2[0] != 0) break;
}

System.out.println("Two Sum II (Binary Search): [" + result2[0] + ", " + result2[1] + "]");
