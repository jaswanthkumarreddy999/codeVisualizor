// ================================================
// Problem 141: Plus One
// ================================================
// Given array representing a large integer, add one to it.

// ============================================
// APPROACH 1: Traverse Right to Left - O(n) Time, O(1) Space ⭐ OPTIMAL
// ============================================
int[] digits = {1, 2, 9};

for (int i = digits.length - 1; i >= 0; i--) {
    if (digits[i] < 9) {
        digits[i]++;
        System.out.println("Plus One: " + Arrays.toString(digits));
        break;
    }
    digits[i] = 0;
    
    // If we've gone through all digits, need extra space
    if (i == 0) {
        int[] result = new int[digits.length + 1];
        result[0] = 1;
        System.out.println("Plus One: " + Arrays.toString(result));
    }
}

// ============================================
// Approach Explanation
// ============================================
System.out.println("\nAlgorithm:");
System.out.println("1. Start from rightmost digit");
System.out.println("2. If digit < 9, increment and return");
System.out.println("3. If digit = 9, set to 0 and continue left");
System.out.println("4. If all digits were 9, prepend 1");

// ============================================
// Visualization
// ============================================
System.out.println("\nExamples:");
System.out.println("[1,2,3] + 1 = [1,2,4]");
System.out.println("[1,2,9] + 1 = [1,3,0]");
System.out.println("[9,9,9] + 1 = [1,0,0,0]");
