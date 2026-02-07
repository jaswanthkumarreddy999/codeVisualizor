// ================================================
// Problem 6: Product of Array Except Self
// ================================================
// Given an integer array nums, return an array answer such that answer[i] 
// is equal to the product of all the elements of nums except nums[i].
// Must run in O(n) time without using division.

// ============================================
// APPROACH 1: Prefix and Suffix Arrays - O(n) Time, O(n) Space
// ============================================
int[] nums = {1, 2, 3, 4};
int n = nums.length;

// Calculate prefix products
int[] prefix = new int[n];
prefix[0] = 1;
for (int i = 1; i < n; i++) {
    prefix[i] = prefix[i - 1] * nums[i - 1];
}

// Calculate suffix products
int[] suffix = new int[n];
suffix[n - 1] = 1;
for (int i = n - 2; i >= 0; i--) {
    suffix[i] = suffix[i + 1] * nums[i + 1];
}

// Combine prefix and suffix
int[] result1 = new int[n];
for (int i = 0; i < n; i++) {
    result1[i] = prefix[i] * suffix[i];
}

System.out.println("Product Except Self (Two Arrays): " + Arrays.toString(result1));

// ============================================
// APPROACH 2: Single Array with Running Suffix - O(n) Time, O(1) Space ⭐ OPTIMAL
// ============================================
int[] nums2 = {1, 2, 3, 4};
int n2 = nums2.length;
int[] result2 = new int[n2];

// First pass: calculate prefix products in result array
result2[0] = 1;
for (int i = 1; i < n2; i++) {
    result2[i] = result2[i - 1] * nums2[i - 1];
}

// Second pass: multiply by suffix products using running variable
int suffix2 = 1;
for (int i = n2 - 1; i >= 0; i--) {
    result2[i] *= suffix2;
    suffix2 *= nums2[i];
}

System.out.println("Product Except Self (O(1) Space): " + Arrays.toString(result2));
