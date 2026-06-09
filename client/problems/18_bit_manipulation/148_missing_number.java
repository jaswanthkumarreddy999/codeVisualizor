// ================================================
// Problem 148: Missing Number
// ================================================
// Given array containing n distinct numbers in range [0, n], return missing one.

// ============================================
// APPROACH 1: XOR - O(n) Time, O(1) Space ⭐ OPTIMAL
// ============================================
// XOR all numbers and indices: missing number remains
int[] nums = {3, 0, 1};
int n = nums.length;

int xor = n;  // Start with n (last index + 1)
for (int i = 0; i < n; i++) {
    xor ^= i ^ nums[i];
}

System.out.println("Missing Number (XOR): " + xor);

// ============================================
// APPROACH 2: Math (Sum) - O(n) Time, O(1) Space ⭐ OPTIMAL
// ============================================
int[] nums2 = {3, 0, 1};
int n2 = nums2.length;

int expectedSum = n2 * (n2 + 1) / 2;
int actualSum = 0;
for (int num : nums2) {
    actualSum += num;
}

int missing = expectedSum - actualSum;
System.out.println("Missing Number (Sum): " + missing);

// ============================================
// APPROACH 3: HashSet - O(n) Time, O(n) Space
// ============================================
int[] nums3 = {3, 0, 1};
Set<Integer> set = new HashSet<>();
for (int num : nums3) {
    set.add(num);
}

int missing3 = -1;
for (int i = 0; i <= nums3.length; i++) {
    if (!set.contains(i)) {
        missing3 = i;
        break;
    }
}

System.out.println("Missing Number (Set): " + missing3);

// ============================================
// APPROACH 4: Sorting - O(n log n) Time, O(1) Space
// ============================================
int[] nums4 = {3, 0, 1};
Arrays.sort(nums4);

int missing4 = nums4.length;
for (int i = 0; i < nums4.length; i++) {
    if (nums4[i] != i) {
        missing4 = i;
        break;
    }
}

System.out.println("Missing Number (Sort): " + missing4);
