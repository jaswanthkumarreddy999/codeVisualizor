// ================================================
// Problem 106: Maximum Product Subarray
// ================================================
// Given an integer array nums, find contiguous subarray with largest product.

// ============================================
// APPROACH 1: Track Max and Min - O(n) Time, O(1) Space ⭐ OPTIMAL
// ============================================
// Key: Negative num can flip min to max, so track both

int[] nums = {2, 3, -2, 4};

int maxProduct = nums[0];
int currMax = nums[0];
int currMin = nums[0];

for (int i = 1; i < nums.length; i++) {
    int num = nums[i];
    
    // Swap if current number is negative
    if (num < 0) {
        int temp = currMax;
        currMax = currMin;
        currMin = temp;
    }
    
    currMax = Math.max(num, currMax * num);
    currMin = Math.min(num, currMin * num);
    
    maxProduct = Math.max(maxProduct, currMax);
}

System.out.println("Maximum Product Subarray: " + maxProduct);

// ============================================
// APPROACH 2: Two Passes - O(n) Time, O(1) Space
// ============================================
// Handle zeros by going left-to-right and right-to-left
int[] nums2 = {2, 3, -2, 4};
int n = nums2.length;
int maxProd = Integer.MIN_VALUE;
int product = 1;

// Left to right
for (int num : nums2) {
    product *= num;
    maxProd = Math.max(maxProd, product);
    if (product == 0) product = 1;
}

product = 1;
// Right to left
for (int i = n - 1; i >= 0; i--) {
    product *= nums2[i];
    maxProd = Math.max(maxProd, product);
    if (product == 0) product = 1;
}

System.out.println("Max Product (Two Pass): " + maxProd);

// ============================================
// Visualization
// ============================================
System.out.println("\nFor [2, 3, -2, 4]:");
System.out.println("i=0: max=2, min=2, result=2");
System.out.println("i=1: max=6, min=3, result=6");
System.out.println("i=2: max=-2, min=-12, result=6");
System.out.println("i=3: max=4, min=-48, result=6");
