// ================================================
// Problem 42: Find the Duplicate Number
// ================================================
// Given an array of integers nums containing n + 1 integers where each 
// integer is in the range [1, n] inclusive. Find the one duplicate.

// ============================================
// APPROACH 1: Floyd's Cycle Detection - O(n) Time, O(1) Space ⭐ OPTIMAL
// ============================================
// Treat array as linked list: index -> nums[index]
int[] nums = {1, 3, 4, 2, 2};

int slow = nums[0];
int fast = nums[0];

// Phase 1: Find intersection point
do {
    slow = nums[slow];
    fast = nums[nums[fast]];
} while (slow != fast);

// Phase 2: Find entrance to cycle (duplicate)
slow = nums[0];
while (slow != fast) {
    slow = nums[slow];
    fast = nums[fast];
}

int duplicate = slow;
System.out.println("Duplicate (Floyd's): " + duplicate);

// ============================================
// APPROACH 2: HashSet - O(n) Time, O(n) Space
// ============================================
int[] nums2 = {1, 3, 4, 2, 2};
Set<Integer> seen = new HashSet<>();
int duplicate2 = -1;

for (int num : nums2) {
    if (seen.contains(num)) {
        duplicate2 = num;
        break;
    }
    seen.add(num);
}

System.out.println("Duplicate (HashSet): " + duplicate2);

// ============================================
// APPROACH 3: Sorting - O(n log n) Time, O(1) Space
// ============================================
int[] nums3 = {1, 3, 4, 2, 2};
Arrays.sort(nums3);

int duplicate3 = -1;
for (int i = 1; i < nums3.length; i++) {
    if (nums3[i] == nums3[i - 1]) {
        duplicate3 = nums3[i];
        break;
    }
}

System.out.println("Duplicate (Sorting): " + duplicate3);

// ============================================
// APPROACH 4: Binary Search on Value Range - O(n log n) Time, O(1) Space
// ============================================
int[] nums4 = {1, 3, 4, 2, 2};
int n = nums4.length - 1;

int lo = 1, hi = n;
int duplicate4 = -1;

while (lo < hi) {
    int mid = lo + (hi - lo) / 2;
    
    // Count numbers <= mid
    int count = 0;
    for (int num : nums4) {
        if (num <= mid) count++;
    }
    
    if (count > mid) {
        hi = mid;  // Duplicate in lower half
    } else {
        lo = mid + 1;  // Duplicate in upper half
    }
}

duplicate4 = lo;
System.out.println("Duplicate (Binary Search): " + duplicate4);
